// ─── Backend base de données : SQLite (développement local) ───
// Utilisé automatiquement quand la variable d'environnement POSTGRES_URL
// est absente (voir server/db.js). Fonctionne avec le module natif
// node:sqlite de Node.js — aucune dépendance à installer, mais nécessite
// Node.js 22.5 ou plus récent.
//
// ATTENTION : le fichier écrit dans /data ne persiste PAS sur Vercel
// (système de fichiers en lecture seule / éphémère). C'est pourquoi ce
// backend n'est utilisé qu'en local ; en production, voir db-pg.js.

const path = require("node:path");
const fs = require("node:fs");
const { DatabaseSync } = require("node:sqlite");
const { LECONS, QUIZ } = require("./content");

const DATA_DIR = path.join(__dirname, "..", "data");
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new DatabaseSync(path.join(DATA_DIR, "netinit.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS utilisateurs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    mot_de_passe TEXT NOT NULL,
    avatar_seed TEXT NOT NULL DEFAULT '',
    date_inscription TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS lecons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titre TEXT NOT NULL, resume TEXT NOT NULL, icone TEXT NOT NULL,
    contenu TEXT NOT NULL, astuce TEXT NOT NULL DEFAULT '', ordre INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS quiz (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lecon_id INTEGER NOT NULL REFERENCES lecons(id),
    question TEXT NOT NULL, options TEXT NOT NULL, reponse_correcte TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS progression (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    utilisateur_id INTEGER NOT NULL REFERENCES utilisateurs(id),
    lecon_id INTEGER NOT NULL REFERENCES lecons(id),
    terminee INTEGER NOT NULL DEFAULT 0,
    score INTEGER NOT NULL DEFAULT 0,
    total INTEGER NOT NULL DEFAULT 0,
    date_completion TEXT,
    UNIQUE(utilisateur_id, lecon_id)
  );
`);

// Migration douce pour une base déjà créée avant l'ajout de ces colonnes.
["ALTER TABLE utilisateurs ADD COLUMN avatar_seed TEXT NOT NULL DEFAULT ''", "ALTER TABLE lecons ADD COLUMN astuce TEXT NOT NULL DEFAULT ''"]
  .forEach((stmt) => { try { db.exec(stmt); } catch (_) { /* colonne déjà existante */ } });

(function seed() {
  const count = db.prepare("SELECT COUNT(*) AS n FROM lecons").get().n;
  if (count === 0) {
    const insertLecon = db.prepare("INSERT INTO lecons (titre, resume, icone, contenu, astuce, ordre) VALUES (?, ?, ?, ?, ?, ?)");
    const insertQuiz = db.prepare("INSERT INTO quiz (lecon_id, question, options, reponse_correcte) VALUES (?, ?, ?, ?)");
    LECONS.forEach((l, i) => {
      const res = insertLecon.run(l.titre, l.resume, l.icone, l.contenu, l.astuce || "", l.ordre);
      const leconId = Number(res.lastInsertRowid);
      QUIZ[i].forEach((q) => insertQuiz.run(leconId, q.q, JSON.stringify(q.options), q.r));
    });
    console.log(`[sqlite] Base initialisée : ${LECONS.length} leçons, ${QUIZ.flat().length} questions.`);
  } else {
    // Synchronise le contenu avec content.js (utile en dev si le fichier change).
    const updateLecon = db.prepare("UPDATE lecons SET titre=?, resume=?, icone=?, contenu=?, astuce=? WHERE ordre=?");
    const deleteQuiz = db.prepare("DELETE FROM quiz WHERE lecon_id=?");
    const insertQuiz = db.prepare("INSERT INTO quiz (lecon_id, question, options, reponse_correcte) VALUES (?, ?, ?, ?)");
    const getIdByOrdre = db.prepare("SELECT id FROM lecons WHERE ordre=?");
    LECONS.forEach((l, i) => {
      updateLecon.run(l.titre, l.resume, l.icone, l.contenu, l.astuce || "", l.ordre);
      const row = getIdByOrdre.get(l.ordre);
      if (!row) return;
      deleteQuiz.run(row.id);
      QUIZ[i].forEach((q) => insertQuiz.run(row.id, q.q, JSON.stringify(q.options), q.r));
    });
  }
})();

// Toutes les fonctions renvoient une Promise pour respecter la même
// interface que le backend Postgres (voir db-pg.js).
const wrap = (fn) => (...args) => Promise.resolve(fn(...args));

module.exports = {
  getUserByEmail: wrap((email) =>
    db.prepare("SELECT * FROM utilisateurs WHERE email = ?").get(email)
  ),
  getUserById: wrap((id) =>
    db.prepare("SELECT id, nom, email, avatar_seed, date_inscription FROM utilisateurs WHERE id = ?").get(id)
  ),
  createUser: wrap((nom, email, hash, avatarSeed) => {
    const res = db
      .prepare("INSERT INTO utilisateurs (nom, email, mot_de_passe, avatar_seed) VALUES (?, ?, ?, ?)")
      .run(nom, email, hash, avatarSeed || email);
    return { id: Number(res.lastInsertRowid), nom, email, avatar_seed: avatarSeed || email };
  }),
  updateAvatar: wrap((userId, avatarSeed) => {
    db.prepare("UPDATE utilisateurs SET avatar_seed = ? WHERE id = ?").run(avatarSeed, userId);
    return true;
  }),

  getLecons: wrap(() => db.prepare("SELECT id, titre, resume, icone, ordre FROM lecons ORDER BY ordre").all()),
  getLeconById: wrap((id) => db.prepare("SELECT * FROM lecons WHERE id = ?").get(id)),

  getQuizByLecon: wrap((leconId) =>
    db.prepare("SELECT id, question, options FROM quiz WHERE lecon_id = ?").all(leconId)
      .map((q) => ({ ...q, options: JSON.parse(q.options) }))
  ),
  getQuizAnswersByLecon: wrap((leconId) =>
    db.prepare("SELECT id, reponse_correcte FROM quiz WHERE lecon_id = ?").all(leconId)
  ),

  getProgressionForUser: wrap((userId) =>
    db.prepare("SELECT lecon_id, terminee, score, total, date_completion FROM progression WHERE utilisateur_id = ?").all(userId)
  ),
  upsertProgression: wrap((userId, leconId, score, total) => {
    db.prepare(`
      INSERT INTO progression (utilisateur_id, lecon_id, terminee, score, total, date_completion)
      VALUES (?, ?, 1, ?, ?, datetime('now'))
      ON CONFLICT(utilisateur_id, lecon_id)
      DO UPDATE SET terminee = 1, score = excluded.score, total = excluded.total, date_completion = excluded.date_completion
    `).run(userId, leconId, score, total);
    return true;
  }),

  getLeaderboard: wrap(() =>
    db.prepare(`
      SELECT u.id, u.nom, u.avatar_seed,
             COUNT(p.id) AS lecons_terminees,
             COALESCE(SUM(p.score), 0) AS score_total
      FROM utilisateurs u
      LEFT JOIN progression p ON p.utilisateur_id = u.id AND p.terminee = 1
      GROUP BY u.id
      ORDER BY lecons_terminees DESC, score_total DESC
      LIMIT 20
    `).all()
  ),
};
