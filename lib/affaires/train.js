// Affaire « Le Train de nuit » — niveau Difficile
// Avec un serveur, seul `publicCase` est envoyé au navigateur.

export const publicCase = {
  id: 'train',
  numero: '003',
  niveau: 3,
  niveauLabel: 'Difficile',
  questions: 18,
  duree: '20–30 min',
  temoins: 'le serveur du wagon-bar et les autres passagers de la voiture 12',
  titre: 'Le Train de nuit',
  accroche: 'Paris–Nice, voiture 12. Au petit matin, un avocat est retrouvé mort dans un compartiment fermé à clé.',
  victime: {
    nom: 'Arnaud Keller',
    age: 49,
    description: 'Avocat d\'affaires parisien, brillant et sans scrupules. Il voyageait seul dans le compartiment 12-3.',
  },
  lieu: 'Train de nuit Paris–Nice, voiture-lits n° 12',
  date: 'Nuit du 2 au 3 novembre, décès entre 1h et 2h',
  resume:
    'À 6h40, le contrôleur ouvre le compartiment 12-3 avec son passe et découvre Arnaud Keller sans vie. ' +
    'Sur la tablette, une mignonnette de whisky vide. L\'analyse est formelle : empoisonnement. ' +
    'Le train n\'a fait aucun arrêt entre minuit et 5h : le coupable était à bord. Quatre personnes avaient des comptes à régler.',
  suspects: [
    {
      id: 'claire',
      nom: 'Claire Keller',
      age: 46,
      role: 'Ex-épouse de la victime',
      description: 'Divorcée depuis deux ans, en procès avec Arnaud pour une pension impayée. Elle voyageait en voiture 14.',
      portrait: { peau: '#f0cfb6', cheveux: '#b8843d', coiffure: 'long', habit: '#4a2b3b', accessoire: 'echarpe', fond: '#4b3550' },
    },
    {
      id: 'sami',
      nom: 'Sami Benali',
      age: 34,
      role: 'Contrôleur de la voiture 12',
      description: 'C\'est lui qui a découvert le corps. Il a le passe qui ouvre tous les compartiments.',
      portrait: { peau: '#b98563', cheveux: '#1b1512', coiffure: 'court', habit: '#1f3354', accessoire: 'casquette', fond: '#2d4766' },
    },
    {
      id: 'juliette',
      nom: 'Juliette Morand',
      age: 29,
      role: 'Collaboratrice de la victime',
      description: 'Jeune avocate du cabinet Keller, dans le compartiment voisin (12-4). Elle accompagnait Arnaud à un rendez-vous à Nice.',
      portrait: { peau: '#e7bfa0', cheveux: '#1d1a1a', coiffure: 'carre', habit: '#2a2a33', accessoire: 'lunettes', fond: '#3a4060' },
    },
    {
      id: 'bertrand',
      nom: 'Bertrand Lafont',
      age: 61,
      role: 'Passager de la voiture 12',
      description: 'Ancien industriel à la retraite, compartiment 12-6. Cardiaque, il dit avoir dormi toute la nuit.',
      portrait: { peau: '#e2b896', cheveux: '#9a9a9a', coiffure: 'degarni', habit: '#3a3128', accessoire: 'moustache', fond: '#55473a' },
    },
  ],
  preuves: [
    { id: 'autopsie', titre: 'Rapport d\'autopsie', icone: '🩺', texte: 'Empoisonnement à la digoxine, un médicament pour le cœur, à très forte dose, mélangée à du whisky. Décès entre 1h et 2h.' },
    { id: 'mignonnette', titre: 'Mignonnette de whisky', icone: '🥃', texte: 'Mignonnette vide du wagon-bar, sur la tablette du 12-3. Le gobelet porte une empreinte partielle qui n\'est pas celle de la victime.' },
    { id: 'ticket', titre: 'Ticket du wagon-bar', icone: '🧾', texte: 'Ticket de 0h52 : 2 mignonnettes de whisky, payées par carte bancaire au nom de « B. LAFONT ».' },
    { id: 'plaquette', titre: 'Plaquette de médicament', icone: '💊', texte: 'Plaquette vide trouvée dans la poubelle des toilettes de la voiture 12. Étiquette de pharmacie : « Digoxine — M. B. Lafont ».' },
    { id: 'registre', titre: 'Registre des rondes', icone: '📋', texte: 'Registre du contrôleur : rondes en voiture 12 notées à 1h00 et 3h00, signées S. Benali. « RAS » à chaque fois.' },
    { id: 'dossier', titre: 'Note dans la mallette', icone: '📁', texte: 'Note interne du cabinet Keller : « Fonds séquestre Lafont Industries — 1,2 M€ — à régulariser avant l\'audit de janvier. »' },
    { id: 'passager', titre: 'Témoignage d\'un passager', icone: '🗣️', texte: '« Vers 23h30, j\'ai entendu une femme crier dans le 12-3 : “Tu me dois ça, Arnaud !” Puis une porte a claqué. »' },
  ],
  chronologie: [
    { heure: '22h04', texte: 'Départ de Paris-Austerlitz.' },
    { heure: '23h30', texte: 'Dispute entendue dans le compartiment 12-3.' },
    { heure: '0h52', texte: 'Achat de 2 mignonnettes de whisky au wagon-bar.' },
    { heure: '1h00', texte: 'Ronde du contrôleur notée au registre.' },
    { heure: '1h–2h', texte: 'Heure estimée du décès.' },
    { heure: '3h00', texte: 'Deuxième ronde notée au registre.' },
    { heure: '6h40', texte: 'Le contrôleur découvre le corps.' },
  ],
  mobiles: [
    { id: 'vengeance', texte: 'Se venger d\'avoir été ruiné par la victime' },
    { id: 'pension', texte: 'Obtenir une pension impayée' },
    { id: 'scandale', texte: 'Étouffer un scandale au cabinet' },
    { id: 'trafic', texte: 'Cacher un trafic de couchettes' },
    { id: 'heritage', texte: 'Toucher un héritage' },
  ],
};

