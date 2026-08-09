// ─── Contenu pédagogique (thème unique : Internet) ───
// Partagé entre le backend SQLite (dev local) et le backend Postgres
// (production Vercel) pour ne maintenir qu'une seule source de vérité.
//
// Format du contenu : paragraphes séparés par une ligne vide ; une ligne
// commençant par "- " est affichée comme un élément de liste.

const LECONS = [
  {
    titre: "Découvrir Internet et le navigateur",
    resume: "Ce qu'est Internet, et comment se déplacer avec un navigateur web.",
    icone: "compass",
    ordre: 1,
    contenu: `Internet est un immense réseau qui relie des millions d'ordinateurs entre eux, partout dans le monde. Un site web est un ensemble de pages consultables sur ce réseau. Pour y accéder, on utilise un logiciel appelé navigateur (par exemple Chrome, Firefox ou Edge).

Chaque page a une adresse unique, appelée URL, qui s'affiche dans la barre d'adresse en haut du navigateur. C'est là qu'on tape l'adresse d'un site, ou des mots-clés à rechercher.

Quelques repères utiles dans un navigateur :
- L'onglet : permet d'ouvrir plusieurs pages en même temps dans une seule fenêtre.
- Les favoris : permettent d'enregistrer une adresse pour la retrouver rapidement plus tard.
- Les flèches précédent / suivant : permettent de revenir à la page consultée juste avant.
- Le bouton d'actualisation : recharge la page si elle ne s'affiche pas correctement.

Bien distinguer ces éléments est la première étape pour naviguer sur Internet sans se perdre.`,
  },
  {
    titre: "Faire une recherche efficace",
    resume: "Utiliser un moteur de recherche pour trouver une information fiable rapidement.",
    icone: "search",
    ordre: 2,
    contenu: `Un moteur de recherche (comme Google ou Bing) est un site qui permet de trouver des pages web à partir de mots-clés. Plus les mots-clés sont précis, plus les résultats sont pertinents.

Quelques techniques simples et efficaces :
- Utiliser des mots-clés courts plutôt qu'une phrase complète : « horaires bibliothèque UCB » plutôt que « je voudrais savoir à quelle heure ouvre la bibliothèque de l'UCB ».
- Mettre une expression entre guillemets pour rechercher exactement cette suite de mots.
- Ajouter un mot comme « site officiel » ou le nom d'une institution pour cibler une source fiable.

Tous les résultats ne se valent pas. Les tout premiers résultats marqués « Annonce » sont des publicités, pas nécessairement les sources les plus fiables. Il est utile de vérifier qui a publié une information (un site institutionnel, un journal reconnu) avant de la considérer comme fiable, surtout pour un travail académique.`,
  },
  {
    titre: "Créer et utiliser une adresse email",
    resume: "Créer une boîte mail, envoyer un message et respecter quelques règles de base.",
    icone: "mail",
    ordre: 3,
    contenu: `Une adresse email permet d'envoyer et de recevoir des messages électroniques. Elle a toujours la même structure : un nom d'utilisateur, le symbole @, puis le nom du fournisseur (par exemple : christine@gmail.com).

Pour créer une adresse, il suffit de s'inscrire gratuitement sur un service comme Gmail ou Outlook, en choisissant un nom d'utilisateur disponible et un mot de passe.

Pour rédiger un message, trois champs sont essentiels :
- Destinataire : l'adresse email de la personne à qui on écrit.
- Objet : une courte phrase qui résume le sujet du message, toujours utile pour que le destinataire comprenne de quoi il s'agit avant même d'ouvrir le message.
- Corps du message : le texte du message, et éventuellement une pièce jointe (un fichier, comme un document ou une image).

Une adresse email professionnelle ou académique doit rester sobre et lisible, et ne jamais être partagée publiquement avec le mot de passe associé.`,
  },
  {
    titre: "Sécurité et bonnes pratiques en ligne",
    resume: "Protéger ses données personnelles et reconnaître les tentatives d'arnaque courantes.",
    icone: "shield",
    ordre: 4,
    contenu: `Utiliser Internet en sécurité repose sur quelques habitudes simples, mais essentielles.

Un mot de passe solide comporte au moins huit caractères, mélange lettres, chiffres et symboles, et n'est jamais réutilisé à l'identique sur plusieurs sites importants (email, banque en ligne).

Le hameçonnage (ou phishing) est une technique frauduleuse qui consiste à se faire passer pour une institution connue (banque, université, opérateur mobile) pour obtenir un mot de passe ou des informations personnelles. Quelques signaux d'alerte :
- Un message qui crée un sentiment d'urgence (« votre compte sera bloqué dans 24h »).
- Une adresse d'expéditeur qui ressemble à l'originale mais contient une faute ou un mot en trop.
- Une demande de mot de passe ou de code par email : aucune institution sérieuse ne le demande de cette façon.

Enfin, un cadenas affiché avant l'adresse d'un site (https://) indique que la connexion est chiffrée, ce qui est particulièrement important avant de saisir des informations sensibles.`,
  },
];

