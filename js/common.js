// ─── Alertes (SweetAlert2), stylées selon le thème Sahara ───
function swalTheme() {
  const dark = document.documentElement.classList.contains("dark");
  return {
    background: dark ? "#26201a" : "#ffffff",
    color: dark ? "#f0e9e0" : "#3a302a",
    confirmButtonColor: "#c2652a",
    cancelButtonColor: "#9a9088",
    customClass: { popup: "font-body", title: "font-headline" },
  };
}
function notifySuccess(title, text) {
  return Swal.fire({ icon: "success", title, text, confirmButtonText: "OK", ...swalTheme() });
}
function notifyError(title, text) {
  return Swal.fire({ icon: "error", title: title || "Une erreur est survenue", text, confirmButtonText: "OK", ...swalTheme() });
}
function confirmDanger(title, text, confirmText = "Confirmer") {
  return Swal.fire({
    icon: "warning", title, text, showCancelButton: true,
    confirmButtonText: confirmText, cancelButtonText: "Annuler", ...swalTheme(),
  }).then((r) => r.isConfirmed);
}
function toastSuccess(text) {
  return Swal.fire({
    toast: true, position: "top-end", icon: "success", title: text,
    showConfirmButton: false, timer: 2200, timerProgressBar: true, ...swalTheme(),
  });
}

// ─── Client API ───
async function api(path, options = {}) {
  const res = await fetch(path, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  let data = null;
  try { data = await res.json(); } catch (_) { /* réponse vide */ }
  if (!res.ok) throw new Error((data && data.error) || "Une erreur est survenue.");
  return data;
}

// ─── Avatars (DiceBear, style Micah) ───
// Si aucun seed n'est fourni (comptes créés avant l'ajout des avatars),
// on retombe sur un identifiant unique plutôt qu'un seed générique partagé,
// pour que chaque utilisateur ait un avatar distinct dans le classement.
function avatarUrl(seed, size = 64) {
  const s = seed && String(seed).trim() ? seed : `netinit-${Math.random().toString(36).slice(2, 8)}`;
  return `https://api.dicebear.com/7.x/micah/svg?seed=${encodeURIComponent(s)}&size=${size}&backgroundColor=fbe8d8,f2ece4,fce0e0`;
}
function safeAvatarSeed(user) {
  return (user.avatar_seed && user.avatar_seed.trim()) || `user-${user.id}`;
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// ─── Analyseur de contenu (paragraphes, listes, sous-titres "## ") ───
function renderProse(text) {
  const blocks = text.trim().split(/\n\s*\n/);
  return blocks.map((block) => {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length === 1 && lines[0].startsWith("## ")) {
      return `<h4>${escapeHtml(lines[0].slice(3))}</h4>`;
    }
    if (lines.every((l) => l.startsWith("- "))) {
      return `<ul>${lines.map((l) => `<li>${escapeHtml(l.slice(2))}</li>`).join("")}</ul>`;
    }
    return `<p>${escapeHtml(block.trim())}</p>`;
  }).join("");
}

function signalBarsHtml(activeCount, total = 4) {
  let html = "";
  for (let i = 1; i <= total; i++) html += `<i class="${i <= activeCount ? "on" : ""}"></i>`;
  return html;
}

// ─── Protection de page ───
async function requireUser() {
  try { return await api("/api/me"); }
  catch (_) { window.location.href = "/login.html"; return null; }
}

// ─── Habillage commun des pages authentifiées ───
function mountAuthedChrome(user) {
  const url = avatarUrl(safeAvatarSeed(user), 48);
  const dAvatar = document.getElementById("dnav-avatar");
  const dName = document.getElementById("dnav-name");
  if (dAvatar) dAvatar.src = url;
  if (dName) dName.textContent = user.nom.split(" ")[0];

  const doLogout = async () => {
    await api("/api/logout", { method: "POST" });
    window.location.href = "/index.html";
  };
  ["logout-btn-desktop", "settings-logout"].forEach((id) => {
    const b = document.getElementById(id);
    if (b) b.addEventListener("click", doLogout);
  });

  mountPanels();
  mountRevealAnimations();
}

// ─── Nav publique (index/login/register) : jamais d'icônes paramètres/notifications ───
async function mountPublicNav() {
  let user = null;
  try { user = await api("/api/me"); } catch (_) { user = null; }
  const slot = document.getElementById("public-nav-slot");
  if (slot) {
    slot.innerHTML = user
      ? `<a href="/dashboard.html" class="bg-primary text-on-primary font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-primary/90 transition-colors">Mon tableau de bord</a>`
      : `<a href="/login.html" class="text-on-surface-variant hover:text-primary font-body text-sm hidden sm:inline">Se connecter</a>
         <a href="/register.html" class="bg-primary text-on-primary font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-primary/90 transition-colors">Commencer</a>`;
  }
  mountRevealAnimations();
  return user;
}

// ─── Panneau Paramètres (mode sombre) ───
function mountPanels(showLogout = true) {
  const settingsBackdrop = document.getElementById("settings-backdrop");
  if (!settingsBackdrop) return;

  const openSettings = () => settingsBackdrop.classList.remove("hidden") || settingsBackdrop.classList.add("flex");
  const closeSettings = () => { settingsBackdrop.classList.add("hidden"); settingsBackdrop.classList.remove("flex"); };

  ["settings-open-mobile", "settings-open-desktop"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", openSettings);
  });
  const sClose = document.getElementById("settings-close");
  if (sClose) sClose.addEventListener("click", closeSettings);
  if (settingsBackdrop) settingsBackdrop.addEventListener("click", (e) => { if (e.target === settingsBackdrop) closeSettings(); });

  if (!showLogout) {
    const lb = document.getElementById("settings-logout");
    if (lb) lb.style.display = "none";
  }

  // Mode sombre
  const darkToggle = document.getElementById("dark-mode-toggle");
  if (darkToggle) {
    const isDark = document.documentElement.classList.contains("dark");
    darkToggle.classList.toggle("on", isDark);
    darkToggle.addEventListener("click", () => {
      const nowDark = !document.documentElement.classList.contains("dark");
      document.documentElement.classList.toggle("dark", nowDark);
      localStorage.setItem("netinit-theme", nowDark ? "dark" : "light");
      darkToggle.classList.toggle("on", nowDark);
    });
  }
}

function mountRevealAnimations() {
  const els = document.querySelectorAll("[data-animate]");
  if (!els.length) return;

  // Sécurité absolue : quoi qu'il arrive (script bloqué, erreur, navigateur
  // ancien), le contenu redevient visible après 1,2s au plus tard. Le CSS ne
  // masque désormais un élément QUE s'il porte la classe "reveal-init",
  // ajoutée ici — donc si ce script ne s'exécute pas du tout, le contenu
  // est visible par défaut (aucune classe ajoutée = aucune règle de masquage).
  try {
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in-view"));
      return;
    }
    els.forEach((el) => el.classList.add("reveal-init"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute("data-delay") || 0;
          setTimeout(() => entry.target.classList.add("in-view"), Number(delay));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach((el) => observer.observe(el));
    setTimeout(() => els.forEach((el) => el.classList.add("in-view")), 1200);
  } catch (_) {
    els.forEach((el) => el.classList.remove("reveal-init"));
    els.forEach((el) => el.classList.add("in-view"));
  }
}
