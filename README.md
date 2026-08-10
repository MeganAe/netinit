# AlertBukavu — Bureau d'apprentissage macOS

## ⚠️ Important : ce projet doit être hébergé, pas ouvert en double-cliquant

Contrairement à un simple fichier HTML, ce projet est composé de plusieurs
fichiers (index.html, shell.css, shell.js, manifest.json, et les vrais
fichiers de chacun dans students/). Le navigateur a besoin de les charger
via une adresse http:// ou https:// pour que tout fonctionne (c'est une
règle de sécurité de tous les navigateurs, pas un bug de ce projet).

Si tu ouvres index.html directement depuis tes fichiers (file://), le
bureau va s'afficher mais les dossiers resteront vides.

## Comment le mettre en ligne (gratuit, 2 minutes, sans rien installer)

**Avec Vercel (recommandé, c'est ce qui héberge déjà AlertBukavu) :**

1. Va sur https://vercel.com et connecte-toi (ou crée un compte gratuit)
2. Clique sur "Add New" → "Project"
3. Choisis "Deploy" sans dépôt Git, puis glisse-dépose tout le dossier
   `alertbukavu_macos_project` (celui qui contient index.html) dans la zone
   d'upload
4. Clique sur "Deploy" — en quelques secondes tu obtiens un lien du type
   `https://ton-projet.vercel.app`
5. Envoie ce lien au groupe — tout le monde peut l'ouvrir directement dans
   son navigateur, y compris sur iPhone, sans rien télécharger

**Alternative : Netlify** fonctionne pareil (glisser-déposer sur
https://app.netlify.com/drop).

## Structure du projet

```
index.html          → le "bureau" (shell de l'interface)
shell.css            → les styles de l'interface
shell.js              → toute la logique (fenêtres, Finder, éditeur, aperçu)
manifest.json         → qui a quels fichiers (modifiable sans toucher au code)
students/
  grace/               → vraies copies des fichiers de Byanibyo Grâce
  josue/                → vraies copies des fichiers de Fazili Katabwe Josué
  marie-anne/            → vraies copies des fichiers de Fataki Byambese Marie Anne
  ornella/                → vraies copies des fichiers de Feza Cizungu Ornella
```

Tous les fichiers dans `students/` sont des copies strictement identiques
(vérifiées avec `diff`) aux vrais fichiers du projet AlertBukavu — rien n'a
été modifié, réécrit ni encodé.

## Ce que chaque membre peut faire dans l'interface

- Cliquer sur son dossier (bureau ou Dock) → voir ses fichiers assignés
- Cliquer sur un fichier → voir le vrai code source, avec coloration
  syntaxique et les "points clés à repérer"
- Onglet "Aperçu" → voir le rendu réel de la page (un vrai iframe qui
  charge le vrai fichier, pas une simulation)
- Bouton "Voir en direct" → ouvre la version réellement déployée sur
  tyu-ten.vercel.app
- Bouton "Copier le code"

## Limite connue

Les fichiers HTML référencent `config.js` (le JavaScript métier, volontairement
non inclus ici) et quelques bibliothèques externes (SweetAlert2, Google Ads).
Dans l'aperçu, ces éléments ne se chargeront pas — c'est normal, l'objectif
est de réviser le HTML/CSS, pas de faire tourner l'application complète.
