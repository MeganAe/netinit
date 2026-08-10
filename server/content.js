// ─── Contenu pédagogique (thème unique : Internet) ───
// Format : paragraphes séparés par une ligne vide ; une ligne seule
// commençant par "## " devient un sous-titre ; des lignes "- " forment
// une liste à puces.

const LECONS = [
  {
    titre: "Découvrir Internet et le navigateur",
    resume: "Ce qu'est Internet, et comment se déplacer avec un navigateur web.",
    icone: "compass",
    ordre: 1,
    astuce: "Un raccourci qui fait gagner du temps : Ctrl + T ouvre un nouvel onglet, Ctrl + W le ferme.",
    contenu: `Internet est un immense réseau qui relie des millions d'ordinateurs entre eux, partout dans le monde. Un site web est un ensemble de pages consultables sur ce réseau. Pour y accéder, on utilise un logiciel appelé navigateur — Chrome, Firefox, Edge ou Safari en sont les exemples les plus courants.

## Le rôle du navigateur

Le navigateur est votre porte d'entrée vers Internet. Son rôle est de recevoir le code envoyé par un site (écrit en HTML, CSS et JavaScript) et de le transformer en une page lisible, avec du texte, des images et des boutons cliquables. Sans navigateur, ce code resterait un simple fichier texte incompréhensible pour un humain.

Chaque page a une adresse unique, appelée URL, qui s'affiche dans la barre d'adresse en haut de la fenêtre. C'est là qu'on tape l'adresse d'un site, ou des mots-clés à rechercher si aucune adresse précise n'est connue.

## Les repères essentiels

Quelques éléments à savoir reconnaître dans n'importe quel navigateur :
- L'onglet : permet d'ouvrir plusieurs pages en même temps dans une seule fenêtre, sans devoir ouvrir plusieurs programmes.
- Les favoris (ou marque-pages) : permettent d'enregistrer une adresse pour la retrouver rapidement, sans avoir à la retaper.
- Les flèches précédent / suivant : permettent de revenir à la page consultée juste avant, ou d'y retourner.
- Le bouton d'actualisation : recharge la page depuis le serveur, utile si elle ne s'affiche pas correctement ou semble bloquée.

## Naviguer sans se perdre

Une confusion fréquente chez les nouveaux utilisateurs est de confondre le navigateur (le logiciel, comme Chrome) avec le moteur de recherche (un site comme Google) ou avec Internet lui-même (le réseau). Le navigateur est l'outil ; le moteur de recherche est un site parmi des milliards d'autres ; Internet est l'infrastructure qui relie le tout. Bien distinguer ces trois notions est la première étape pour naviguer avec confiance.`,
  },
  {
    titre: "Faire une recherche efficace",
    resume: "Utiliser un moteur de recherche pour trouver une information fiable rapidement.",
    icone: "search",
    ordre: 2,
    astuce: "Tapez site:ucb.ac.cd suivi de vos mots-clés pour chercher uniquement sur le site de l'UCB.",
    contenu: `Un moteur de recherche — Google, Bing ou DuckDuckGo par exemple — est un site qui permet de trouver des pages web à partir de mots-clés. Il ne connaît pas Internet par cœur : il a indexé à l'avance des milliards de pages pour pouvoir répondre en une fraction de seconde.

## Formuler une bonne recherche

Plus les mots-clés sont précis, plus les résultats sont pertinents. Quelques techniques simples et efficaces :
- Utiliser des mots-clés courts plutôt qu'une phrase complète : « horaires bibliothèque UCB » plutôt que « je voudrais savoir à quelle heure ouvre la bibliothèque de l'UCB ».
- Mettre une expression entre guillemets pour rechercher exactement cette suite de mots, dans cet ordre précis.
- Ajouter un mot comme « site officiel » ou le nom d'une institution pour cibler une source fiable plutôt qu'un résultat générique.

## Lire une page de résultats

Une page de résultats mélange plusieurs types de contenus. Les tout premiers résultats, souvent marqués « Annonce » ou « Sponsorisé », sont des publicités : des entreprises ont payé pour apparaître à cet endroit, ce qui ne garantit ni leur pertinence ni leur fiabilité. Les résultats « naturels » qui suivent sont classés par le moteur de recherche selon des critères de pertinence et de qualité qui lui sont propres.

## Évaluer la fiabilité d'une source

Avant de considérer une information comme fiable — surtout dans le cadre d'un travail académique — il est utile de se poser trois questions : qui a publié cette page (une institution reconnue, un particulier anonyme) ? Quand a-t-elle été publiée (une information technique vieille de dix ans peut être dépassée) ? Et d'autres sources sérieuses disent-elles la même chose ? Recouper une information avec au moins une deuxième source reste le réflexe le plus sûr.`,
  },
  {
    titre: "Créer et utiliser une adresse email",
    resume: "Créer une boîte mail, envoyer un message et respecter quelques règles de base.",
    icone: "mail",
    ordre: 3,
    astuce: "Utilisez CC pour informer quelqu'un sans attendre de réponse de sa part, et CCI pour masquer les destinataires entre eux.",
    contenu: `Une adresse email permet d'envoyer et de recevoir des messages électroniques, gratuitement et instantanément, partout dans le monde. Elle a toujours la même structure : un nom d'utilisateur, le symbole @, puis le nom du fournisseur — par exemple christine@gmail.com.

## Créer sa première adresse

Pour créer une adresse, il suffit de s'inscrire gratuitement sur un service comme Gmail ou Outlook, en choisissant un nom d'utilisateur disponible (souvent son prénom et son nom) et un mot de passe. Il est conseillé de garder un nom d'utilisateur sobre, sans surnom ni chiffres inutiles, surtout s'il sera utilisé dans un cadre académique ou professionnel.

## Anatomie d'un message

Pour rédiger un message, trois champs sont essentiels :
- Destinataire : l'adresse email de la personne à qui on écrit — une simple erreur de frappe et le message part ailleurs.
- Objet : une courte phrase qui résume le sujet, toujours utile pour que le destinataire comprenne de quoi il s'agit avant même d'ouvrir le message.
- Corps du message : le texte du message, et éventuellement une pièce jointe (un document, une image, un fichier).

## CC, CCI et bonnes pratiques

Deux champs additionnels sont souvent proposés lors de la rédaction. Le champ CC (copie carbone) permet d'informer une personne sans qu'elle soit la destinataire principale — utile pour tenir un responsable au courant sans lui demander de répondre. Le champ CCI (copie carbone invisible) fait la même chose, mais sans que les autres destinataires voient qui a été mis en copie — pratique pour envoyer un message à plusieurs personnes qui ne se connaissent pas entre elles.

Une adresse email académique ou professionnelle doit rester sobre et lisible en toute circonstance, et son mot de passe ne doit jamais être partagé, même avec un proche.`,
  },
  {
    titre: "Sécurité et bonnes pratiques en ligne",
    resume: "Protéger ses données personnelles et reconnaître les tentatives d'arnaque courantes.",
    icone: "shield",
    ordre: 4,
    astuce: "Activez la double authentification (code envoyé par SMS ou application) partout où c'est proposé : c'est la protection la plus efficace après le mot de passe.",
    contenu: `Utiliser Internet en sécurité repose sur quelques habitudes simples, mais essentielles à connaître dès les premiers pas en ligne.

## Construire un mot de passe solide

Un mot de passe solide comporte au moins huit caractères, mélange lettres majuscules et minuscules, chiffres et symboles, et n'est jamais réutilisé à l'identique sur plusieurs sites importants (email, banque en ligne, réseaux sociaux). Un gestionnaire de mots de passe, ou simplement une phrase longue et personnelle transformée en mot de passe, reste plus sûr qu'une suite de caractères courte, même complexe.

## Reconnaître le hameçonnage

Le hameçonnage, ou phishing, est une technique frauduleuse qui consiste à se faire passer pour une institution connue — banque, université, opérateur mobile — afin d'obtenir un mot de passe ou des informations personnelles. Quelques signaux d'alerte fiables :
- Un message qui crée un sentiment d'urgence, comme « votre compte sera bloqué dans 24 heures ».
- Une adresse d'expéditeur qui ressemble à l'originale mais contient une faute ou un mot en trop.
- Une demande de mot de passe ou de code de vérification par email : aucune institution sérieuse ne procède ainsi.

## Le cadenas et la connexion sécurisée

Un cadenas affiché avant l'adresse d'un site (https://, le « s » signifiant secure) indique que la connexion entre le navigateur et le site est chiffrée : personne ne peut intercepter les informations échangées en chemin. C'est particulièrement important avant de saisir un mot de passe, un numéro de carte bancaire ou toute autre donnée sensible. Son absence, à l'inverse, doit inciter à la prudence sur un site inconnu.`,
  },
];

