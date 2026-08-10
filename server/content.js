// ─── Contenu pédagogique NetInit (10 Leçons Fondamentales) ───
// Format : paragraphes séparés par une ligne vide ; sous-titres "## " ; listes "- "

const LECONS = [
  {
    titre: "Découvrir Internet et le navigateur",
    resume: "Comprendre le fonctionnement d'Internet, maîtriser les composants du navigateur et naviguer avec efficacité.",
    icone: "explore",
    ordre: 1,
    astuce: "Raccourcis indispensables : Ctrl + T ouvre un nouvel onglet, Ctrl + W le ferme, Ctrl + Tab passe à l'onglet suivant.",
    contenu: `Internet est un réseau mondial décentralisé reliant des milliards d'équipements informatiques (serveurs, ordinateurs, smartphones). Un site web est un ensemble de documents interconnectés hébergés sur des serveurs distants. Pour afficher et interagir avec ces documents, on utilise un logiciel spécialisé appelé navigateur web — Google Chrome, Mozilla Firefox, Microsoft Edge ou Apple Safari.

## Le rôle et le fonctionnement du navigateur

Le navigateur agit comme un traducteur universel. Lorsqu'une adresse web est saisie, le navigateur envoie une requête HTTP/HTTPS à un serveur distant. En réponse, le serveur retourne du code écrit en HTML (structure), CSS (mise en forme) et JavaScript (interactivité). Le moteur de rendu du navigateur interprète ce code en temps réel pour composer la page visuelle finale.

<div class="diagram-box my-6 p-4 rounded-xl border border-outline-variant/60 bg-surface-container-lowest font-body">
  <div class="text-xs font-bold uppercase tracking-wider text-primary mb-3 font-label">Schéma : Architecture d'une navigation Web</div>
  <div class="grid sm:grid-cols-3 gap-3 text-center text-xs">
    <div class="p-3 rounded-lg border border-outline-variant bg-surface-container-low">
      <span class="material-symbols-outlined text-primary text-2xl mb-1">devices</span>
      <p class="font-bold">1. Navigateur (Client)</p>
      <p class="text-on-surface-variant">Envoie la requête URL</p>
    </div>
    <div class="p-3 rounded-lg border border-outline-variant bg-surface-container-low">
      <span class="material-symbols-outlined text-primary text-2xl mb-1">dns</span>
      <p class="font-bold">2. Serveur DNS & Web</p>
      <p class="text-on-surface-variant">Trouve l'IP et traite</p>
    </div>
    <div class="p-3 rounded-lg border border-outline-variant bg-surface-container-low">
      <span class="material-symbols-outlined text-primary text-2xl mb-1">code</span>
      <p class="font-bold">3. Rendu de la Page</p>
      <p class="text-on-surface-variant">HTML, CSS & JavaScript</p>
    </div>
  </div>
</div>

Chaque page dispose d'une adresse unique appelée URL (Uniform Resource Locator), visible dans la barre d'adresse située en haut de l'écran.

## Les éléments d'interface essentiels

Pour utiliser un navigateur de manière fluide, il faut maîtriser ses composants clés :
- L'onglet : permet de consulter plusieurs sites simultanément dans une seule fenêtre.
- Les marque-pages (favoris) : permettent d'enregistrer des liens importants pour un accès instantané.
- L'historique de navigation : conserve le registre des pages consultées récemment.
- Le mode de navigation privée : empêche l'enregistrement local de l'historique et des cookies durant la session.

## Distinction essentielle : Navigateur vs Moteur de recherche vs Internet

Il convient de ne pas confondre ces trois éléments :
- Internet est l'infrastructure réseau physique et logique globale.
- Le navigateur est l'application installée sur votre appareil pour consulter le Web.
- Le moteur de recherche est un service Web (comme Google, DuckDuckGo ou Bing) accessible depuis le navigateur pour trouver des pages.`,
  },
  {
    titre: "Faire une recherche efficace",
    resume: "Optimiser vos requêtes de recherche, utiliser les opérateurs avancés et évaluer la fiabilité des sources.",
    icone: "search",
    ordre: 2,
    astuce: "Pour trouver un document PDF spécifique, ajoutez filetype:pdf à la fin de vos mots-clés dans la barre de recherche.",
    contenu: `Un moteur de recherche utilise des robots d'exploration (crawlers) pour parcourir le Web en continu, analyser le texte des pages et constituer un index gigantesque. Lorsque vous tapez des mots-clés, l'algorithme consulte cet index et classe les résultats en une fraction de seconde selon des critères de pertinence.

## Techniques pour affiner vos recherches

Pour obtenir des résultats ciblés sans perdre de temps, privilégiez des opérateurs de recherche précis :
- Les guillemets ("...") : recherchent la suite exacte de mots, dans l'ordre choisi.
- L'opérateur de site (site:domaine.com) : limite la recherche à un nom de domaine spécifique.
- L'opérateur d'exclusion (-) : retire un mot-clé gênant (ex: jaguar -voiture).
- L'opérateur de fichier (filetype:extension) : cible un format particulier comme pdf, docx ou ppt.

<div class="diagram-box my-6 p-4 rounded-xl border border-outline-variant/60 bg-surface-container-lowest font-body">
  <div class="text-xs font-bold uppercase tracking-wider text-primary mb-3 font-label">Schéma : Anatomie des Résultats de Recherche</div>
  <div class="space-y-2 text-xs">
    <div class="p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/50 flex items-center justify-between">
      <span class="font-bold text-on-surface-variant">Annonces sponsorisées</span>
      <span class="text-xs bg-surface-variant px-2 py-0.5 rounded text-on-surface-variant">Publicité payante</span>
    </div>
    <div class="p-2.5 rounded-lg bg-primary-container/40 border border-primary/30 flex items-center justify-between">
      <span class="font-bold text-primary">Résultats organiques (Naturels)</span>
      <span class="text-xs bg-primary text-on-primary px-2 py-0.5 rounded">Classement algorithmique</span>
    </div>
  </div>
</div>

## Évaluer la fiabilité d'une information

Face à la surabondance d'informations en ligne, il est crucial d'appliquer une méthode de vérification rigoureuse :
- Identifier l'auteur ou l'institution : Vérifier la crédibilité et l'expertise de la source.
- Examiner la date de publication : S'assurer que les données ne sont pas obsolètes.
- Recouper les faits : Confirmer l'information auprès d'au moins deux sources indépendantes et reconnues.
- Détecter les biais et le sensationnalisme : Rester vigilant face aux titres accrocheurs destinés uniquement à générer des clics.`,
  },
  {
    titre: "Créer et utiliser une adresse email",
    resume: "Maîtriser les correspondances électroniques, la gestion des destinataires et les règles de cybersécurité associées.",
    icone: "mail",
    ordre: 3,
    astuce: "Rédigez toujours un objet clair et synthétique avant d'envoyer votre message : cela évite que votre mail ne finisse dans les spams.",
    contenu: `L'adresse de courrier électronique (email) est le moyen universel d'échange de messages et de documents sur Internet. Sa structure standard est : nom_utilisateur@domaine.ext (ex: jean.dupont@exemple.com).

## Anatomie d'un message électronique

Un message correctement structuré comporte plusieurs éléments clés :
- Destinataire principal (À / To) : La personne directement concernée par le message.
- Copie carbone (CC) : Les personnes informées à titre indicatif, sans obligation de réponse.
- Copie carbone invisible (CCI / BCC) : Les destinataires masqués. Indispensable pour les envois groupés afin de protéger la vie privée.
- Objet (Subject) : Une phrase courte résumant précisément le motif du message.
- Pièces jointes (Attachments) : Fichiers joints (documents, images, archives ZIP).

<div class="diagram-box my-6 p-4 rounded-xl border border-outline-variant/60 bg-surface-container-lowest font-body">
  <div class="text-xs font-bold uppercase tracking-wider text-primary mb-3 font-label">Schéma : Utilisation appropriée des champs CC et CCI</div>
  <div class="grid sm:grid-cols-2 gap-3 text-xs">
    <div class="p-3 rounded-lg border border-outline-variant bg-surface-container-low">
      <p class="font-bold text-primary mb-1">Champ CC (Copie)</p>
      <p class="text-on-surface-variant">Visibilité publique. À utiliser pour les collaborateurs d'un même projet.</p>
    </div>
    <div class="p-3 rounded-lg border border-outline-variant bg-surface-container-low">
      <p class="font-bold text-primary mb-1">Champ CCI (Copie Cachée)</p>
      <p class="text-on-surface-variant">Masquage automatique des adresses. Requis pour préserver la confidentialité.</p>
    </div>
  </div>
</div>

## Règles d'or de la messagerie moderne

- Garder une adresse professionnelle sobre pour vos démarches officielles et académiques.
- Vérifier systématiquement la taille et le format des pièces jointes (privilégier les fichiers PDF).
- Ne jamais partager votre mot de passe de boîte de réception, qui constitue la clé de récupération de tous vos autres comptes.`,
  },
  {
    titre: "Sécurité et bonnes pratiques en ligne",
    resume: "Protéger vos identifiants, identifier les attaques par hameçonnage et sécuriser vos connexions HTTPS.",
    icone: "shield_lock",
    ordre: 4,
    astuce: "Utilisez un gestionnaire de mots de passe pour générer et stocker des mots de passe uniques pour chaque service.",
    contenu: `La sécurité numérique individuelle repose sur l'adoption de réflexes préventifs et la compréhension des cybermenaces les plus fréquentes.

## Définir des mots de passe robustes

Un mot de passe vulnérable est la première cause de piratage de compte. Pour garantir une protection optimale :
- Utiliser au moins 12 à 16 caractères en combinant majuscules, minuscules, chiffres et symboles.
- Proscrire les informations personnelles évidentes (dates de naissance, prénoms, mots du dictionnaire).
- Ne jamais réutiliser un même mot de passe sur plusieurs services web distincts.
- Activer systématiquement la double authentification (2FA / MFA), qui demande une validation sur smartphone en plus du mot de passe.

<div class="diagram-box my-6 p-4 rounded-xl border border-outline-variant/60 bg-surface-container-lowest font-body">
  <div class="text-xs font-bold uppercase tracking-wider text-primary mb-3 font-label">Schéma : Fonctionnement du protocole HTTPS Chiffré</div>
  <div class="p-3 rounded-lg border border-outline-variant bg-surface-container-low text-xs flex items-center justify-between">
    <div>
      <p class="font-bold text-success flex items-center gap-1"><span class="material-symbols-outlined text-sm">lock</span> Connexion Chiffrée HTTPS</p>
      <p class="text-on-surface-variant">Données illisibles pour les intermédiaires et pirates</p>
    </div>
    <span class="text-xs bg-success-container text-success px-2.5 py-1 rounded-full font-bold">Sécurisé</span>
  </div>
</div>

## Reconnaître l'hameçonnage (Phishing)

Le phishing est une technique d'ingénierie sociale visant à voler vos identifiants ou numéros de carte bancaire en se faisant passer pour un organisme de confiance.
- Indices d'alerte : Sentiment d'urgence injustifié, fautes d'orthographe, adresse d'expéditeur suspecte.
- Réflexe de sécurité : Ne jamais cliquer sur les liens transmis par un email suspect ; saisir soi-même l'adresse du site dans le navigateur.`,
  },
  {
    titre: "Stockage Cloud et gestion de fichiers",
    resume: "Comprendre les services de stockage en ligne, organiser vos dossiers et appliquer la règle de sauvegarde 3-2-1.",
    icone: "cloud",
    ordre: 5,
    astuce: "La règle de sauvegarde 3-2-1 : 3 copies de vos données, sur 2 supports différents, dont 1 copie conservée hors site (Cloud).",
    contenu: `Le stockage Cloud désigne l'enregistrement de vos fichiers sur des serveurs distants sécurisés et accessibles via Internet depuis n'importe quel appareil (ordinateur, tablette, smartphone).

## Avantages du stockage Cloud

- Accessibilité permanente : Vos documents sont disponibles partout avec une connexion Internet.
- Synchronisation automatique : Les modifications apportées sur un appareil sont immédiatement répercutées sur tous les autres.
- Partage collaboratif : Possibilité de partager un fichier ou un dossier via un lien sécurisé, avec des droits de lecture ou de modification.

<div class="diagram-box my-6 p-4 rounded-xl border border-outline-variant/60 bg-surface-container-lowest font-body">
  <div class="text-xs font-bold uppercase tracking-wider text-primary mb-3 font-label">Schéma : La Règle de Sauvegarde 3-2-1</div>
  <div class="grid sm:grid-cols-3 gap-3 text-center text-xs">
    <div class="p-3 rounded-lg border border-outline-variant bg-surface-container-low">
      <p class="font-bold text-primary">3 Copies</p>
      <p class="text-on-surface-variant">Original + 2 Sauvegardes</p>
    </div>
    <div class="p-3 rounded-lg border border-outline-variant bg-surface-container-low">
      <p class="font-bold text-primary">2 Supports</p>
      <p class="text-on-surface-variant">Disque interne + Disque externe</p>
    </div>
    <div class="p-3 rounded-lg border border-outline-variant bg-surface-container-low">
      <p class="font-bold text-primary">1 Hors Site</p>
      <p class="text-on-surface-variant">Stockage Cloud à distance</p>
    </div>
  </div>
</div>

## Bonnes pratiques d'organisation numérique

- Nommer vos fichiers de façon explicite avec une convention claire (ex: 2026_Projet_Rapport_v1.pdf).
- Structurer vos dossiers par thèmes ou catégories logiques.
- Gérer scrupuleusement les autorisations de partage pour éviter que vos documents privés ne soient indexés publiquement.`,
  },
  {
    titre: "Empreinte numérique et vie privée",
    resume: "Gérer vos traces en ligne, maîtriser les paramètres de confidentialité et comprendre le fonctionnement des cookies.",
    icone: "fingerprint",
    ordre: 6,
    astuce: "Consultez régulièrement vos paramètres de confidentialité sur les moteurs de recherche et réseaux sociaux pour limiter le ciblage.",
    contenu: `Chaque action effectuée sur Internet (recherches, clics, publications, achats) laisse une trace numérique durable. L'ensemble de ces traces constitue votre empreinte numérique.

## Traces passives vs Traces actives

- Traces actives : Informations que vous choisissez de publier délibérément (commentaires, photos, profils publics).
- Traces passives : Données collectées automatiquement à votre insu (adresse IP, historique de géolocalisation, identifiant de l'appareil, cookies de traçage).

<div class="diagram-box my-6 p-4 rounded-xl border border-outline-variant/60 bg-surface-container-lowest font-body">
  <div class="text-xs font-bold uppercase tracking-wider text-primary mb-3 font-label">Schéma : Les Composants de l'Empreinte Numérique</div>
  <div class="grid sm:grid-cols-2 gap-3 text-xs">
    <div class="p-3 rounded-lg border border-outline-variant bg-surface-container-low">
      <p class="font-bold text-primary mb-1">Traces Actives (Volontaires)</p>
      <p class="text-on-surface-variant">Publications, formulaires, messages publics</p>
    </div>
    <div class="p-3 rounded-lg border border-outline-variant bg-surface-container-low">
      <p class="font-bold text-primary mb-1">Traces Passives (Techniques)</p>
      <p class="text-on-surface-variant">Cookies, adresse IP, métadonnées de navigation</p>
    </div>
  </div>
</div>

## Protéger votre vie privée numérique

- Comprendre les cookies : Les cookies de session sont utiles à la connexion, tandis que les cookies tiers servent au suivi publicitaire.
- Utiliser le droit à l'effacement : Le Règlement Général sur la Protection des Données (RGPD) garantit votre droit de demander la suppression de vos données personnelles.
- Surveiller votre e-réputation : Effectuer régulièrement une recherche sur votre propre nom pour vérifier ce qui est accessible publiquement.`,
  },
  {
    titre: "Réseaux sociaux et communication numérique",
    resume: "Naviguer de manière responsable sur les réseaux sociaux, différencier les espaces et se protéger du cyberharcèlement.",
    icone: "forum",
    ordre: 7,
    astuce: "Appliquez la règle du panneau d'affichage : ne publiez rien en ligne que vous n'afficheriez pas sur le mur de votre établissement.",
    contenu: `Les réseaux sociaux sont des plateformes d'interaction communautaire permettant de partager des contenus, d'échanger des messages et de développer des réseaux relationnels.

## Distinguer les espaces et usages

- Réseaux professionnels (LinkedIn) : Orientés vers le développement de carrière, le CV en ligne et la veille sectorielle.
- Réseaux personnels et communautaires : Destinés aux échanges privés ou de loisirs.

<div class="diagram-box my-6 p-4 rounded-xl border border-outline-variant/60 bg-surface-container-lowest font-body">
  <div class="text-xs font-bold uppercase tracking-wider text-primary mb-3 font-label">Schéma : Niveaux de Confidentialité des Publications</div>
  <div class="space-y-2 text-xs">
    <div class="p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/50 flex justify-between">
      <span class="font-bold">Public</span>
      <span class="text-on-surface-variant">Visible par l'ensemble d'Internet et indexable</span>
    </div>
    <div class="p-2.5 rounded-lg bg-primary-container/40 border border-primary/30 flex justify-between">
      <span class="font-bold text-primary">Amis / Contacts</span>
      <span class="text-on-surface-variant">Restreint aux comptes approuvés</span>
    </div>
  </div>
</div>

## Prévention et cyber-vigilance

- Régler scrupuleusement la confidentialité de vos profils.
- Ne pas relayer de fausses informations (fake news) sans vérification préalable.
- Réagir face au cyberharcèlement : Signaler les comportements malveillants sur la plateforme et conserver les preuves numériques (captures d'écran).`,
  },
  {
    titre: "Intelligence Artificielle et outils numériques modernes",
    resume: "Découvrir le fonctionnement des IA génératives, formuler des prompts efficaces et conserver un esprit critique.",
    icone: "auto_awesome",
    ordre: 8,
    astuce: "Adoptez la méthode RÔLE-CONTEXTE-TÂCHE pour obtenir des réponses précises et pertinentes de la part des modèles d'IA.",
    contenu: `L'Intelligence Artificielle (IA) générative désigne des algorithmes de traitement automatique capables de produire du texte, du code, des images ou de la musique à partir d'instructions écrites en langage naturel (prompts).

## Principes de fonctionnement

Les modèles de langage (LLM) sont entraînés sur d'immenses corpus de données textuelles. Ils prédisent les suites de mots les plus probables sans posséder de conscience ni de compréhension réelle du monde.

<div class="diagram-box my-6 p-4 rounded-xl border border-outline-variant/60 bg-surface-container-lowest font-body">
  <div class="text-xs font-bold uppercase tracking-wider text-primary mb-3 font-label">Schéma : Structure d'un Prompt d'IA Efficace</div>
  <div class="grid sm:grid-cols-3 gap-3 text-center text-xs">
    <div class="p-3 rounded-lg border border-outline-variant bg-surface-container-low">
      <p class="font-bold text-primary">1. Rôle</p>
      <p class="text-on-surface-variant">"Agis comme un expert..."</p>
    </div>
    <div class="p-3 rounded-lg border border-outline-variant bg-surface-container-low">
      <p class="font-bold text-primary">2. Contexte</p>
      <p class="text-on-surface-variant">"Pour un projet de..."</p>
    </div>
    <div class="p-3 rounded-lg border border-outline-variant bg-surface-container-low">
      <p class="font-bold text-primary">3. Consigne</p>
      <p class="text-on-surface-variant">"Rédige un résumé de..."</p>
    </div>
  </div>
</div>

## Vigilance et éthique d'utilisation

- Le risque d'hallucination : L'IA peut générer des réponses affirmées mais factuellement fausses. La vérification humaine est obligatoire.
- Respect du droit d'auteur et confidentialité : Ne jamais soumettre de données personnelles ou confidentielles dans les outils d'IA publics.
- Utilisation éthique : Utiliser l'IA comme un assistant de travail pour stimuler la réflexion, et non comme un moyen de remplacer l'effort d'apprentissage personnel.`,
  },
  {
    titre: "Collaboration en ligne et outils de travail distant",
    resume: "Utiliser les espaces de travail partagés, gérer les révisions de documents et organiser des visioconférences efficaces.",
    icone: "groups",
    ordre: 9,
    astuce: "Utilisez le mode 'Suggestions' ou 'Commentaires' dans un document partagé plutôt que de modifier directement le texte d'un collègue.",
    contenu: `Le travail collaboratif moderne repose sur des plateformes permettant à plusieurs personnes de travailler simultanément sur un même projet, indépendamment de leur localisation géographique.

## Édition simultanée et gestion des versions

Les suites bureautiques en ligne (Google Workspace, Microsoft 365) offrent la co-édition en temps réel :
- Historique des versions : Permet de consulter toutes les modifications passées et de restaurer une version précédente en cas d'erreur.
- Système de commentaires : Permet d'échanger sur un point précis sans altérer le corps du document.

<div class="diagram-box my-6 p-4 rounded-xl border border-outline-variant/60 bg-surface-container-lowest font-body">
  <div class="text-xs font-bold uppercase tracking-wider text-primary mb-3 font-label">Schéma : Flux de Travail Collaboratif</div>
  <div class="grid sm:grid-cols-3 gap-3 text-center text-xs">
    <div class="p-3 rounded-lg border border-outline-variant bg-surface-container-low">
      <span class="material-symbols-outlined text-primary text-xl mb-1">edit_note</span>
      <p class="font-bold">1. Co-Édition</p>
      <p class="text-on-surface-variant">Rédaction simultanée</p>
    </div>
    <div class="p-3 rounded-lg border border-outline-variant bg-surface-container-low">
      <span class="material-symbols-outlined text-primary text-xl mb-1">add_comment</span>
      <p class="font-bold">2. Relecture</p>
      <p class="text-on-surface-variant">Commentaires & avis</p>
    </div>
    <div class="p-3 rounded-lg border border-outline-variant bg-surface-container-low">
      <span class="material-symbols-outlined text-primary text-xl mb-1">history</span>
      <p class="font-bold">3. Historique</p>
      <p class="text-on-surface-variant">Sauvegarde des versions</p>
    </div>
  </div>
</div>

## Bonnes pratiques de visioconférence

- Tester micro et caméra avant le début de la réunion.
- Couper son microphone en dehors des prises de parole pour éviter les bruits de fond.
- Respecter l'ordre du jour et la ponctualité.`,
  },
  {
    titre: "Hygiène numérique et prévention des cybermenaces",
    resume: "Détecter les malwares, sécuriser les réseaux Wi-Fi publics et maintenir la santé globale de vos équipements.",
    icone: "health_and_safety",
    ordre: 10,
    astuce: "Effectuez toujours les mises à jour système et applicatives dès qu'elles sont proposées : elles comblent des failles de sécurité critiques.",
    contenu: `L'hygiène numérique regroupe l'ensemble des règles quotidiennes maintenant l'intégrité de vos appareils et réseaux face aux logiciels malveillants (malwares).

## Principales cybermenaces et protections

- Ransomwares (Rançongiciels) : Logiciels qui chiffrent vos fichiers et exigent une rançon. La seule protection efficace réside dans des sauvegardes régulières et isolées.
- Logiciels espions (Spywares) : Collectent vos données de frappe ou captures d'écran à votre insu.
- Wi-Fi public non sécurisé : Les réseaux ouverts (aéroports, cafés) peuvent être interceptés. Il convient d'y utiliser un réseau privé virtuel (VPN) et de ne jamais saisir d'informations sensibles.

<div class="diagram-box my-6 p-4 rounded-xl border border-outline-variant/60 bg-surface-container-lowest font-body">
  <div class="text-xs font-bold uppercase tracking-wider text-primary mb-3 font-label">Schéma : Les piliers de la Protection Équipement</div>
  <div class="space-y-2 text-xs">
    <div class="p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/50 flex justify-between">
      <span class="font-bold">Mises à jour automatiques</span>
      <span class="text-on-surface-variant">Correction systématique des failles zero-day</span>
    </div>
    <div class="p-2.5 rounded-lg bg-primary-container/40 border border-primary/30 flex justify-between">
      <span class="font-bold text-primary">Protection Wi-Fi & VPN</span>
      <span class="text-on-surface-variant">Chiffrement du trafic sur les réseaux publics</span>
    </div>
  </div>
</div>

## Checklist mensuelle d'hygiène numérique

- Appliquer les mises à jour recommandées par l'éditeur du système d'exploitation.
- Supprimer les applications et extensions de navigateur inutilisées.
- Vérifier l'état de vos sauvegardes externes.`,
  },
];

