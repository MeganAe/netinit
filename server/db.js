// ─── Sélection automatique du backend base de données ───
// - Sur Vercel, dès qu'une base Postgres (Neon, via le Marketplace Vercel)
//   est rattachée au projet, DATABASE_URL (ou POSTGRES_URL pour d'anciens
//   projets migrés) est injectée automatiquement
//   → db-pg.js est utilisé, avec persistance réelle des données.
// - En local, sans configuration, ces variables sont absentes
//   → db-sqlite.js est utilisé (fichier local dans /data).
//
// Les deux fichiers exposent exactement la même interface, donc le reste
// du code (server/app.js) ne fait jamais la distinction.

module.exports = (process.env.DATABASE_URL || process.env.POSTGRES_URL)
  ? require("./db-pg")
  : require("./db-sqlite");
