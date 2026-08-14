# NetInit — Plateforme d'apprentissage en ligne

Plateforme web permettant d'acquérir les compétences numériques de base
(navigateur, recherche, email, sécurité, réseaux sociaux, stockage cloud,
achats en ligne, visioconférence) à travers 8 modules interactifs, chacun
suivi d'un quiz, avec suivi de progression, classement et profil personnalisable.

**Déployée sur Vercel : https://netinit.vercel.app**

## Stack technique

- **Frontend** : HTML + Tailwind CSS (CDN) + JavaScript vanilla, aucun build
- **Backend** : Node.js + Express, exécuté comme fonction serverless Vercel
- **Authentification** : cookie JWT httpOnly (sans état, compatible serverless)
- **Base de données** :
  - En **local** : SQLite via le module natif `node:sqlite` — zéro configuration
  - Sur **Vercel** : Postgres via l'intégration **Neon** — bascule automatique
    dès que `DATABASE_URL` (ou `POSTGRES_URL`) est présente

## Développement local

```bash
npm install
npm run dev
```

Puis ouvrir **http://localhost:3000**. Aucune configuration nécessaire —
SQLite est utilisé automatiquement (fichier `data/netinit.db`, ignoré par Git).

## Déploiement Vercel

1. Pousser le projet sur un dépôt Git, puis l'importer sur vercel.com.
2. Onglet **Storage** → **Create Database** → choisir **Neon** (Postgres) →
   **Connect to Project** vers ce projet. `DATABASE_URL` est injectée
   automatiquement.
3. **Settings → Environment Variables** → ajouter `JWT_SECRET` (chaîne
   aléatoire longue).
4. Redéployer. Les tables et le contenu des 8 leçons se créent/synchronisent
   automatiquement au démarrage (voir `server/db-pg.js`).

## Structure du projet

```
netinit-vercel/
├── api/index.js         → point d'entrée serverless (exporte l'app Express)
├── server/
│   ├── app.js             → routes API
│   ├── auth.js              → authentification par cookie JWT
│   ├── db.js                 → sélectionne Postgres ou SQLite selon l'environnement
│   ├── db-pg.js               → backend Postgres (production)
│   ├── db-sqlite.js            → backend SQLite (développement local)
│   └── content.js               → contenu des 8 leçons et de leurs quiz
├── dev-server.js         → lance l'app en local avec les fichiers statiques
├── index.html, login.html, register.html, dashboard.html,
│   lesson.html, quiz.html, profile.html, leaderboard.html, progress.html
├── js/common.js          → client API, avatars, i18n, mode sombre, animations
├── vercel.json
└── package.json
```

## Fonctionnalités

- Inscription / connexion, avec choix d'un avatar (DiceBear)
- 8 modules thématiques, chacun avec un quiz de 4 questions
- Suivi de progression individuel et classement des apprenants
- Profil : modification du nom, changement d'avatar, badges de réussite,
  suppression de compte
- Mode sombre et interface bilingue (français / anglais) pour la navigation
