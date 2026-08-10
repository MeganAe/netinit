// ─── API Client ───
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

// ─── Avatars & Images ───
function avatarUrl(seed, size = 64) {
  if (!seed) seed = "netinit";
  if (typeof seed === "string" && (seed.startsWith("http://") || seed.startsWith("https://") || seed.startsWith("data:image/"))) {
    return seed;
  }
  return `https://api.dicebear.com/7.x/micah/svg?seed=${encodeURIComponent(seed)}&size=${size}&backgroundColor=fbe8d8,f2ece4,fce0e0`;
}

function escapeHtml(str) {
  return String(str || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// ─── Render Prose (Texte des leçons) ───
function renderProse(text) {
  if (!text) return "";
  const blocks = text.trim().split(/\n\s*\n/);
  return blocks.map((block) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("<div") && trimmed.endsWith("</div>")) {
      return trimmed;
    }
    const lines = trimmed.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length === 1 && lines[0].startsWith("## ")) {
      return `<h4 class="font-headline font-bold text-xl mt-6 mb-3 text-on-background">${escapeHtml(lines[0].slice(3))}</h4>`;
    }
    if (lines.every((l) => l.startsWith("- "))) {
      return `<ul class="list-disc pl-5 my-3 space-y-1.5">${lines.map((l) => `<li class="text-on-surface-variant font-body">${escapeHtml(l.slice(2))}</li>`).join("")}</ul>`;
    }
    return `<p class="mb-4 leading-relaxed text-on-surface-variant font-body">${escapeHtml(trimmed)}</p>`;
  }).join("");
}

function signalBarsHtml(activeCount, total = 10) {
  let html = "";
  for (let i = 1; i <= total; i++) html += `<i class="${i <= activeCount ? "on" : ""}"></i>`;
  return html;
}

// ─── Dictionnaire i18n ───
const TRANSLATIONS = {
  fr: {
    nav_dashboard: "Tableau de bord",
    nav_lessons: "Leçons",
    nav_leaderboard: "Classement",
    nav_profile: "Profil",
    nav_logout: "Déconnexion",
    platform_tag: "NetInit",
    header_settings: "Paramètres",
    header_notifications: "Notifications",
    settings_title: "Paramètres d'affichage",
    settings_darkmode: "Mode sombre",
    settings_darkmode_desc: "Basculer vers un thème sombre confortable.",
    settings_lang: "Langue de la plateforme",
    settings_lang_desc: "Choisissez votre langue d'affichage.",
    settings_close: "Fermer",
    notif_title: "Notifications",
    notif_empty: "Aucune nouvelle notification.",
    notif_mark_read: "Tout marquer comme lu",
    notif_1_title: "Mise à jour NetInit",
    notif_1_desc: "10 leçons fondamentales sont désormais disponibles.",
    notif_2_title: "Classement mis à jour",
    notif_2_desc: "Consultez la page classement pour voir votre position !",
    logout_confirm: "Êtes-vous sûr de vouloir vous déconnecter ?",
  },
  en: {
    nav_dashboard: "Dashboard",
    nav_lessons: "Lessons",
    nav_leaderboard: "Leaderboard",
    nav_profile: "Profile",
    nav_logout: "Log out",
    platform_tag: "NetInit",
    header_settings: "Settings",
    header_notifications: "Notifications",
    settings_title: "Display Settings",
    settings_darkmode: "Dark Mode",
    settings_darkmode_desc: "Switch to a dark comfortable theme.",
    settings_lang: "Platform Language",
    settings_lang_desc: "Choose your preferred display language.",
    settings_close: "Close",
    notif_title: "Notifications",
    notif_empty: "No new notifications.",
    notif_mark_read: "Mark all as read",
    notif_1_title: "NetInit Update",
    notif_1_desc: "10 fundamental lessons are now available.",
    notif_2_title: "Leaderboard Updated",
    notif_2_desc: "Check out the leaderboard page to see your position!",
    logout_confirm: "Are you sure you want to log out?",
  },
};

function currentLang() {
  return localStorage.getItem("netinit_lang") || "fr";
}

function setLang(lang) {
  if (!TRANSLATIONS[lang]) return;
  localStorage.setItem("netinit_lang", lang);
  applyTranslations();
}

function t(key) {
  const lang = currentLang();
  return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || (TRANSLATIONS.fr && TRANSLATIONS.fr[key]) || key;
}

function applyTranslations() {
  const lang = currentLang();
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key && TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
      el.textContent = TRANSLATIONS[lang][key];
    }
  });
}

