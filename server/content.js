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
    astuce: "Tapez site: suivi du nom de domaine d'un site pour restreindre votre recherche à ce site uniquement.",
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
  {
    titre: "Réseaux sociaux et usage responsable",
    resume: "Utiliser les réseaux sociaux avec discernement et protéger sa vie privée en ligne.",
    icone: "share",
    ordre: 5,
    astuce: "Avant de publier une photo ou une information, posez-vous la question : accepterais-je qu'elle soit vue par un employeur ou un enseignant ?",
    contenu: `Les réseaux sociaux — Facebook, Instagram, TikTok, LinkedIn, X — permettent de partager du contenu et de rester en contact avec d'autres personnes à grande échelle. Leur usage apporte de réels bénéfices, mais demande aussi un peu de discernement.

## Paramètres de confidentialité

La plupart des réseaux sociaux proposent des réglages permettant de choisir qui peut voir vos publications : tout le monde, vos contacts uniquement, ou un groupe restreint. Il est recommandé de vérifier ces paramètres dès la création d'un compte, plutôt que de les découvrir après coup.

## Ce qui reste en ligne

Une information publiée sur Internet peut être copiée, capturée en image ou partagée par d'autres, même après suppression du message original. Le réflexe à adopter avant toute publication : ne rien poster que l'on ne serait pas prêt à assumer publiquement, y compris des années plus tard.

## Reconnaître un faux compte

Certains comptes se font passer pour des marques, des institutions ou des personnes connues afin d'arnaquer les utilisateurs. Un compte vérifié (souvent signalé par une coche bleue ou un badge officiel), un nombre d'abonnés cohérent avec l'ancienneté du compte, et l'absence de fautes grossières dans la biographie sont des indices utiles — sans être une garantie absolue.`,
  },
  {
    titre: "Stockage et sauvegarde en ligne",
    resume: "Comprendre le cloud pour sauvegarder ses documents et y accéder de partout.",
    icone: "cloud",
    ordre: 6,
    astuce: "Activez la sauvegarde automatique de vos photos dès que possible : c'est la meilleure protection contre la perte ou le vol d'un téléphone.",
    contenu: `Le stockage en ligne, ou « cloud », consiste à conserver ses fichiers sur des serveurs distants plutôt que uniquement sur son ordinateur ou son téléphone. Google Drive, OneDrive et Dropbox en sont des exemples courants, avec un espace gratuit généralement suffisant pour débuter.

## Pourquoi sauvegarder dans le cloud

Un ordinateur peut tomber en panne, un téléphone peut être volé ou perdu. Les fichiers stockés uniquement en local disparaissent alors avec l'appareil. Une sauvegarde dans le cloud protège contre ce risque : les documents restent accessibles depuis n'importe quel appareil connecté, une fois authentifié avec son compte.

## Organiser ses fichiers

Comme sur un ordinateur, il est possible de créer des dossiers pour organiser ses documents dans le cloud. Une structure simple — par exemple un dossier par année ou par matière pour un étudiant — facilite grandement la recherche future d'un fichier précis parmi des centaines d'autres.

## Partager sans envoyer de pièce jointe

Plutôt que d'envoyer un gros fichier par email, ce qui échoue souvent au-delà de quelques mégaoctets, le cloud permet de générer un simple lien de partage. Le destinataire clique sur ce lien pour consulter ou télécharger le document, sans limite de taille liée à la messagerie.`,
  },
  {
    titre: "Achats et paiements en ligne",
    resume: "Reconnaître un site marchand fiable et payer en ligne en toute sécurité.",
    icone: "shopping_cart",
    ordre: 7,
    astuce: "Privilégiez le paiement à la livraison ou une carte prépayée pour un tout premier achat sur un site que vous ne connaissez pas encore.",
    contenu: `Acheter en ligne est devenu courant, mais demande une vigilance particulière puisque de l'argent réel est en jeu, contrairement à une simple navigation.

## Vérifier la fiabilité d'un site marchand

Avant de saisir des informations de paiement, quelques vérifications rapides s'imposent : le site affiche-t-il une adresse physique et un moyen de contact clair ? Le cadenas de connexion sécurisée (https://) est-il présent ? Le nom de domaine correspond-il bien à la marque annoncée, sans faute ni caractère suspect ?

## Comprendre les moyens de paiement

La carte bancaire reste le moyen le plus courant, mais des services comme PayPal ou Mobile Money ajoutent une couche de protection supplémentaire : les coordonnées bancaires complètes ne sont pas transmises directement au vendeur. Pour un achat ponctuel sur un site inconnu, ces intermédiaires réduisent le risque en cas de problème.

## Après l'achat

Un email de confirmation avec un numéro de commande doit suivre tout achat légitime. Conserver cette preuve permet de réclamer un remboursement ou un échange en cas de souci. À l'inverse, l'absence totale de confirmation, ou une offre trop alléchante pour être vraie, sont des signaux à prendre au sérieux.`,
  },
  {
    titre: "Visioconférence et travail collaboratif",
    resume: "Participer efficacement à une réunion en ligne et collaborer à distance.",
    icone: "videocam",
    ordre: 8,
    astuce: "Testez votre micro et votre caméra deux minutes avant une réunion importante — cela évite le classique « on ne vous entend pas » en début de session.",
    contenu: `Les outils de visioconférence — Zoom, Google Meet, Microsoft Teams — permettent de se réunir à distance avec du son et de l'image, remplaçant efficacement de nombreux déplacements physiques.

## Rejoindre une réunion

La plupart du temps, un simple lien reçu par email ou message suffit : cliquer dessus ouvre automatiquement l'application ou une version dans le navigateur, sans nécessiter de compte dans bien des cas. Il est conseillé de tester ce lien quelques minutes à l'avance plutôt qu'au dernier moment.

## Étiquette d'une réunion en ligne

Quelques habitudes simples améliorent nettement la qualité d'une visioconférence : couper son micro lorsqu'on ne parle pas pour éviter les bruits parasites, s'installer dans un endroit calme et bien éclairé, et prévenir si l'on doit s'absenter temporairement plutôt que de disparaître sans explication.

## Collaborer au-delà de la réunion

Les outils modernes de visioconférence s'accompagnent souvent de fonctions collaboratives : partage d'écran pour montrer un document, tableau blanc partagé, ou édition simultanée d'un même fichier par plusieurs personnes. Ces fonctions permettent de continuer à travailler ensemble efficacement, même après la fin de l'appel vidéo.`,
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
  [
    { q: "Que faut-il vérifier en priorité en créant un compte sur un réseau social ?", options: ["Les paramètres de confidentialité", "La couleur du thème", "Le nombre d'amis de ses amis", "La langue par défaut"], r: "Les paramètres de confidentialité" },
    { q: "Pourquoi faut-il être prudent avant de publier une information ?", options: ["Elle peut être copiée ou partagée même après suppression", "Les publications sont automatiquement supprimées après 24h", "Seuls les amis proches peuvent la voir", "Elle n'est jamais visible par des inconnus"], r: "Elle peut être copiée ou partagée même après suppression" },
    { q: "Quel indice peut aider à repérer un faux compte ?", options: ["Un nombre d'abonnés incohérent avec l'ancienneté du compte", "Une photo de profil colorée", "Un nom de famille courant", "Une bio écrite en anglais"], r: "Un nombre d'abonnés incohérent avec l'ancienneté du compte" },
    { q: "Quelle question se poser avant de publier une photo ?", options: ["Accepterais-je qu'un employeur la voie ?", "A-t-elle une bonne résolution ?", "Est-elle prise le matin ?", "Contient-elle un filtre ?"], r: "Accepterais-je qu'un employeur la voie ?" },
  ],
  [
    { q: "Que signifie stocker un fichier « dans le cloud » ?", options: ["Le conserver sur un serveur distant accessible en ligne", "Le supprimer définitivement", "Le compresser pour gagner de la place", "L'imprimer automatiquement"], r: "Le conserver sur un serveur distant accessible en ligne" },
    { q: "Quel est l'avantage principal d'une sauvegarde cloud ?", options: ["Les fichiers restent accessibles même si l'appareil est perdu ou en panne", "Les fichiers deviennent plus légers", "Le cloud est toujours gratuit et illimité", "Les fichiers ne peuvent plus être partagés"], r: "Les fichiers restent accessibles même si l'appareil est perdu ou en panne" },
    { q: "Comment partager facilement un gros fichier sans passer par un email ?", options: ["Générer un lien de partage depuis le cloud", "L'envoyer en plusieurs emails séparés", "Le compresser en plusieurs parties par email", "Ce n'est pas possible"], r: "Générer un lien de partage depuis le cloud" },
    { q: "Que permet l'organisation en dossiers dans le cloud ?", options: ["Retrouver plus facilement un fichier précis", "Réduire automatiquement la taille des fichiers", "Rendre les fichiers invisibles aux autres", "Empêcher toute suppression accidentelle"], r: "Retrouver plus facilement un fichier précis" },
  ],
  [
    { q: "Que faut-il vérifier avant de payer sur un site marchand inconnu ?", options: ["La présence du cadenas https:// et des informations de contact", "La couleur du bouton d'achat", "Le nombre de publicités sur le site", "La taille des images du site"], r: "La présence du cadenas https:// et des informations de contact" },
    { q: "Pourquoi utiliser un service comme PayPal plutôt que sa carte directement ?", options: ["Les coordonnées bancaires complètes ne sont pas transmises au vendeur", "C'est le seul moyen de paiement accepté partout", "Cela rend l'achat gratuit", "Cela accélère la livraison"], r: "Les coordonnées bancaires complètes ne sont pas transmises au vendeur" },
    { q: "Que doit-on recevoir après un achat en ligne légitime ?", options: ["Un email de confirmation avec un numéro de commande", "Un appel téléphonique obligatoire", "Rien, c'est normal", "Une demande de nouveau mot de passe"], r: "Un email de confirmation avec un numéro de commande" },
    { q: "Quel signal doit alerter lors d'un achat en ligne ?", options: ["Une offre bien trop alléchante pour être vraie", "Un prix identique à celui d'un magasin", "Un logo bien visible", "Un site disponible en plusieurs langues"], r: "Une offre bien trop alléchante pour être vraie" },
  ],
  [
    { q: "Que faut-il tester avant une réunion en ligne importante ?", options: ["Son micro et sa caméra", "La météo du jour", "La couleur de l'arrière-plan", "Le nombre de participants"], r: "Son micro et sa caméra" },
    { q: "Quelle est une bonne pratique pendant une visioconférence ?", options: ["Couper son micro lorsqu'on ne parle pas", "Garder toutes les notifications activées", "Éteindre sa caméra en permanence", "Parler le plus fort possible"], r: "Couper son micro lorsqu'on ne parle pas" },
    { q: "Que permet le partage d'écran ?", options: ["Montrer un document ou une application aux autres participants", "Enregistrer automatiquement la réunion", "Couper le son des autres participants", "Changer la langue de l'application"], r: "Montrer un document ou une application aux autres participants" },
    { q: "Comment rejoint-on généralement une visioconférence ?", options: ["En cliquant sur un lien reçu par email ou message", "En composant un numéro de téléphone fixe uniquement", "En se rendant physiquement sur place", "Ce n'est possible qu'avec un compte payant"], r: "En cliquant sur un lien reçu par email ou message" },
  ],
];

module.exports = { LECONS, QUIZ };