const QUIZ = [
  [
    { q: "Comment s'appelle le logiciel utilisé pour accéder aux pages web ?", options: ["Un navigateur", "Un antivirus", "Un tableur", "Une imprimante"], r: "Un navigateur" },
    { q: "Où voit-on l'adresse (URL) de la page actuellement affichée ?", options: ["Dans la barre d'adresse", "Dans les favoris", "Dans la corbeille", "Dans le gestionnaire de fichiers"], r: "Dans la barre d'adresse" },
    { q: "À quoi sert un onglet dans un navigateur ?", options: ["Ouvrir plusieurs pages dans une même fenêtre", "Supprimer l'historique", "Changer la langue du site", "Imprimer une page"], r: "Ouvrir plusieurs pages dans une même fenêtre" },
    { q: "Quelle est la différence entre un navigateur et un moteur de recherche ?", options: ["Le navigateur est un logiciel, le moteur de recherche est un site", "Ce sont deux noms pour la même chose", "Le moteur de recherche s'installe sur l'ordinateur", "Le navigateur ne fonctionne que sans connexion"], r: "Le navigateur est un logiciel, le moteur de recherche est un site" },
  ],
  [
    { q: "Que faut-il privilégier pour une recherche efficace ?", options: ["Des mots-clés précis", "Une phrase très longue", "Des points d'exclamation", "Le nom du navigateur"], r: "Des mots-clés précis" },
    { q: "Que permettent les guillemets dans une recherche ?", options: ["Rechercher une expression exacte", "Effacer l'historique", "Changer de moteur de recherche", "Trier par date"], r: "Rechercher une expression exacte" },
    { q: "Que faut-il vérifier avant de faire confiance à un résultat ?", options: ["Qui a publié l'information", "La couleur du site", "La longueur de l'URL", "Le nombre d'images"], r: "Qui a publié l'information" },
    { q: "Que signale souvent l'étiquette « Annonce » sur un résultat ?", options: ["Un contenu publicitaire payant", "Le résultat le plus fiable", "Une erreur du moteur de recherche", "Un site gouvernemental"], r: "Un contenu publicitaire payant" },
  ],
  [
    { q: "Quel symbole retrouve-t-on toujours dans une adresse email ?", options: ["@", "#", "%", "&"], r: "@" },
    { q: "À quoi sert le champ « Objet » d'un email ?", options: ["Résumer le sujet du message", "Indiquer le mot de passe", "Choisir la langue", "Bloquer l'expéditeur"], r: "Résumer le sujet du message" },
    { q: "Que ne doit-on jamais partager publiquement avec son adresse email ?", options: ["Son mot de passe", "Son nom", "Le nom du fournisseur", "L'objet d'un message"], r: "Son mot de passe" },
    { q: "Quelle est la particularité du champ CCI ?", options: ["Les destinataires ne se voient pas entre eux", "Le message est envoyé deux fois", "Il chiffre automatiquement le message", "Il ajoute une pièce jointe"], r: "Les destinataires ne se voient pas entre eux" },
  ],
  [
    { q: "Qu'est-ce qu'un mot de passe solide ?", options: ["Au moins 8 caractères mélangeant lettres, chiffres et symboles", "Le prénom de l'utilisateur", "Le mot « password »", "Une suite de chiffres identiques"], r: "Au moins 8 caractères mélangeant lettres, chiffres et symboles" },
    { q: "Qu'est-ce que le hameçonnage (phishing) ?", options: ["Une tentative de vol d'informations en se faisant passer pour une institution connue", "Un virus qui ralentit l'ordinateur", "Un type de mot de passe", "Un moteur de recherche"], r: "Une tentative de vol d'informations en se faisant passer pour une institution connue" },
    { q: "Que signifie le cadenas avant une adresse (https://) ?", options: ["La connexion est chiffrée", "Le site est hors service", "Le site est en maintenance", "La page est en français"], r: "La connexion est chiffrée" },
    { q: "Quel est le signe le plus fiable d'une tentative de hameçonnage ?", options: ["Un message qui crée une urgence et demande un mot de passe", "Un message écrit en français", "Un message envoyé le matin", "Un message avec une pièce jointe"], r: "Un message qui crée une urgence et demande un mot de passe" },
  ],
];

module.exports = { LECONS, QUIZ };
