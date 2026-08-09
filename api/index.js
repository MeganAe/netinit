// Point d'entrée utilisé par Vercel : une seule fonction serverless qui
// exécute l'application Express. Le fichier vercel.json redirige toutes
// les requêtes /api/* vers cette fonction (voir sa configuration).
module.exports = require("../server/app");
