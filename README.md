# NetInit — Plateforme d'apprentissage numérique

Plateforme web moderne permettant aux apprenants de s'initier aux fondamentaux du Web, du Cloud, de la Cybersécurité et de l'Intelligence Artificielle à travers **10 leçons interactives** avec schémas explicatifs visuels et **40 questions de quiz**, suivies d'une attestation de réussite officielle.

**Déploiement en un clic sur Vercel : https://netinit.vercel.app/**

## Stack technique

- **Frontend** : HTML5, CSS (TailwindCSS v3 via CDN + Material Design 3 tokens), JavaScript Vanille
- **Backend** : Node.js + Express, exécuté comme fonction serverless (`/api`)
- **Authentification** : Cookie JWT httpOnly (sans état — compatible serverless)
- **Base de données** :
  - En **local** : SQLite via le module natif `node:sqlite` — zéro configuration
  - Sur **Vercel** : Postgres via l'intégration **Neon** (Marketplace Vercel) — bascule automatique dès que `DATABASE_URL` (ou `POSTGRES_URL`) est présente

## Développement local

Aucune configuration nécessaire — SQLite est utilisé automatiquement :

```bash
npm install
npm run dev
```

Puis ouvrir **http://localhost:3000**. Le fichier `data/netinit.db` est créé automatiquement avec les 10 leçons et 40 quiz.

## Déployer sur Vercel

1. Pousser le projet sur GitHub.
2. Importer le projet sur vercel.com.
3. Ajouter une base Postgres (Neon) dans l'onglet **Storage**.
4. Définir la variable d'environnement `JWT_SECRET`.
5. Redéployer : les tables et le contenu pédagogique des 10 leçons sont synchronisés automatiquement.
