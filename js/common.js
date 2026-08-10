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
function avatarUrl(seed, size = 64) {
  return `https://api.dicebear.com/7.x/micah/svg?seed=${encodeURIComponent(seed || "netinit")}&size=${size}&backgroundColor=fbe8d8,f2ece4,fce0e0`;
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

// ─── Protection de page : redirige vers /login.html si non connecté ───
async function requireUser() {
  try { return await api("/api/me"); }
  catch (_) { window.location.href = "/login.html"; return null; }
}

// ─── Habillage commun des pages authentifiées (avatars nav, nom, déconnexion) ───
function mountAuthedChrome(user) {
  const url = avatarUrl(user.avatar_seed || user.email, 48);
  const dAvatar = document.getElementById("dnav-avatar");
  const mAvatar = document.getElementById("mnav-avatar");
  const dName = document.getElementById("dnav-name");
  if (dAvatar) dAvatar.src = url;
  if (mAvatar) mAvatar.src = url;
  if (dName) dName.textContent = user.nom.split(" ")[0];

  const doLogout = async () => {
    await api("/api/logout", { method: "POST" });
    window.location.href = "/index.html";
  };
  const b1 = document.getElementById("logout-btn-desktop");
  const b2 = document.getElementById("logout-btn-mobile");
  if (b1) b1.addEventListener("click", doLogout);
  if (b2) b2.addEventListener("click", doLogout);
}

// ─── Nav publique (index/login/register) : affiche l'état de connexion ───
async function mountPublicNav() {
  let user = null;
  try { user = await api("/api/me"); } catch (_) { user = null; }
  const slot = document.getElementById("public-nav-slot");
  if (!slot) return user;
  slot.innerHTML = user
    ? `<a href="/dashboard.html" class="bg-primary text-on-primary font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-primary/90 transition-colors">Mon tableau de bord</a>`
    : `<a href="/login.html" class="text-on-surface-variant hover:text-primary font-body text-sm hidden sm:inline">Se connecter</a>
       <a href="/register.html" class="bg-primary text-on-primary font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-primary/90 transition-colors">Commencer</a>`;
  return user;
}
