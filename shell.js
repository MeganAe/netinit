let TEAM = [];
let currentPersonId = null;
let currentFile = null;
let zTop = 20;
const isMobile = () => window.innerWidth <= 768;

// ── Chargement des données réelles (manifest.json) ─────────────────────────
fetch('manifest.json')
  .then(r => { if (!r.ok) throw new Error('manifest not ok'); return r.json(); })
  .then(data => {
    TEAM = data.team;
    buildDesktopIcons();
    buildDock();
    updateClock();
    setInterval(updateClock, 30000);
  })
  .catch(err => {
    console.error(err);
    document.getElementById('boot-error').classList.remove('hidden');
  });

function updateClock(){
  const d = new Date();
  const jours = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'];
  const hh = d.getHours().toString().padStart(2,'0');
  const mm = d.getMinutes().toString().padStart(2,'0');
  document.getElementById('clock').textContent = `${jours[d.getDay()]} ${hh}:${mm}`;
}

// ── Construction du bureau et du dock à partir du manifest ─────────────────
function buildDesktopIcons(){
  const wrap = document.getElementById('desktop-icons');
  wrap.innerHTML = '';
  TEAM.forEach(person => {
    const btn = document.createElement('button');
    btn.className = 'desktop-icon';
    btn.innerHTML = `<span class="folder-glyph">📁</span><span class="folder-label">${person.name}</span>`;
    btn.addEventListener('click', () => openFolder(person.id));
    wrap.appendChild(btn);
  });
}

function buildDock(){
  const dock = document.getElementById('dock');
  dock.innerHTML = '';
  TEAM.forEach(person => {
    const btn = document.createElement('button');
    btn.className = 'dock-item';
    btn.textContent = '📁';
    btn.title = person.name;
    btn.addEventListener('click', () => openFolder(person.id));
    dock.appendChild(btn);
  });
}

// ── Finder ───────────────────────────────────────────────────────────────
function openFolder(personId){
  currentPersonId = personId;
  const person = TEAM.find(p => p.id === personId);
  if (!person) return;

  if (isMobile()){
    openMobileFinder(person);
    return;
  }

  document.getElementById('finder-title').textContent = person.name;

  const sidebar = document.getElementById('finder-sidebar');
  sidebar.innerHTML = '<div class="sidebar-label">Équipe</div>' + TEAM.map(p => `
    <button class="sidebar-item ${p.id === personId ? 'active' : ''}" data-person="${p.id}">${p.name}</button>
  `).join('');
  sidebar.querySelectorAll('.sidebar-item').forEach(el => {
    el.addEventListener('click', () => openFolder(el.getAttribute('data-person')));
  });

  const files = document.getElementById('finder-files');
  files.innerHTML = person.files.map(f => `
    <button class="file-icon" data-path="${f.path}">
      <span class="glyph">${f.label.split('.').pop().toUpperCase()}</span>
      <span class="fname">${f.label}</span>
    </button>
  `).join('');
  files.querySelectorAll('.file-icon').forEach(el => {
    el.addEventListener('click', () => {
      const path = el.getAttribute('data-path');
      const file = person.files.find(f => f.path === path);
      openFile(file, person);
    });
  });

  showWindow('finder-window');
}

// ── Finder mobile (liste plein écran, tactile) ──────────────────────────────
function openMobileFinder(person){
  document.getElementById('mobile-finder-title').textContent = person.name;

  const list = document.getElementById('mobile-finder-list');
  list.innerHTML = person.files.map(f => `
    <button class="mobile-file-row" data-path="${f.path}">
      <span class="glyph">${f.label.split('.').pop().toUpperCase()}</span>
      <span class="meta">
        <span class="fname">${f.label}</span>
        <span class="fdesc">${f.desc || ''}</span>
      </span>
      <span class="chev">›</span>
    </button>
  `).join('');
  list.querySelectorAll('.mobile-file-row').forEach(el => {
    el.addEventListener('click', () => {
      const path = el.getAttribute('data-path');
      const file = person.files.find(f => f.path === path);
      openFile(file, person);
    });
  });

  document.getElementById('mobile-finder').classList.remove('hidden');
}
document.getElementById('mobile-finder-back').addEventListener('click', () => {
  document.getElementById('mobile-finder').classList.add('hidden');
});