const QUIZ = [
  // Leçon 1
  [
    { q: "Comment s'appelle le logiciel utilisé pour accéder aux pages web ?", options: ["Un navigateur", "Un antivirus", "Un tableur", "Une imprimante"], r: "Un navigateur" },
    { q: "Où voit-on l'adresse (URL) de la page actuellement affichée ?", options: ["Dans la barre d'adresse", "Dans les favoris", "Dans la corbeille", "Dans le gestionnaire de fichiers"], r: "Dans la barre d'adresse" },
    { q: "À quoi sert un onglet dans un navigateur ?", options: ["Ouvrir plusieurs pages dans une même fenêtre", "Supprimer l'historique", "Changer la langue du site", "Imprimer une page"], r: "Ouvrir plusieurs pages dans une même fenêtre" },
    { q: "Quelle est la différence entre un navigateur et un moteur de recherche ?", options: ["Le navigateur est un logiciel, le moteur de recherche est un site", "Ce sont deux noms pour la même chose", "Le moteur de recherche s'installe sur l'ordinateur", "Le navigateur ne fonctionne que sans connexion"], r: "Le navigateur est un logiciel, le moteur de recherche est un site" },
  ],
  // Leçon 2
  [
    { q: "Que faut-il privilégier pour une recherche efficace ?", options: ["Des mots-clés précis", "Une phrase très longue", "Des points d'exclamation", "Le nom du navigateur"], r: "Des mots-clés précis" },
    { q: "Que permettent les guillemets dans une recherche ?", options: ["Rechercher une expression exacte", "Effacer l'historique", "Changer de moteur de recherche", "Trier par date"], r: "Rechercher une expression exacte" },
    { q: "Que faut-il vérifier avant de faire confiance à un résultat ?", options: ["Qui a publié l'information", "La couleur du site", "La longueur de l'URL", "Le nombre d'images"], r: "Qui a publié l'information" },
    { q: "Que signale souvent l'étiquette « Annonce » sur un résultat ?", options: ["Un contenu publicitaire payant", "Le résultat le plus fiable", "Une erreur du moteur de recherche", "Un site gouvernemental"], r: "Un contenu publicitaire payant" },
  ],
  // Leçon 3
  [
    { q: "Quel symbole retrouve-t-on toujours dans une adresse email ?", options: ["@", "#", "%", "&"], r: "@" },
    { q: "À quoi sert le champ « Objet » d'un email ?", options: ["Résumer le sujet du message", "Indiquer le mot de passe", "Choisir la langue", "Bloquer l'expéditeur"], r: "Résumer le sujet du message" },
    { q: "Que ne doit-on jamais partager publiquement avec son adresse email ?", options: ["Son mot de passe", "Son nom", "Le nom du fournisseur", "L'objet d'un message"], r: "Son mot de passe" },
    { q: "Quelle est la particularité du champ CCI ?", options: ["Les destinataires ne se voient pas entre eux", "Le message est envoyé deux fois", "Il chiffre automatiquement le message", "Il ajoute une pièce jointe"], r: "Les destinataires ne se voient pas entre eux" },
  ],
  // Leçon 4
  [
    { q: "Qu'est-ce qu'un mot de passe solide ?", options: ["Au moins 12 caractères mélangeant lettres, chiffres et symboles", "Le prénom de l'utilisateur", "Le mot « password »", "Une suite de chiffres identiques"], r: "Au moins 12 caractères mélangeant lettres, chiffres et symboles" },
    { q: "Qu'est-ce que le hameçonnage (phishing) ?", options: ["Une tentative de vol d'informations en se faisant passer pour une institution connue", "Un virus qui ralentit l'ordinateur", "Un type de mot de passe", "Un moteur de recherche"], r: "Une tentative de vol d'informations en se faisant passer pour une institution connue" },
    { q: "Que signifie le cadenas avant une adresse (https://) ?", options: ["La connexion est chiffrée", "Le site est hors service", "Le site est en maintenance", "La page est en français"], r: "La connexion est chiffrée" },
    { q: "Quel est le signe le plus fiable d'une tentative de hameçonnage ?", options: ["Un message qui crée une urgence et demande un mot de passe", "Un message écrit en français", "Un message envoyé le matin", "Un message avec une pièce jointe"], r: "Un message qui crée une urgence et demande un mot de passe" },
  ],
  // Leçon 5
  [
    { q: "Qu'est-ce que la règle de sauvegarde 3-2-1 ?", options: ["3 copies, 2 supports différents, 1 hors site (Cloud)", "3 mots de passe, 2 comptes, 1 fichier", "3 sauvegardes par an", "3 disques durs identiques"], r: "3 copies, 2 supports différents, 1 hors site (Cloud)" },
    { q: "Quel est le principal avantage du stockage Cloud ?", options: ["Accéder à ses fichiers depuis n'importe quel appareil connecté", "Ne plus avoir besoin de mot de passe", "Augmenter la vitesse d'impression", "Supprimer les virus"], r: "Accéder à ses fichiers depuis n'importe quel appareil connecté" },
    { q: "À quoi sert la synchronisation des fichiers ?", options: ["Répercuter automatiquement les modifications sur tous vos appareils", "Changer le nom du fichier", "Effacer les doublons", "Traduire le texte"], r: "Répercuter automatiquement les modifications sur tous vos appareils" },
    { q: "Que devez-vous vérifier lorsque vous partagez un lien de dossier Cloud ?", options: ["Les droits d'accès attribués (lecture ou modification)", "La couleur des icônes", "La marque de l'ordinateur du destinataire", "L'heure de l'envoi"], r: "Les droits d'accès attribués (lecture ou modification)" },
  ],
  // Leçon 6
  [
    { q: "Quelle est la différence entre une trace active et passive ?", options: ["La trace active est publiée volontairement, la passive est collectée automatiquement", "Ce sont deux termes identiques", "La trace passive n'existe pas sur les ordinateurs", "La trace active est toujours payante"], r: "La trace active est publiée volontairement, la passive est collectée automatiquement" },
    { q: "À quoi sert principalement un cookie tiers ?", options: ["Au suivi publicitaire et comportemental", "À enregistrer votre mot de passe", "À accélérer la connexion Wi-Fi", "À protéger votre disque dur"], r: "Au suivi publicitaire et comportemental" },
    { q: "Que garantit le RGPD concernant vos données personnelles ?", options: ["Le droit de demander la suppression de vos données", "L'accès gratuit à tous les logiciels payants", "L'interdiction d'utiliser des mots de passe", "L'obligation d'utiliser Chrome"], r: "Le droit de demander la suppression de vos données" },
    { q: "Qu'est-ce que l'e-réputation ?", options: ["L'image que renvoie votre présence et vos traces sur Internet", "Le score de votre connexion Internet", "Le nombre d'emails dans votre boîte", "La vitesse de votre navigateur"], r: "L'image que renvoie votre présence et vos traces sur Internet" },
  ],
  // Leçon 7
  [
    { q: "Quelle est la vocation principale d'un réseau comme LinkedIn ?", options: ["Le développement professionnel et le réseau de carrière", "Le partage de vidéos humoristiques de 15 secondes", "Les jeux vidéo multijoueurs", "L'envoi de messages anonymes"], r: "Le développement professionnel et le réseau de carrière" },
    { q: "Quelle est la règle du panneau d'affichage ?", options: ["Ne rien publier qu'on n'afficherait pas publiquement", "Changer de mot de passe chaque jour", "Toujours poster en majuscules", "Ne jamais utiliser d'images"], r: "Ne rien publier qu'on n'afficherait pas publiquement" },
    { q: "Que faire en premier lieu face à du cyberharcèlement ?", options: ["Conserver les preuves numériques et signaler les contenus", "Supprimer immédiatement tout son ordinateur", "Répondre par des insultes", "Changer de fournisseur d'accès"], r: "Conserver les preuves numériques et signaler les contenus" },
    { q: "Avant d'identifier une information comme vraie sur un réseau, que faut-il faire ?", options: ["Vérifier la source auprès d'organismes reconnus", "Regarder le nombre d'aimes (likes)", "La partager immédiatement", "Changer le fond d'écran"], r: "Vérifier la source auprès d'organismes reconnus" },
  ],
  // Leçon 8
  [
    { q: "Qu'est-ce qu'une hallucination dans le contexte d'une IA générative ?", options: ["Une réponse affirmée mais factuellement fausse", "Une panne d'électricité", "Une image de haute qualité", "Un virus informatique"], r: "Une réponse affirmée mais factuellement fausse" },
    { q: "Quels sont les trois éléments clés d'un prompt efficace ?", options: ["Rôle, Contexte, Consigne", "Sujet, Verbe, Complément", "Nom, Prénom, Email", "Titre, Image, Lien"], r: "Rôle, Contexte, Consigne" },
    { q: "Pourquoi ne faut-il pas entrer d'informations confidentielles dans une IA publique ?", options: ["Ces données peuvent servir à ré-entraîner les modèles futurs", "Cela bloque le clavier", "L'IA efface automatiquement les données", "Cela accélère la batterie"], r: "Ces données peuvent servir à ré-entraîner les modèles futurs" },
    { q: "Comment le modèle de langage prédit-il le texte ?", options: ["En calculant la probabilité des mots suivants selon son entraînement", "En lisant les pensées de l'utilisateur", "En effectuant une recherche Google en secret", "En appelant un opérateur"], r: "En calculant la probabilité des mots suivants selon son entraînement" },
  ],
  // Leçon 9
  [
    { q: "Quel est l'avantage principal de l'historique des versions dans un document collaboratif ?", options: ["Consulter les modifications passées et restaurer une ancienne version", "Supprimer définitivement le fichier", "Envoyer le document par la poste", "Modifier la police par défaut"], r: "Consulter les modifications passées et restaurer une ancienne version" },
    { q: "Que vaut-il mieux utiliser pour proposer une correction à un collègue sur un fichier partagé ?", options: ["Le mode Commentaires ou Suggestions", "Effacer tout son paragraphe sans prévenir", "Changer la couleur du texte en rouge vif", "Fermer le logiciel"], r: "Le mode Commentaires ou Suggestions" },
    { q: "Quelle est la bonne pratique concernant le micro lors d'une visioconférence ?", options: ["Le couper en dehors de ses prises de parole", "Le laisser toujours allumé avec de la musique", "Crier pour être bien entendu", "Débrancher l'écran"], r: "Le couper en dehors de ses prises de parole" },
    { q: "Que permet la co-édition en temps réel ?", options: ["Travailler simultanément à plusieurs sur le même document", "Créer un mot de passe partagé", "Bloquer la connexion des autres", "Imprimer sans câble"], r: "Travailler simultanément à plusieurs sur le même document" },
  ],
  // Leçon 10
  [
    { q: "Qu'est-ce qu'un ransomware (rançongiciel) ?", options: ["Un logiciel malveillant qui chiffre vos fichiers et exige un paiement", "Un antivirus gratuit", "Un type de navigateur web", "Un câble de connexion Ethernet"], r: "Un logiciel malveillant qui chiffre vos fichiers et exige un paiement" },
    { q: "Pourquoi les mises à jour logicielles sont-elles primordiales ?", options: ["Elles comblent des failles de sécurité critiques découvertes récemment", "Elles changent la couleur de l'écran", "Elles effacent votre historique", "Elles sont obligatoires par la loi"], r: "Elles comblent des failles de sécurité critiques découvertes récemment" },
    { q: "Quel outil est fortement recommandé lors d'une connexion sur un Wi-Fi public ?", options: ["Un VPN (Réseau Privé Virtuel)", "Un second écran", "Un gestionnaire de tâches", "Un nouveau navigateur"], r: "Un VPN (Réseau Privé Virtuel)" },
    { q: "Quelle action préventive protège le mieux contre la perte de données due à un malware ?", options: ["Effectuer des sauvegardes régulières et isolées", "Éteindre l'ordinateur la nuit", "Ne jamais ouvrir de fichier PDF", "Nettoyer l'écran avec un chiffon"], r: "Effectuer des sauvegardes régulières et isolées" },
  ],
];

module.exports = { LECONS, QUIZ };
