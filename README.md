# NetInit — Plateforme d'apprentissage en ligne (Projet tutoré UCB)

Plateforme web permettant aux nouveaux étudiants de l'UCB de s'initier à
Internet (navigateur, recherche, email, sécurité en ligne) à travers 4
leçons courtes suivies chacune d'un quiz, avec suivi de progression.

**Cette version est prête à être déployée sur Vercel.**

## Stack technique

- **Frontend** : HTML, CSS, JavaScript (aucun framework, aucun build)
- **Backend** : Node.js + Express, exécuté comme fonction serverless (`/api`)
- **Authentification** : cookie JWT httpOnly (sans état — compatible serverless)
- **Base de données** :
  - En **local** : SQLite via le module natif `node:sqlite` — zéro configuration
  - Sur **Vercel** : Postgres (Vercel Postgres) — bascule automatique dès que `POSTGRES_URL` est présente

## Déployer sur Vercel

### 1. Pousser le projet sur GitHub (ou GitLab/Bitbucket)

Vercel importe un projet depuis un dépôt Git.

### 2. Importer le projet sur vercel.com

Dashboard Vercel → **Add New → Project** → sélectionner le dépôt. Aucune
configuration de build à changer : `vercel.json` s'en charge.

### 3. Ajouter une base de données Postgres

Dans le projet Vercel → onglet **Storage** → **Create Database** → choisir
**Postgres** → la rattacher au projet. Vercel ajoute automatiquement la
variable d'environnement `POSTGRES_URL` (et ses variantes) — rien à copier
manuellement.

### 4. Définir la variable JWT_SECRET

Project **Settings → Environment Variables** → ajouter :

| Nom | Valeur |
|---|---|
| `JWT_SECRET` | une chaîne aléatoire longue (voir commande ci-dessous) |

Pour générer une valeur sûre :
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 5. Déployer

**Deploy**. Au premier appel à l'API, les tables sont créées automatiquement
et le contenu des 4 leçons + quiz est inséré (voir `server/db-pg.js`).

## Développement local

Aucune configuration nécessaire — SQLite est utilisé automatiquement :

```bash
npm install
npm run dev
```

Puis ouvrir **http://localhost:3000**. Le fichier `data/netinit.db` est créé
automatiquement (ignoré par Git). Pour repartir de zéro, supprimer `data/`.

## Structure du projet

```
netinit-vercel/
├── api/
│   └── index.js         → point d'entrée serverless (exporte l'app Express)
├── server/
│   ├── app.js             → routes API (Express)
│   ├── auth.js             → authentification par cookie JWT
│   ├── db.js                → sélectionne Postgres ou SQLite selon l'environnement
│   ├── db-pg.js              → backend Postgres (production Vercel)
│   ├── db-sqlite.js           → backend SQLite (développement local)
│   └── content.js              → contenu des 4 leçons et de leurs quiz
├── dev-server.js         → lance l'app en local avec les fichiers statiques
├── index.html, login.html, register.html, dashboard.html,
│   lesson.html, quiz.html, progress.html   → pages (à la racine, servies
│                                              telles quelles par Vercel)
├── css/style.css
├── js/common.js
├── vercel.json            → redirige /api/* vers la fonction serverless
├── .env.example
└── package.json
```

## Pourquoi ces choix (par rapport à la version précédente)

Vercel exécute chaque route comme une **fonction serverless** : le système
de fichiers est en lecture seule (sauf `/tmp`, non partagé) et rien ne
garantit qu'une même instance traite deux requêtes successives. Deux
conséquences pour l'architecture initiale (Express classique + SQLite en
fichier + sessions en mémoire) :

1. **SQLite en fichier local ne persiste pas** entre deux déploiements ni
   entre deux invocations → remplacé par **Postgres** en production, avec
   la même interface de fonctions (`server/db.js`) pour ne rien changer
   dans les routes.
2. **Les sessions en mémoire (`express-session` + `MemoryStore`) ne
   survivent pas** d'une instance à l'autre → remplacées par un **cookie
   JWT signé**, vérifiable sans état partagé.

Le reste (contenu pédagogique, design, fonctionnalités) est identique à la
version précédente.

## Fonctionnalités couvertes (cahier des charges du rapport)

- Inscription / connexion étudiant
- Consultation des leçons sur le thème Internet
- Quiz d'auto-évaluation après chaque leçon, avec calcul automatique du score
- Suivi de progression individuel (leçons terminées, scores, dates)

## Limites connues / pistes d'évolution

- Pas d'espace formateur pour ajouter du contenu sans modifier le code
- Contenu limité au thème Internet (voir perspectives du rapport)
