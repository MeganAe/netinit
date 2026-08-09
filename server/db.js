// ─── Sélection automatique du backend base de données ───
// - Sur Vercel, dès qu'une base "Postgres" est rattachée au projet
//   (onglet Storage du dashboard), POSTGRES_URL est injectée automatiquement
//   → db-pg.js est utilisé, avec persistance réelle des données.
// - En local, sans configuration, POSTGRES_URL est absente
//   → db-sqlite.js est utilisé (fichier local dans /data).
//
// Les deux fichiers exposent exactement la même interface, donc le reste
// du code (server/app.js) ne fait jamais la distinction.

module.exports = process.env.POSTGRES_URL
  ? require("./db-pg")
  : require("./db-sqlite");
