// ─── Backend base de données : Postgres (production Vercel) ───
// Utilisé automatiquement quand POSTGRES_URL est présente dans les
// variables d'environnement — ce qui est fait automatiquement par Vercel
// dès qu'une base "Postgres" est créée et rattachée au projet depuis
// l'onglet Storage du dashboard. Voir README.md pour la procédure.

const { neon } = require("@neondatabase/serverless");
const { LECONS, QUIZ } = require("./content");

// Neon (utilisé nativement par l'intégration Postgres de Vercel) injecte
// DATABASE_URL ; certains projets migrés depuis l'ancien "Vercel Postgres"
// peuvent encore avoir POSTGRES_URL. On accepte les deux.
const sql = neon(process.env.DATABASE_URL || process.env.POSTGRES_URL, { fullResults: true });

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
          avatar_seed TEXT NOT NULL DEFAULT '',
          date_inscription TIMESTAMP NOT NULL DEFAULT now()
        );`;
      await sql`ALTER TABLE utilisateurs ADD COLUMN IF NOT EXISTS avatar_seed TEXT NOT NULL DEFAULT '';`;
      await sql`
        CREATE TABLE IF NOT EXISTS lecons (
          id SERIAL PRIMARY KEY,
          titre TEXT NOT NULL, resume TEXT NOT NULL, icone TEXT NOT NULL,
          contenu TEXT NOT NULL, astuce TEXT NOT NULL DEFAULT '', ordre INTEGER NOT NULL
        );`;
      await sql`ALTER TABLE lecons ADD COLUMN IF NOT EXISTS astuce TEXT NOT NULL DEFAULT '';`;
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
            INSERT INTO lecons (titre, resume, icone, contenu, astuce, ordre)
            VALUES (${l.titre}, ${l.resume}, ${l.icone}, ${l.contenu}, ${l.astuce || ""}, ${l.ordre})
            RETURNING id`;
          const leconId = inserted[0].id;
          for (const q of QUIZ[i]) {
            await sql`
              INSERT INTO quiz (lecon_id, question, options, reponse_correcte)
              VALUES (${leconId}, ${q.q}, ${JSON.stringify(q.options)}, ${q.r})`;
          }
        }
        console.log(`[postgres] Base initialisée : ${LECONS.length} leçons.`);
      } else {
        // Synchronise le contenu (texte des leçons + quiz) avec content.js à
        // chaque démarrage, pour que les mises à jour du contenu pédagogique
        // se propagent sans perdre les comptes ni la progression des étudiants.
        // Upsert : met à jour une leçon existante (par ordre), ou la crée si
        // elle n'existe pas encore (ex : nouvelle leçon ajoutée à content.js).
        for (let i = 0; i < LECONS.length; i++) {
          const l = LECONS[i];
          const { rows: existing } = await sql`SELECT id FROM lecons WHERE ordre = ${l.ordre}`;
          let leconId;
          if (existing.length === 0) {
            const { rows: inserted } = await sql`
              INSERT INTO lecons (titre, resume, icone, contenu, astuce, ordre)
              VALUES (${l.titre}, ${l.resume}, ${l.icone}, ${l.contenu}, ${l.astuce || ""}, ${l.ordre})
              RETURNING id`;
            leconId = inserted[0].id;
          } else {
            leconId = existing[0].id;
            await sql`
              UPDATE lecons SET titre = ${l.titre}, resume = ${l.resume}, icone = ${l.icone},
                                 contenu = ${l.contenu}, astuce = ${l.astuce || ""}
              WHERE id = ${leconId}`;
          }
          await sql`DELETE FROM quiz WHERE lecon_id = ${leconId}`;
          for (const q of QUIZ[i]) {
            await sql`
              INSERT INTO quiz (lecon_id, question, options, reponse_correcte)
              VALUES (${leconId}, ${q.q}, ${JSON.stringify(q.options)}, ${q.r})`;
          }
        }

        // Supprime les leçons orphelines : celles présentes en base mais qui
        // n'existent plus dans content.js (ex : ancienne version du contenu,
        // tentative de test précédente). Sans cette étape, ces leçons restent
        // affichées indéfiniment sur le tableau de bord.
        const validOrdres = LECONS.map((l) => l.ordre);
        const { rows: orphans } = await sql`
          SELECT id FROM lecons WHERE ordre != ALL(${validOrdres})`;
        for (const o of orphans) {
          await sql`DELETE FROM progression WHERE lecon_id = ${o.id}`;
          await sql`DELETE FROM quiz WHERE lecon_id = ${o.id}`;
          await sql`DELETE FROM lecons WHERE id = ${o.id}`;
        }
        if (orphans.length > 0) {
          console.log(`[postgres] ${orphans.length} leçon(s) orpheline(s) supprimée(s).`);
        }
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
    const { rows } = await sql`SELECT id, nom, email, avatar_seed, date_inscription FROM utilisateurs WHERE id = ${id}`;
    return rows[0] || null;
  },
  createUser: async (nom, email, hash, avatarSeed) => {
    await init();
    const { rows } = await sql`
      INSERT INTO utilisateurs (nom, email, mot_de_passe, avatar_seed)
      VALUES (${nom}, ${email}, ${hash}, ${avatarSeed || email})
      RETURNING id, nom, email, avatar_seed`;
    return rows[0];
  },
  updateAvatar: async (userId, avatarSeed) => {
    await init();
    await sql`UPDATE utilisateurs SET avatar_seed = ${avatarSeed} WHERE id = ${userId}`;
    return true;
  },
  updateName: async (userId, nom) => {
    await init();
    await sql`UPDATE utilisateurs SET nom = ${nom} WHERE id = ${userId}`;
    return true;
  },
  deleteUser: async (userId) => {
    await init();
    await sql`DELETE FROM progression WHERE utilisateur_id = ${userId}`;
    await sql`DELETE FROM utilisateurs WHERE id = ${userId}`;
    return true;
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

  getLeaderboard: async () => {
    await init();
    const { rows } = await sql`
      SELECT u.id, u.nom, u.avatar_seed,
             COUNT(p.id)::int AS lecons_terminees,
             COALESCE(SUM(p.score), 0)::int AS score_total
      FROM utilisateurs u
      LEFT JOIN progression p ON p.utilisateur_id = u.id AND p.terminee = true
      GROUP BY u.id
      ORDER BY lecons_terminees DESC, score_total DESC
      LIMIT 20`;
    return rows;
  },
};
