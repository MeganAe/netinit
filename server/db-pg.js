// ─── Backend base de données : Postgres (production Vercel) ───
// Utilisé automatiquement quand POSTGRES_URL est présente dans les
// variables d'environnement — ce qui est fait automatiquement par Vercel
// dès qu'une base "Postgres" est créée et rattachée au projet depuis
// l'onglet Storage du dashboard. Voir README.md pour la procédure.

const { sql } = require("@vercel/postgres");
const { LECONS, QUIZ } = require("./content");

let ready = null;

// Crée les tables si besoin et insère le contenu pédagogique une seule
// fois. Toutes les fonctions exportées attendent cette promesse avant
// d'exécuter une requête (utile au cold start d'une fonction serverless).
function init() {
  if (!ready) {
    ready = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS utilisateurs (
          id SERIAL PRIMARY KEY,
          nom TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          mot_de_passe TEXT NOT NULL,
          date_inscription TIMESTAMP NOT NULL DEFAULT now()
        );`;
      await sql`
        CREATE TABLE IF NOT EXISTS lecons (
          id SERIAL PRIMARY KEY,
          titre TEXT NOT NULL, resume TEXT NOT NULL, icone TEXT NOT NULL,
          contenu TEXT NOT NULL, ordre INTEGER NOT NULL
        );`;
      await sql`
        CREATE TABLE IF NOT EXISTS quiz (
          id SERIAL PRIMARY KEY,
          lecon_id INTEGER NOT NULL REFERENCES lecons(id),
          question TEXT NOT NULL, options JSONB NOT NULL, reponse_correcte TEXT NOT NULL
        );`;
      await sql`
        CREATE TABLE IF NOT EXISTS progression (
          id SERIAL PRIMARY KEY,
          utilisateur_id INTEGER NOT NULL REFERENCES utilisateurs(id),
          lecon_id INTEGER NOT NULL REFERENCES lecons(id),
          terminee BOOLEAN NOT NULL DEFAULT false,
          score INTEGER NOT NULL DEFAULT 0,
          total INTEGER NOT NULL DEFAULT 0,
          date_completion TIMESTAMP,
          UNIQUE(utilisateur_id, lecon_id)
        );`;

      const { rows } = await sql`SELECT COUNT(*)::int AS n FROM lecons`;
      if (rows[0].n === 0) {
        for (let i = 0; i < LECONS.length; i++) {
          const l = LECONS[i];
          const { rows: inserted } = await sql`
            INSERT INTO lecons (titre, resume, icone, contenu, ordre)
            VALUES (${l.titre}, ${l.resume}, ${l.icone}, ${l.contenu}, ${l.ordre})
            RETURNING id`;
          const leconId = inserted[0].id;
          for (const q of QUIZ[i]) {
            await sql`
              INSERT INTO quiz (lecon_id, question, options, reponse_correcte)
              VALUES (${leconId}, ${q.q}, ${JSON.stringify(q.options)}, ${q.r})`;
          }
        }
        console.log(`[postgres] Base initialisée : ${LECONS.length} leçons.`);
      }
    })();
  }
  return ready;
}

module.exports = {
  getUserByEmail: async (email) => {
    await init();
    const { rows } = await sql`SELECT * FROM utilisateurs WHERE email = ${email}`;
    return rows[0] || null;
  },
  getUserById: async (id) => {
    await init();
    const { rows } = await sql`SELECT id, nom, email FROM utilisateurs WHERE id = ${id}`;
    return rows[0] || null;
  },
  createUser: async (nom, email, hash) => {
    await init();
    const { rows } = await sql`
      INSERT INTO utilisateurs (nom, email, mot_de_passe)
      VALUES (${nom}, ${email}, ${hash})
      RETURNING id, nom, email`;
    return rows[0];
  },

  getLecons: async () => {
    await init();
    const { rows } = await sql`SELECT id, titre, resume, icone, ordre FROM lecons ORDER BY ordre`;
    return rows;
  },
  getLeconById: async (id) => {
    await init();
    const { rows } = await sql`SELECT * FROM lecons WHERE id = ${id}`;
    return rows[0] || null;
  },

  getQuizByLecon: async (leconId) => {
    await init();
    const { rows } = await sql`SELECT id, question, options FROM quiz WHERE lecon_id = ${leconId}`;
    return rows;
  },
  getQuizAnswersByLecon: async (leconId) => {
    await init();
    const { rows } = await sql`SELECT id, reponse_correcte FROM quiz WHERE lecon_id = ${leconId}`;
    return rows;
  },

  getProgressionForUser: async (userId) => {
    await init();
    const { rows } = await sql`
      SELECT lecon_id, terminee, score, total, date_completion
      FROM progression WHERE utilisateur_id = ${userId}`;
    return rows;
  },
  upsertProgression: async (userId, leconId, score, total) => {
    await init();
    await sql`
      INSERT INTO progression (utilisateur_id, lecon_id, terminee, score, total, date_completion)
      VALUES (${userId}, ${leconId}, true, ${score}, ${total}, now())
      ON CONFLICT (utilisateur_id, lecon_id)
      DO UPDATE SET terminee = true, score = ${score}, total = ${total}, date_completion = now()`;
    return true;
  },
};