// ─── Injection des Styles de Mode Sombre Globaux ───
function injectDarkStyles() {
  if (document.getElementById("netinit-dark-styles")) return;
  const style = document.createElement("style");
  style.id = "netinit-dark-styles";
  style.textContent = `
    html.dark, html.dark body {
      background-color: #161210 !important;
      color: #ece6dc !important;
    }
    html.dark header, html.dark nav {
      background-color: #211c19 !important;
      color: #ece6dc !important;
      border-color: rgba(184, 174, 166, 0.2) !important;
    }
    html.dark .bg-background {
      background-color: #161210 !important;
    }
    html.dark .bg-surface, html.dark .bg-surface-container-low {
      background-color: #211c19 !important;
    }
    html.dark .bg-surface-container-lowest, html.dark .bg-surface-container {
      background-color: #2a2420 !important;
      color: #ece6dc !important;
    }
    html.dark .text-on-background {
      color: #f5efe6 !important;
    }
    html.dark .text-on-surface-variant {
      color: #b8aea6 !important;
    }
    html.dark .border-outline-variant\\/60, html.dark .border-outline-variant\\/50, html.dark .border-outline-variant\\/40 {
      border-color: rgba(184, 174, 166, 0.2) !important;
    }
  `;
  document.head.appendChild(style);
}