export const solution = {
  coupable: 'bertrand',
  mobile: 'vengeance',
  preuvesDecisives: ['plaquette', 'ticket'],
  preuvesUtiles: ['dossier', 'mignonnette'],
  revelation:
    'Arnaud Keller avait détourné 1,2 million d\'euros du fonds séquestre de Lafont Industries, l\'entreprise de Bertrand Lafont, ' +
    'qui avait tout perdu. Quand Bertrand a appris qu\'Arnaud prenait le même train, il a décidé d\'en finir. ' +
    'À 0h52, il a acheté deux mignonnettes de whisky avec sa propre carte. Il a écrasé dans l\'une d\'elles toute une plaquette ' +
    'de sa digoxine, et il est allé frapper au 12-3 vers 1h10 « pour enterrer la hache de guerre ». Arnaud a bu. ' +
    'Bertrand a refermé la porte en partant et jeté la plaquette dans les toilettes. Le contrôleur, occupé à vendre des couchettes ' +
    'en voiture 10, n\'a jamais fait sa ronde de 1h.',
};

export const secrets = {
  claire: {
    fiche: `Tu es Claire Keller, 46 ans, ex-épouse d'Arnaud Keller. Divorcée depuis deux ans, tu es en procès avec lui : il ne te verse plus la pension qu'il te doit (80 000 € d'arriérés). Tu voyageais en voiture 14 pour voir ta sœur à Nice.

Personnalité : vive, amère, sarcastique, mais pas violente. Tu parles d'Arnaud avec mépris.

Ta version : tu n'as pas vu Arnaud de la nuit, tu ne savais même pas qu'il était dans ce train.

La vérité (tu es INNOCENTE) : tu savais qu'il serait dans ce train. Vers 23h30, tu es allée dans son compartiment pour réclamer ton argent. Vous vous êtes disputés, tu as crié « Tu me dois ça, Arnaud ! » et tu es repartie en claquant la porte. Il était bien vivant. Tu mens par peur d'être accusée. Tu avoues la dispute si on te montre le témoignage du passager ou si on insiste beaucoup.

Ce que tu sais d'utile :
- En retournant vers ta voiture vers 1h10, après être restée longtemps au wagon-bar, tu as croisé dans le couloir de la voiture 12 un homme âgé aux cheveux gris, avec une moustache, qui allait vers le compartiment d'Arnaud avec deux petites bouteilles à la main. Tu ne le dis qu'après avoir avoué ta propre visite, si on te demande ce que tu as vu ou qui tu as croisé.
- Arnaud « a ruiné plus de gens que tu ne peux l'imaginer ». Tu ne connais pas les noms.`,
    indices: {
      claire_dispute: 'Claire avoue être allée voir Arnaud vers 23h30 pour réclamer sa pension. C\'était elle qui criait.',
      claire_homme: 'Vers 1h10, Claire a croisé dans la voiture 12 un homme âgé, cheveux gris et moustache, deux mignonnettes à la main.',
      claire_ruines: 'Selon Claire, Arnaud a ruiné beaucoup de gens.',
    },
  },
  sami: {
    fiche: `Tu es Sami Benali, 34 ans, contrôleur de la voiture-lits 12. C'est toi qui as découvert le corps à 6h40, avec ton passe.

Personnalité : poli, professionnel, mais très nerveux. Tu as peur de perdre ton emploi. Tu vouvoies et tu dis souvent « je vous assure ».

Ta version : tu as fait tes rondes à 1h et à 3h comme indiqué dans le registre, rien à signaler.

La vérité (tu es INNOCENT) : tu arrondis tes fins de mois en vendant des couchettes vides en liquide à des passagers sans réservation. De 0h45 à 1h40, tu étais en voiture 10 pour ça. Tu n'as pas fait la ronde de 1h : tu l'as notée après coup. Tu l'avoues si on te montre le registre en insistant, ou si on te parle de couchettes vendues.

Ce que tu sais d'utile :
- À ta ronde de 3h (réelle), la porte du 12-3 n'était pas verrouillée, alors qu'Arnaud Keller t'avait demandé à 22h30 de ne le déranger sous aucun prétexte et qu'il fermait toujours à clé. Tu n'as pas osé ouvrir. Tu le dis si on te parle de la porte, de la clé ou du compartiment.
- Le passager du 12-6, M. Lafont, t'a demandé vers 22h30 « dans quel compartiment est maître Keller ». Tu le dis si on te parle de Lafont ou des autres passagers.`,
    indices: {
      sami_trafic: 'Sami avoue vendre des couchettes en liquide : il n\'a pas fait sa ronde de 1h, il était en voiture 10.',
      sami_porte: 'À 3h, la porte du 12-3 n\'était pas verrouillée, alors qu\'Arnaud fermait toujours à clé.',
      sami_lafont: 'Vers 22h30, Bertrand Lafont a demandé au contrôleur dans quel compartiment voyageait Arnaud Keller.',
    },
  },
  juliette: {
    fiche: `Tu es Juliette Morand, 29 ans, avocate collaboratrice au cabinet Keller. Tu étais dans le compartiment voisin (12-4).

Personnalité : brillante, précise, froide en apparence, mais rongée par la culpabilité. Tu pèses chaque mot comme au tribunal.

Ta version : tu as travaillé sur ton ordinateur puis tu as dormi. Tu n'as rien entendu.

La vérité (tu es INNOCENTE) : tu as découvert qu'Arnaud détournait l'argent des clients du cabinet. Tu avais décidé de le dénoncer à l'Ordre des avocats. Vers 0h30, tu es allée le voir pour lui annoncer ta démission. Il t'a menacée de briser ta carrière. Tu mens parce que cette dispute te rend suspecte. Tu l'avoues si on te montre la note de la mallette ou si on insiste beaucoup.

Ce que tu sais d'utile :
- La note sur le fonds séquestre Lafont : Arnaud a détourné 1,2 million d'euros à Lafont Industries. L'entreprise a fait faillite, et son patron, Bertrand Lafont, a tout perdu. Tu as reconnu son nom sur la liste des passagers, mais tu ne l'as jamais vu en vrai. Tu ne le dis que si on te parle du dossier, de la note, des clients ou de Lafont.
- À 0h30, quand tu as quitté Arnaud, il était vivant et buvait de l'eau. Il n'y avait pas de whisky sur sa tablette.`,
    indices: {
      juliette_demission: 'Juliette avoue être allée voir Arnaud vers 0h30 : elle voulait le dénoncer et démissionner.',
      juliette_lafont: 'Arnaud a détourné 1,2 M€ à Lafont Industries : Bertrand Lafont a tout perdu à cause de lui.',
      juliette_pas_whisky: 'À 0h30, il n\'y avait pas de whisky sur la tablette d\'Arnaud.',
    },
  },
  bertrand: {
    fiche: `Tu es Bertrand Lafont, 61 ans, ancien patron de Lafont Industries, aujourd'hui ruiné. Compartiment 12-6. Tu es cardiaque et tu prends de la digoxine.

Personnalité : courtois, cultivé, fatigué, avec une politesse d'un autre temps. Tu parles lentement. Ta colère est froide et profonde.

LA VÉRITÉ (tu es COUPABLE, et tu ne l'avoues pas facilement) : Arnaud Keller a détourné 1,2 million d'euros de ton entreprise, qui a fait faillite. Ta femme est partie, tu as tout perdu. En apprenant qu'il prenait ce train, tu as acheté un billet. À 0h52, tu as acheté deux mignonnettes de whisky au wagon-bar avec ta carte. Tu as écrasé toute une plaquette de digoxine dans l'une d'elles. Vers 1h10, tu as frappé au 12-3 en disant vouloir « enterrer la hache de guerre ». Arnaud a bu. Tu as refermé la porte sans la verrouiller, et tu as jeté la plaquette dans les toilettes.

Ta version mensongère : tu as pris un somnifère à 23h et tu as dormi jusqu'au matin. Tu ne connaissais pas la victime « autrement que de nom ».

Comment te défendre :
- Si on te montre le ticket du bar : on a dû te voler ta carte, ou tu es allé chercher un verre pour dormir, tu ne te souviens plus bien à cause du somnifère.
- Si on te montre la plaquette : c'est ton médicament, oui, mais tu as pu la perdre, n'importe qui a pu la prendre.
- Si on te parle de Lafont Industries ou du détournement : tu te raidis, tu dis que c'est de l'histoire ancienne et que la justice s'en occupe.

Quand craquer : si l'inspecteur t'a confronté de façon convaincante à au moins deux éléments parmi le ticket du bar, la plaquette et la note sur le fonds séquestre, tu craques avec une calme dignité : tu avoues tout, sans regret, en expliquant ce qu'Arnaud t'a pris.`,
    indices: {
      bertrand_dormi: 'Bertrand affirme avoir pris un somnifère à 23h et dormi toute la nuit.',
      bertrand_ruine: 'Bertrand reconnaît qu\'Arnaud Keller a ruiné son entreprise.',
      bertrand_bar: 'Bertrand admet être allé au wagon-bar dans la nuit.',
      bertrand_aveu: 'Bertrand avoue : il a versé sa digoxine dans le whisky d\'Arnaud vers 1h10.',
    },
  },
};