// ── Ouverture d'un fichier (éditeur + aperçu réel) ──────────────────────────
async function openFile(file, person){
  currentFile = file;
  const isMobileView = isMobile();
  const raw = await fetch(file.path).then(r => r.text());
  const lang = file.label.endsWith('.css') ? 'css' : 'xml';

  if (isMobileView){
    document.getElementById('mobile-title').textContent = file.label;
    const codeEl = document.getElementById('mobile-code-content');
    codeEl.textContent = raw;
    codeEl.className = 'language-' + lang;
    delete codeEl.dataset.highlighted;
    if (window.hljs) { try { hljs.highlightElement(codeEl); } catch(e){ console.warn('hljs error', e); } }

    const pointsBox = document.getElementById('mobile-points');
    fillPoints(pointsBox, file.points);

    document.getElementById('mobile-preview-frame').src = file.path;
    document.getElementById('mobile-live-link').href = file.live || '#';

    document.getElementById('mobile-viewer').classList.remove('hidden');
    setMobileView('code');
  } else {
    document.getElementById('code-title').textContent = `${file.label} — ${person.name}`;
    const codeEl = document.getElementById('code-content');
    codeEl.textContent = raw;
    codeEl.className = 'language-' + lang;
    delete codeEl.dataset.highlighted;
    if (window.hljs) { try { hljs.highlightElement(codeEl); } catch(e){ console.warn('hljs error', e); } }

    const lines = (raw.match(/\n/g) || []).length + 1;
    document.getElementById('code-lines').innerHTML = Array.from({length: lines}, (_, i) => i + 1).join('<br/>');

    fillPoints(document.getElementById('code-points'), file.points);

    document.getElementById('preview-frame').src = file.path;
    document.getElementById('live-link').href = file.live || '#';
    document.getElementById('lang-label').textContent = lang.toUpperCase();

    setCodeView('code');
    showWindow('code-window');
  }
}

function fillPoints(box, points){
  if (points && points.length){
    box.innerHTML = `<div class="p-label">Points clés à repérer</div>` +
      points.map(p => `<div class="p-item">• ${p}</div>`).join('');
    box.classList.add('show');
  } else {
    box.classList.remove('show');
  }
}

// ── Onglets Code / Aperçu (desktop) ─────────────────────────────────────────
document.querySelectorAll('#code-window .code-tab').forEach(tab => {
  tab.addEventListener('click', () => setCodeView(tab.getAttribute('data-view')));
});
function setCodeView(view){
  document.querySelectorAll('#code-window .code-tab').forEach(t => t.classList.toggle('active', t.getAttribute('data-view') === view));
  document.getElementById('view-code').classList.toggle('active', view === 'code');
  document.getElementById('view-preview').classList.toggle('active', view === 'preview');
}

// ── Onglets Code / Aperçu (mobile) ──────────────────────────────────────────
document.querySelectorAll('.mobile-tabs .code-tab').forEach(tab => {
  tab.addEventListener('click', () => setMobileView(tab.getAttribute('data-mview')));
});
function setMobileView(view){
  document.querySelectorAll('.mobile-tabs .code-tab').forEach(t => t.classList.toggle('active', t.getAttribute('data-mview') === view));
  document.getElementById('mobile-view-code').classList.toggle('active', view === 'code');
  document.getElementById('mobile-view-preview').classList.toggle('active', view === 'preview');
}
document.getElementById('mobile-back').addEventListener('click', () => {
  document.getElementById('mobile-viewer').classList.add('hidden');
});

// ── Copier / Actualiser ─────────────────────────────────────────────────────
function copyCurrentFile(targetBtn){
  if (!currentFile) return;
  fetch(currentFile.path).then(r => r.text()).then(text => {
    navigator.clipboard.writeText(text).then(() => {
      const old = targetBtn.textContent;
      targetBtn.textContent = 'Copié ✓';
      setTimeout(() => targetBtn.textContent = old, 1300);
    });
  });
}
document.getElementById('copy-btn').addEventListener('click', (e) => copyCurrentFile(e.target));
document.getElementById('mobile-copy-btn').addEventListener('click', (e) => copyCurrentFile(e.target));
document.getElementById('refresh-btn').addEventListener('click', () => {
  const frame = document.getElementById('preview-frame');
  if (currentFile) frame.src = currentFile.path + '?t=' + Date.now();
});

// ── Gestion des fenêtres (fermer / minimiser / passer au premier plan) ─────
function showWindow(id){
  const el = document.getElementById(id);
  el.classList.remove('hidden');
  el.classList.remove('minimized');
  zTop += 1;
  el.style.zIndex = zTop;
}
document.querySelectorAll('[data-action="close"]').forEach(btn => {
  btn.addEventListener('click', () => document.getElementById(btn.getAttribute('data-target')).classList.add('hidden'));
});
document.querySelectorAll('[data-action="minimize"]').forEach(btn => {
  btn.addEventListener('click', () => document.getElementById(btn.getAttribute('data-target')).classList.add('minimized'));
});
document.querySelectorAll('.window').forEach(win => {
  win.addEventListener('mousedown', () => { zTop += 1; win.style.zIndex = zTop; });
});

// ── Fenêtres déplaçables (glisser depuis la barre de titre) ────────────────
document.querySelectorAll('.drag-handle').forEach(handle => {
  handle.addEventListener('mousedown', (e) => {
    if (e.target.closest('.tl')) return; // ignore les boutons ronds
    const win = document.getElementById(handle.getAttribute('data-target'));
    const rect = win.getBoundingClientRect();
    const offX = e.clientX - rect.left;
    const offY = e.clientY - rect.top;
    win.style.left = rect.left + 'px';
    win.style.top = rect.top + 'px';
    win.style.right = 'auto';
    win.style.bottom = 'auto';

    function onMove(ev){
      win.style.left = (ev.clientX - offX) + 'px';
      win.style.top = (ev.clientY - offY) + 'px';
    }
    function onUp(){
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });
});