// index i correspond à la leçon LECONS[i] (ordre 1-based = i+1)
const QUIZ = [
  [
    { q: "Comment s'appelle le logiciel utilisé pour accéder aux pages web ?", options: ["Un navigateur", "Un antivirus", "Un tableur", "Une imprimante"], r: "Un navigateur" },
    { q: "Où voit-on l'adresse (URL) de la page actuellement affichée ?", options: ["Dans la barre d'adresse", "Dans les favoris", "Dans la corbeille", "Dans le gestionnaire de fichiers"], r: "Dans la barre d'adresse" },
    { q: "À quoi sert un onglet dans un navigateur ?", options: ["Ouvrir plusieurs pages dans une même fenêtre", "Supprimer l'historique", "Changer la langue du site", "Imprimer une page"], r: "Ouvrir plusieurs pages dans une même fenêtre" },
  ],
  [
    { q: "Que faut-il privilégier pour une recherche efficace ?", options: ["Des mots-clés précis", "Une phrase très longue", "Des points d'exclamation", "Le nom du navigateur"], r: "Des mots-clés précis" },
    { q: "Que permettent les guillemets dans une recherche ?", options: ["Rechercher une expression exacte", "Effacer l'historique", "Changer de moteur de recherche", "Trier par date"], r: "Rechercher une expression exacte" },
    { q: "Que faut-il vérifier avant de faire confiance à un résultat ?", options: ["Qui a publié l'information", "La couleur du site", "La longueur de l'URL", "Le nombre d'images"], r: "Qui a publié l'information" },
  ],
  [
    { q: "Quel symbole retrouve-t-on toujours dans une adresse email ?", options: ["@", "#", "%", "&"], r: "@" },
    { q: "À quoi sert le champ « Objet » d'un email ?", options: ["Résumer le sujet du message", "Indiquer le mot de passe", "Choisir la langue", "Bloquer l'expéditeur"], r: "Résumer le sujet du message" },
    { q: "Que ne doit-on jamais partager publiquement avec son adresse email ?", options: ["Son mot de passe", "Son nom", "Le nom du fournisseur", "L'objet d'un message"], r: "Son mot de passe" },
  ],
  [
    { q: "Qu'est-ce qu'un mot de passe solide ?", options: ["Au moins 8 caractères mélangeant lettres, chiffres et symboles", "Le prénom de l'utilisateur", "Le mot « password »", "Une suite de chiffres identiques"], r: "Au moins 8 caractères mélangeant lettres, chiffres et symboles" },
    { q: "Qu'est-ce que le hameçonnage (phishing) ?", options: ["Une tentative de vol d'informations en se faisant passer pour une institution connue", "Un virus qui ralentit l'ordinateur", "Un type de mot de passe", "Un moteur de recherche"], r: "Une tentative de vol d'informations en se faisant passer pour une institution connue" },
    { q: "Que signifie le cadenas avant une adresse (https://) ?", options: ["La connexion est chiffrée", "Le site est hors service", "Le site est en maintenance", "La page est en français"], r: "La connexion est chiffrée" },
  ],
];

module.exports = { LECONS, QUIZ };