const ALIBI = ['ou etiez', 'alibi', 'faisiez', 'cette nuit', 'nuit', 'dormi', 'dormir', '1h', 'minuit'];

export const demo = {
  parDefaut: {
    claire: [
      '*rire sans joie* Vous cherchez quoi, au juste ?',
      'Arnaud avait plus d\'ennemis que de clients. Posez des questions précises.',
      'Je n\'ai rien à ajouter.',
    ],
    sami: [
      'Je vous assure, je fais mon travail correctement.',
      '*tripote sa casquette* Je… je ne vois pas ce que vous voulez dire.',
      'Je peux retourner à mon service ?',
    ],
    juliette: [
      'Votre question n\'est pas assez précise pour que j\'y réponde.',
      '*croise les mains* Je n\'ai rien à déclarer à ce sujet.',
      'Je vous écoute. Mais soyez précis.',
    ],
    bertrand: [
      'Je suis un vieil homme fatigué, inspecteur. Que voulez-vous savoir ?',
      '*sourit poliment* Je crains de ne pas pouvoir vous aider davantage.',
      'Ce train est bien inconfortable pour un cardiaque, savez-vous.',
    ],
  },
  regles: {
    claire: [
      { preuve: 'passager', reponse: '*serre les dents* … Oui. C\'était moi. Je suis allée le voir vers 23h30 pour mon argent. On s\'est hurlé dessus et je suis partie. Il était vivant, je vous le jure. [[INDICE:claire_dispute]]' },
      { mots: ['dispute', 'cri', 'vu arnaud', 'compartiment', 'visite', 'savez qu'], insistance: 1, reponse: '*serre les dents* … Oui. Je suis allée le voir vers 23h30 pour mon argent. On s\'est hurlé dessus et je suis partie. Il était vivant, je vous le jure. [[INDICE:claire_dispute]]' },
      { requiert: ['claire_dispute'], mots: ['vu', 'croise', 'quelqu', 'couloir', 'homme', 'remarque', 'apres'], reponse: 'Vers 1h10, en revenant du bar, j\'ai croisé dans la voiture 12 un vieil homme. Cheveux gris, moustache. Il allait vers le compartiment d\'Arnaud avec deux petites bouteilles à la main. [[INDICE:claire_homme]]' },
      { mots: ['pension', 'argent', 'proces', 'divorce', 'doit'], reponse: 'Il me doit 80 000 € de pension. Mort, il ne me les paiera jamais. Réfléchissez : je n\'avais aucun intérêt à le tuer.' },
      { mots: ['ennemi', 'ruine', 'client', 'qui voulait'], reponse: 'Arnaud a ruiné plus de gens que vous ne pouvez l\'imaginer. Des familles entières. Je ne connais pas les noms. [[INDICE:claire_ruines]]' },
      { mots: ['dispute', 'cri', 'vu arnaud', 'compartiment', 'visite', 'savez qu'], reponse: 'Je ne savais même pas qu\'il était dans ce train. Je ne l\'ai pas vu de la nuit.' },
      { mots: ALIBI, reponse: 'J\'étais en voiture 14. J\'ai passé une partie de la nuit au wagon-bar, je n\'arrivais pas à dormir.' },
    ],
    sami: [
      { preuve: 'registre', reponse: '*pâlit* Je… La ronde de 1h, je ne l\'ai pas faite. Je l\'ai notée après. J\'étais en voiture 10… je vendais des couchettes vides en liquide. Je vous en supplie, ne le dites pas à la SNCF. [[INDICE:sami_trafic]]' },
      { mots: ['couchette', 'liquide', 'vend', 'voiture 10', 'ronde', 'registre'], insistance: 1, reponse: '*pâlit* Je… La ronde de 1h, je ne l\'ai pas faite. Je l\'ai notée après. J\'étais en voiture 10… je vendais des couchettes vides en liquide. [[INDICE:sami_trafic]]' },
      { mots: ['porte', 'cle', 'verrou', 'ferme', '3h', 'compartiment'], reponse: 'À ma ronde de 3h, la porte du 12-3 n\'était pas verrouillée. Pourtant, M. Keller m\'avait dit de ne le déranger sous aucun prétexte, il fermait toujours à clé. Je n\'ai pas osé ouvrir… [[INDICE:sami_porte]]' },
      { mots: ['lafont', '12-6', 'passager', 'autres', 'quelqu'], reponse: 'Le monsieur du 12-6, M. Lafont, m\'a demandé vers 22h30 dans quel compartiment était maître Keller. J\'ai cru qu\'ils se connaissaient. [[INDICE:sami_lafont]]' },
      { mots: ['ronde', 'registre', ...ALIBI], reponse: 'J\'ai fait mes rondes à 1h et à 3h, c\'est noté dans le registre. Rien à signaler, je vous assure.' },
      { mots: ['corps', 'decouvert', '6h40', 'passe'], reponse: 'À 6h40, il ne répondait pas pour le réveil. J\'ai ouvert avec mon passe… Il était déjà froid.' },
    ],
    juliette: [
      { preuve: 'dossier', reponse: '*long silence* Vous l\'avez trouvée. Arnaud a détourné 1,2 million à Lafont Industries. L\'entreprise a fait faillite, et Bertrand Lafont a tout perdu. Il est dans ce train, j\'ai vu son nom sur la liste. [[INDICE:juliette_lafont]]' },
      { mots: ['lafont', 'sequestre', 'detourn', 'note', 'mallette', 'dossier', 'client'], reponse: 'Lafont Industries… Arnaud a détourné 1,2 million de leur fonds séquestre. Le patron, Bertrand Lafont, a tout perdu. Son nom est sur la liste des passagers. [[INDICE:juliette_lafont]]' },
      { mots: ['vu arnaud', 'visite', 'parle', 'demission', 'denonc', 'dispute', 'compartiment'], insistance: 1, reponse: '*ferme les yeux* Oui, je suis allée le voir vers 0h30. Je voulais démissionner et le dénoncer à l\'Ordre. Il m\'a menacée. Mais quand je suis partie, il était vivant. [[INDICE:juliette_demission]]' },
      { requiert: ['juliette_demission'], mots: ['whisky', 'tablette', 'bouteille', 'boire', 'buvait'], reponse: 'Quand je l\'ai quitté à 0h30, il buvait de l\'eau. Il n\'y avait aucun whisky sur sa tablette, j\'en suis certaine. [[INDICE:juliette_pas_whisky]]' },
      { preuve: 'mignonnette', reponse: 'Arnaud ne buvait jamais de whisky le soir. Quelqu\'un le lui a apporté.' },
      { mots: ALIBI, reponse: 'J\'ai travaillé sur mon ordinateur, puis j\'ai dormi. Je n\'ai rien entendu.' },
    ],
    bertrand: [
      { requiert: ['bertrand_aveu'], reponse: '*regarde par la fenêtre* Il m\'a tout pris, inspecteur. Mon entreprise, ma femme, mes ouvriers. Je n\'ai aucun regret.' },
      { confrontation: { preuves: ['ticket', 'plaquette', 'dossier'], indices: ['bertrand_ruine', 'bertrand_bar'], min: 3 }, unique: 'bertrand_aveu', reponse: '*pose lentement ses mains sur la table* Très bien. Oui. J\'ai acheté ce whisky. J\'y ai écrasé ma digoxine, et je suis allé le voir vers 1h10 pour « faire la paix ». Il a bu. C\'est tout ce qu\'il méritait. [[INDICE:bertrand_aveu]]' },
      { preuve: 'ticket', reponse: '*hésite* Ah… Oui, il se peut que je sois allé chercher un verre pour m\'aider à dormir. Avec le somnifère, mes souvenirs sont flous. [[INDICE:bertrand_bar]]' },
      { mots: ['bar', 'whisky', 'mignonnette', 'carte'], reponse: '*hésite* Le bar ? Il se peut que j\'y sois passé chercher un verre pour dormir. Avec le somnifère, mes souvenirs sont flous. [[INDICE:bertrand_bar]]' },
      { preuve: 'plaquette', reponse: 'C\'est mon médicament, oui. Je l\'aurai perdue dans le couloir. N\'importe qui a pu la ramasser, vous savez.' },
      { preuve: 'dossier', reponse: '*se raidit* Oui. Cet homme a ruiné Lafont Industries. C\'est de l\'histoire ancienne. La justice s\'en occupe. [[INDICE:bertrand_ruine]]' },
      { mots: ['lafont industries', 'entreprise', 'ruine', 'faillite', 'sequestre', 'detourn', 'keller', 'connaiss'], reponse: '*se raidit* Je le connaissais de nom. Il a ruiné mon entreprise, oui. C\'est de l\'histoire ancienne, la justice s\'en occupe. [[INDICE:bertrand_ruine]]' },
      { mots: ['coeur', 'cardiaque', 'medicament', 'digoxine', 'traitement'], reponse: 'Je suis cardiaque depuis dix ans. Je prends un traitement, comme beaucoup d\'hommes de mon âge.' },
      { mots: ALIBI, reponse: 'J\'ai pris un somnifère vers 23h et j\'ai dormi jusqu\'au matin. À mon âge, inspecteur, on ne fait plus la fête dans les trains. [[INDICE:bertrand_dormi]]' },
    ],
  },
};
