// Lance l'application en local, avec les fichiers statiques servis
// directement par Express (sur Vercel, c'est Vercel qui sert les fichiers
// statiques à la racine — ce fichier n'est utilisé qu'en développement).
const path = require("node:path");
const express = require("express");
const app = require("./server/app");

app.use(express.static(path.join(__dirname)));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`NetInit (dev local) démarré sur http://localhost:${PORT}`);
  if (!process.env.POSTGRES_URL) {
    console.log("→ Aucune POSTGRES_URL détectée : utilisation de SQLite en local (data/netinit.db).");
  }
});
