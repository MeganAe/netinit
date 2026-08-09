// ─── Petit client API ───
async function api(path, options = {}) {
  const res = await fetch(path, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  let data = null;
  try { data = await res.json(); } catch (_) { /* réponse vide */ }
  if (!res.ok) {
    throw new Error((data && data.error) || "Une erreur est survenue.");
  }
  return data;
}

// ─── Icônes en ligne (SVG), pas de dépendance externe ───
const ICONS = {
  compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M14.8 9.2l-1.6 4.8-4.8 1.6 1.6-4.8z"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6z"/><path d="M9.5 12l1.8 1.8L15 10"/></svg>',
};
function iconMarkup(name) { return ICONS[name] || ICONS.compass; }

// ─── Barres de signal (motif de progression, 0 à 4) ───
function signalBarsMarkup(activeCount, total = 4) {
  let html = "";
  for (let i = 1; i <= total; i++) {
    html += `<i class="${i <= activeCount ? "on" : ""}"></i>`;
  }
  return html;
}

// ─── Navigation commune à toutes les pages ───
async function mountNav(activePath) {
  const root = document.getElementById("nav-root");
  if (!root) return;

  let user = null;
  try { user = await api("/api/me"); } catch (_) { user = null; }

  const links = [
    { href: "/index.html", label: "Accueil" },
  ];

  const linkHtml = links
    .map((l) => `<a href="${l.href}" ${activePath === l.href ? 'style="color:var(--ink);font-weight:700;"' : ""}>${l.label}</a>`)
    .join("");

  const rightHtml = user
    ? `<div class="nav-user">
         <a href="/dashboard.html" ${activePath === "/dashboard.html" ? 'style="color:var(--ink);font-weight:700;"' : ""}>Tableau de bord</a>
         <span class="sep">·</span>
         <a href="/progress.html" ${activePath === "/progress.html" ? 'style="color:var(--ink);font-weight:700;"' : ""}>Progression</a>
         <span class="who">${escapeHtml(user.nom.split(" ")[0])}</span>
         <button class="btn btn-ghost" id="logout-btn" style="padding:8px 16px;">Déconnexion</button>
       </div>`
    : `<div class="nav-user">
         <a href="/login.html">Connexion</a>
         <a href="/register.html" class="btn btn-accent" style="padding:9px 18px;">Commencer</a>
       </div>`;

  root.innerHTML = `
    <div class="nav-inner container">
      <a href="/index.html" class="brand">
        <span class="signal-mark"><i></i><i></i><i></i><i></i></span>
        NetInit
      </a>
      <nav class="nav-links">${linkHtml}${rightHtml}</nav>
    </div>`;

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      await api("/api/logout", { method: "POST" });
      window.location.href = "/index.html";
    });
  }

  return user;
}

// ─── Protection de page : redirige vers /login.html si non connecté ───
async function requireUser() {
  try {
    return await api("/api/me");
  } catch (_) {
    window.location.href = "/login.html";
    return null;
  }
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// ─── Petit analyseur de contenu (paragraphes + listes à puces) ───
function renderProse(text) {
  const blocks = text.trim().split(/\n\s*\n/);
  return blocks
    .map((block) => {
      const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
      if (lines.every((l) => l.startsWith("- "))) {
        const items = lines.map((l) => `<li>${escapeHtml(l.slice(2))}</li>`).join("");
        return `<ul>${items}</ul>`;
      }
      return `<p>${escapeHtml(block.trim())}</p>`;
    })
    .join("");
}