function initTheme() {
  injectDarkStyles();
  const storedTheme = localStorage.getItem("netinit_theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("netinit_theme", isDark ? "dark" : "light");
}

initTheme();

// ─── Modale Paramètres & Notifications ───
function injectModals() {
  if (document.getElementById("settings-modal")) return;

  const modalHtml = `
    <!-- Modale Paramètres -->
    <div id="settings-modal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] hidden flex items-center justify-center p-4">
      <div class="bg-surface-container-lowest border border-outline-variant/60 rounded-2xl max-w-md w-full p-6 soft-shadow relative">
        <div class="flex items-center justify-between pb-4 border-b border-outline-variant/50">
          <div class="flex items-center gap-2 text-primary font-headline text-xl font-bold">
            <span class="material-symbols-outlined">settings</span>
            <span data-i18n="settings_title">${t("settings_title")}</span>
          </div>
          <button type="button" onclick="closeSettingsModal()" class="text-on-surface-variant hover:text-primary transition-colors p-1 rounded-lg">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <div class="py-6 space-y-6">
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="font-bold font-body text-sm text-on-background flex items-center gap-2">
                <span class="material-symbols-outlined text-primary text-base">dark_mode</span>
                <span data-i18n="settings_darkmode">${t("settings_darkmode")}</span>
              </p>
              <p class="text-xs text-on-surface-variant font-body mt-0.5" data-i18n="settings_darkmode_desc">${t("settings_darkmode_desc")}</p>
            </div>
            <button type="button" id="theme-toggle-btn" onclick="toggleTheme()" class="relative inline-flex h-6 w-11 items-center rounded-full bg-surface-container-high border border-outline-variant transition-colors focus:outline-none">
              <span class="inline-block h-4 w-4 transform rounded-full bg-primary transition-transform translate-x-1 dark:translate-x-6"></span>
            </button>
          </div>

          <div>
            <p class="font-bold font-body text-sm text-on-background mb-1 flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-base">translate</span>
              <span data-i18n="settings_lang">${t("settings_lang")}</span>
            </p>
            <p class="text-xs text-on-surface-variant font-body mb-3" data-i18n="settings_lang_desc">${t("settings_lang_desc")}</p>
            <div class="grid grid-cols-2 gap-3">
              <button type="button" onclick="setLang('fr')" class="px-4 py-2.5 rounded-xl border border-outline-variant text-sm font-bold font-body flex items-center justify-center gap-2 transition-all ${currentLang() === 'fr' ? 'bg-primary-container text-on-primary-container border-primary' : 'bg-surface-container-low text-on-surface-variant'}">
                Français
              </button>
              <button type="button" onclick="setLang('en')" class="px-4 py-2.5 rounded-xl border border-outline-variant text-sm font-bold font-body flex items-center justify-center gap-2 transition-all ${currentLang() === 'en' ? 'bg-primary-container text-on-primary-container border-primary' : 'bg-surface-container-low text-on-surface-variant'}">
                English
              </button>
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-outline-variant/50 text-right">
          <button type="button" onclick="closeSettingsModal()" class="px-5 py-2.5 bg-primary text-on-primary font-bold text-sm rounded-xl hover:bg-primary/90 transition-colors font-body" data-i18n="settings_close">${t("settings_close")}</button>
        </div>
      </div>
    </div>

    <!-- Tiroir Notifications -->
    <div id="notifications-drawer" class="fixed inset-y-0 right-0 w-full sm:w-96 bg-surface-container-lowest border-l border-outline-variant/60 z-[100] shadow-2xl transform translate-x-full transition-transform duration-300 ease-in-out p-6 flex flex-col">
      <div class="flex items-center justify-between pb-4 border-b border-outline-variant/50">
        <div class="flex items-center gap-2 text-primary font-headline text-xl font-bold">
          <span class="material-symbols-outlined">notifications</span>
          <span data-i18n="notif_title">${t("notif_title")}</span>
        </div>
        <button type="button" onclick="closeNotificationsDrawer()" class="text-on-surface-variant hover:text-primary transition-colors p-1 rounded-lg">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <div class="flex-1 overflow-y-auto py-4 space-y-4" id="notif-list">
        <div class="bg-surface-container-low border border-outline-variant/40 rounded-xl p-4 soft-shadow">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-bold font-label uppercase tracking-wider text-primary" data-i18n="notif_1_title">${t("notif_1_title")}</span>
            <span class="text-[10px] text-on-surface-variant">Info</span>
          </div>
          <p class="text-xs text-on-surface-variant font-body leading-relaxed" data-i18n="notif_1_desc">${t("notif_1_desc")}</p>
        </div>

        <div class="bg-surface-container-low border border-outline-variant/40 rounded-xl p-4 soft-shadow">
          <div class="flex items-center justify-between mb-1">
            <span class="text-xs font-bold font-label uppercase tracking-wider text-primary" data-i18n="notif_2_title">${t("notif_2_title")}</span>
            <span class="text-[10px] text-on-surface-variant">Hebdo</span>
          </div>
          <p class="text-xs text-on-surface-variant font-body leading-relaxed" data-i18n="notif_2_desc">${t("notif_2_desc")}</p>
        </div>
      </div>

      <div class="pt-4 border-t border-outline-variant/50">
        <button type="button" onclick="markAllNotificationsRead()" class="w-full py-2.5 border border-outline text-on-surface-variant hover:text-primary hover:border-primary font-bold text-xs rounded-xl transition-colors font-body" data-i18n="notif_mark_read">${t("notif_mark_read")}</button>
      </div>
    </div>
  `;

  const container = document.createElement("div");
  container.innerHTML = modalHtml;
  document.body.appendChild(container);
}

function openSettingsModal() {
  injectModals();
  const modal = document.getElementById("settings-modal");
  if (modal) modal.classList.remove("hidden");
}
function closeSettingsModal() {
  const modal = document.getElementById("settings-modal");
  if (modal) modal.classList.add("hidden");
}

function openNotificationsDrawer() {
  injectModals();
  const drawer = document.getElementById("notifications-drawer");
  if (drawer) drawer.classList.remove("translate-x-full");
}
function closeNotificationsDrawer() {
  const drawer = document.getElementById("notifications-drawer");
  if (drawer) drawer.classList.add("translate-x-full");
}

function markAllNotificationsRead() {
  const badge = document.getElementById("notif-badge");
  if (badge) badge.classList.add("hidden");
  closeNotificationsDrawer();
}

// ─── Protection & En-tête Authentifié ───
async function requireUser() {
  try { return await api("/api/me"); }
  catch (_) { window.location.href = "/login.html"; return null; }
}

function mountAuthedChrome(user) {
  injectModals();
  applyTranslations();

  const url = avatarUrl(user.avatar_seed || user.email, 48);
  const dAvatar = document.getElementById("dnav-avatar");
  const dName = document.getElementById("dnav-name");
  if (dAvatar) dAvatar.src = url;
  if (dName) dName.textContent = user.nom.split(" ")[0];

  // Header Mobile : Logo uniquement à gauche, Icônes Notifications & Paramètres à droite
  const mobileHeader = document.querySelector("header.md\\:hidden");
  if (mobileHeader) {
    mobileHeader.innerHTML = `
      <a href="/dashboard.html" class="font-headline text-2xl font-bold text-primary tracking-tight">NetInit</a>
      <div class="flex items-center gap-2">
        <button type="button" onclick="openNotificationsDrawer()" class="relative p-2 rounded-xl text-on-surface-variant hover:text-primary transition-colors" title="Notifications">
          <span class="material-symbols-outlined text-2xl">notifications</span>
          <span id="notif-badge" class="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-primary border-2 border-background"></span>
        </button>
        <button type="button" onclick="openSettingsModal()" class="p-2 rounded-xl text-on-surface-variant hover:text-primary transition-colors" title="Paramètres">
          <span class="material-symbols-outlined text-2xl">settings</span>
        </button>
      </div>
    `;
  }

  // Déconnexion
  const doLogout = async () => {
    if (confirm(t("logout_confirm"))) {
      await api("/api/logout", { method: "POST" });
      window.location.href = "/index.html";
    }
  };
  const b1 = document.getElementById("logout-btn-desktop");
  const b2 = document.getElementById("logout-btn-mobile");
  const b3 = document.getElementById("logout-btn-page");
  if (b1) b1.addEventListener("click", doLogout);
  if (b2) b2.addEventListener("click", doLogout);
  if (b3) b3.addEventListener("click", doLogout);
}

// ─── En-tête Public (SANS icône engrenage sur la landing page) ───
async function mountPublicNav() {
  injectModals();
  applyTranslations();
  let user = null;
  try { user = await api("/api/me"); } catch (_) { user = null; }
  const slot = document.getElementById("public-nav-slot");
  if (!slot) return user;
  slot.innerHTML = user
    ? `<a href="/dashboard.html" class="bg-primary text-on-primary font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-primary/90 transition-colors" data-i18n="nav_dashboard">${t("nav_dashboard")}</a>`
    : `<a href="/login.html" class="text-on-surface-variant hover:text-primary font-body text-sm hidden sm:inline">Se connecter</a>
       <a href="/register.html" class="bg-primary text-on-primary font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-primary/90 transition-colors">Commencer</a>`;
  return user;
}
