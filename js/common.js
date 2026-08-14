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

// ─── Nav publique (index/login/register) ───
async function mountPublicNav() {
  let user = null;
  try { user = await api("/api/me"); } catch (_) { user = null; }
  const slot = document.getElementById("public-nav-slot");
  if (slot) {
    slot.innerHTML = (user
      ? `<a href="/dashboard.html" class="bg-primary text-on-primary font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-primary/90 transition-colors" data-i18n="nav.myDashboard">Mon tableau de bord</a>`
      : `<a href="/login.html" class="text-on-surface-variant hover:text-primary font-body text-sm hidden sm:inline" data-i18n="nav.login">Se connecter</a>
         <a href="/register.html" class="bg-primary text-on-primary font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-primary/90 transition-colors" data-i18n="nav.start">Commencer</a>`
    ) + `
      <button class="relative text-on-surface-variant hover:text-primary transition-colors p-2" id="notif-open-mobile" title="Notifications">
        <span class="material-symbols-outlined">notifications</span>
        <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full"></span>
      </button>
      <button class="text-on-surface-variant hover:text-primary transition-colors p-2" id="settings-open-mobile" title="Paramètres">
        <span class="material-symbols-outlined">settings</span>
      </button>`;
  }
  mountPanels(!!user);
  mountRevealAnimations();
  applyLanguage(getLanguage());
  return user;
}

// ─── Panneaux Paramètres / Notifications (mode sombre, langue) ───
function mountPanels(showLogout = true) {
  const settingsBackdrop = document.getElementById("settings-backdrop");
  const notifBackdrop = document.getElementById("notif-backdrop");
  if (!settingsBackdrop && !notifBackdrop) return;

  const openSettings = () => settingsBackdrop.classList.remove("hidden") || settingsBackdrop.classList.add("flex");
  const closeSettings = () => { settingsBackdrop.classList.add("hidden"); settingsBackdrop.classList.remove("flex"); };
  const openNotif = () => notifBackdrop.classList.remove("hidden") || notifBackdrop.classList.add("flex");
  const closeNotif = () => { notifBackdrop.classList.add("hidden"); notifBackdrop.classList.remove("flex"); };

  ["settings-open-mobile", "settings-open-desktop"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", openSettings);
  });
  ["notif-open-mobile", "notif-open-desktop"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", openNotif);
  });
  const sClose = document.getElementById("settings-close");
  if (sClose) sClose.addEventListener("click", closeSettings);
  if (settingsBackdrop) settingsBackdrop.addEventListener("click", (e) => { if (e.target === settingsBackdrop) closeSettings(); });
  const nClose = document.getElementById("notif-close");
  if (nClose) nClose.addEventListener("click", closeNotif);
  if (notifBackdrop) notifBackdrop.addEventListener("click", (e) => { if (e.target === notifBackdrop) closeNotif(); });

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

  // Langue
  const langFr = document.getElementById("lang-fr");
  const langEn = document.getElementById("lang-en");
  const current = getLanguage();
  if (langFr) langFr.classList.toggle("active", current === "fr");
  if (langEn) langEn.classList.toggle("active", current === "en");
  if (langFr) langFr.addEventListener("click", () => setLanguage("fr"));
  if (langEn) langEn.addEventListener("click", () => setLanguage("en"));
}

// ─── i18n minimal (chrome de l'interface : nav, boutons, panneaux) ───
const I18N = {
  fr: {
    "nav.dashboard": "Tableau de bord", "nav.lessons": "Leçons", "nav.rank": "Classement",
    "nav.profile": "Profil", "nav.logout": "Déconnexion", "nav.viewProfile": "Voir le profil",
    "nav.login": "Se connecter", "nav.start": "Commencer", "nav.myDashboard": "Mon tableau de bord",
    "settings.title": "Paramètres", "settings.darkMode": "Mode sombre", "settings.language": "Langue",
    "notif.title": "Notifications",
    "notif.item1.title": "4 nouvelles leçons disponibles",
    "notif.item1.body": "Réseaux sociaux, stockage cloud, achats en ligne et visioconférence.",
    "notif.item2.title": "Classement mis à jour", "notif.item2.body": "Suivez votre position parmi les autres apprenants.",
    "notif.item3.title": "Mode sombre disponible", "notif.item3.body": "Activez-le depuis les paramètres, en haut à droite.",
    "notif.footer": "D'autres nouveautés arrivent bientôt.",
  },
  en: {
    "nav.dashboard": "Dashboard", "nav.lessons": "Lessons", "nav.rank": "Leaderboard",
    "nav.profile": "Profile", "nav.logout": "Log out", "nav.viewProfile": "View profile",
    "nav.login": "Log in", "nav.start": "Get started", "nav.myDashboard": "My dashboard",
    "settings.title": "Settings", "settings.darkMode": "Dark mode", "settings.language": "Language",
    "notif.title": "Notifications",
    "notif.item1.title": "4 new lessons available",
    "notif.item1.body": "Social media, cloud storage, online shopping and video calls.",
    "notif.item2.title": "Leaderboard updated", "notif.item2.body": "Track your rank among other learners.",
    "notif.item3.title": "Dark mode available", "notif.item3.body": "Turn it on from settings, top right.",
    "notif.footer": "More updates coming soon.",
  },
};
function getLanguage() { return localStorage.getItem("netinit-lang") || "fr"; }
function setLanguage(lang) {
  localStorage.setItem("netinit-lang", lang);
  applyLanguage(lang);
  const langFr = document.getElementById("lang-fr"), langEn = document.getElementById("lang-en");
  if (langFr) langFr.classList.toggle("active", lang === "fr");
  if (langEn) langEn.classList.toggle("active", lang === "en");
}
function applyLanguage(lang) {
  const dict = I18N[lang] || I18N.fr;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });
  document.documentElement.lang = lang;
}

// ─── Animations d'apparition au scroll ───
function mountRevealAnimations() {
  const els = document.querySelectorAll("[data-animate]");
  if (!els.length) return;
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in-view"));
    return;
  }
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
}

document.addEventListener("DOMContentLoaded", () => applyLanguage(getLanguage()));
