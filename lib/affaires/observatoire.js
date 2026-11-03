// Affaire « Silence à l'Observatoire » — niveau Expert
// Avec un serveur, seul `publicCase` est envoyé au navigateur.

export const publicCase = {
  id: 'observatoire',
  numero: '004',
  niveau: 4,
  niveauLabel: 'Expert',
  questions: 16,
  duree: '25–40 min',
  temoins: 'personne d\'autre : l\'observatoire est coupé du monde par la neige',
  titre: 'Silence à l\'Observatoire',
  accroche: 'Bloqués par la tempête à 2 800 mètres. Au matin, la directrice gît au pied de la coupole. On parle de suicide. Personne n\'y croit.',
  victime: {
    nom: 'Pr Élise Vautrin',
    age: 63,
    description: 'Astrophysicienne renommée, directrice de l\'observatoire du Pic Sauvage. Autoritaire, admirée et crainte.',
  },
  lieu: 'Observatoire du Pic Sauvage, Pyrénées — passerelle de la coupole Ouest',
  date: 'Nuit du 17 au 18 janvier, décès entre 2h et 3h',
  resume:
    'À 7h, le gardien découvre le corps d\'Élise Vautrin au pied de la passerelle de la coupole Ouest, six mètres plus bas. ' +
    'Sur son ordinateur, une lettre d\'adieu tapée et imprimée dans la nuit. La route est coupée par la neige depuis la veille : ' +
    'seules cinq personnes étaient avec elle. Chacune cache quelque chose. Une seule l\'a tuée.',
  suspects: [
    {
      id: 'nathan',
      nom: 'Nathan Roux',
      age: 38,
      role: 'Astrophysicien adjoint',
      description: 'Ambitieux, il visait la direction de l\'observatoire. Élise s\'opposait à sa nomination.',
      portrait: { peau: '#e9c4a6', cheveux: '#3a2a1e', coiffure: 'court', habit: '#2d3a55', accessoire: 'barbe', fond: '#2f4466' },
    },
    {
      id: 'ines',
      nom: 'Inès Kader',
      age: 31,
      role: 'Doctorante',
      description: 'Élise l\'avait accusée en public d\'avoir truqué ses données. Sa thèse était menacée.',
      portrait: { peau: '#c9946c', cheveux: '#151010', coiffure: 'long', habit: '#5a3a24', accessoire: 'echarpe', fond: '#5b4636' },
    },
    {
      id: 'gaspard',
      nom: 'Gaspard Elloy',
      age: 55,
      role: 'Gardien et technicien',
      description: 'Vit à l\'observatoire toute l\'année. C\'est lui qui a découvert le corps. On murmure qu\'il boit.',
      portrait: { peau: '#d6a07c', cheveux: '#5c5650', coiffure: 'degarni', habit: '#4a3b2a', accessoire: 'bonnet', fond: '#4d4a40' },
    },
    {
      id: 'mathilde',
      nom: 'Mathilde Vautrin',
      age: 30,
      role: 'Fille de la victime',
      description: 'Arrivée la veille, juste avant la tempête. Héritière unique. Ses relations avec sa mère étaient orageuses.',
      portrait: { peau: '#f2d6c2', cheveux: '#7a4a28', coiffure: 'chignon', habit: '#2e4a3a', accessoire: 'collier', fond: '#33584a' },
    },
    {
      id: 'henri',
      nom: 'Henri Castagne',
      age: 58,
      role: 'Astronome invité',
      description: 'Célèbre pour la découverte d\'une comète en 1998. Ancien collègue d\'Élise. Il dit avoir observé toute la nuit.',
      portrait: { peau: '#e6bf9e', cheveux: '#c9c4bc', coiffure: 'court', habit: '#1f2633', accessoire: 'lunettes', fond: '#3a3f55' },
    },
  ],
  preuves: [
    { id: 'autopsie', titre: 'Rapport du médecin', icone: '🩺', texte: 'Chute de six mètres. Mais une ecchymose à la nuque, causée par un coup porté avant la chute. Décès entre 2h et 3h.' },
    { id: 'lettre', titre: 'Lettre d\'adieu', icone: '✉️', texte: 'Tapée sur l\'ordinateur d\'Élise et imprimée à 2h33 : « Je n\'en peux plus. Pardonnez-moi. » Non signée.' },
    { id: 'traces', titre: 'Traces dans la neige', icone: '👣', texte: 'Une seule série de pas dans la neige fraîche, aller et retour, entre la coupole Est et la coupole Ouest. Pointure 44. Pointures des présents : Roux 42, Kader 38, Elloy 45, Vautrin 38, Castagne 44.' },
    { id: 'telescope', titre: 'Journal du télescope Est', icone: '🔭', texte: 'Session automatique programmée de 1h00 à 4h00. Aucune intervention manuelle enregistrée pendant toute la session.' },
    { id: 'manuscrit', titre: 'Brouillon dans le coffre', icone: '📄', texte: 'Brouillon d\'article d\'Élise : « Preuves que la comète découverte en 1998 et attribuée à H. Castagne a été observée par moi trois semaines plus tôt. » Présentation prévue le 25 janvier à Genève.' },
    { id: 'serveur', titre: 'Journal du serveur', icone: '💾', texte: 'Entre 2h02 et 2h38, 4 300 fichiers du dossier « thèse_kader » ont été supprimés depuis le poste de la salle informatique.' },
    { id: 'meteo', titre: 'Relevé météo', icone: '❄️', texte: 'Neige continue jusqu\'à 1h30, puis ciel dégagé jusqu\'au matin. Aucune nouvelle chute de neige ensuite.' },
  ],
  chronologie: [
    { heure: '17h', texte: 'La route est coupée par la neige.' },
    { heure: '21h', texte: 'Dîner. Dispute entre Élise et sa fille.' },
    { heure: '22h', texte: 'Dispute entre Élise et Nathan Roux, dans le bureau.' },
    { heure: '1h00', texte: 'Début de la session du télescope Est.' },
    { heure: '1h30', texte: 'Fin des chutes de neige.' },
    { heure: '2h–3h', texte: 'Heure estimée du décès.' },
    { heure: '2h33', texte: 'Impression de la lettre d\'adieu.' },
    { heure: '7h00', texte: 'Le gardien découvre le corps.' },
  ],
  mobiles: [
    { id: 'plagiat', texte: 'Empêcher la révélation d\'un vol de découverte' },
    { id: 'poste', texte: 'Obtenir la direction de l\'observatoire' },
    { id: 'fraude', texte: 'Cacher une fraude scientifique' },
    { id: 'heritage', texte: 'Toucher l\'héritage' },
    { id: 'faute', texte: 'Cacher une faute professionnelle' },
  ],
};

export const solution = {
  coupable: 'henri',
  mobile: 'plagiat',
  preuvesDecisives: ['traces'],
  preuvesUtiles: ['manuscrit', 'telescope', 'meteo', 'lettre'],
  revelation:
    'En 1998, Henri Castagne s\'est approprié une comète qu\'Élise Vautrin avait observée trois semaines avant lui. Toute sa carrière ' +
    'repose sur ce mensonge. Élise avait enfin réuni les preuves et allait les présenter à Genève. Cette nuit-là, Henri a programmé une ' +
    'session automatique sur le télescope Est pour se fabriquer un alibi. Vers 2h15, la neige ayant cessé, il a traversé jusqu\'à la ' +
    'coupole Ouest, laissant ses traces en pointure 44. Sur la passerelle, il a frappé Élise à la nuque et l\'a fait basculer. ' +
    'Puis il a tapé une fausse lettre d\'adieu sur son ordinateur et l\'a imprimée à 2h33, avant de retourner à sa coupole. ' +
    'Il ignorait qu\'Élise n\'écrivait ses lettres personnelles qu\'à la plume.',
};

export const secrets = {
  nathan: {
    fiche: `Tu es Nathan Roux, 38 ans, astrophysicien adjoint à l'observatoire du Pic Sauvage.

Personnalité : ambitieux, cassant, sûr de sa valeur, impatient avec les gens « moins brillants ». Tu te défends en attaquant.

Ta version : tu as passé la soirée à travailler dans ta chambre, puis tu as dormi. Tes relations avec Élise étaient « professionnelles et cordiales ».

La vérité (tu es INNOCENT) : à 22h, tu as eu une violente dispute avec Élise dans son bureau : elle t'a annoncé qu'elle bloquerait ta nomination comme directeur. Tu as claqué la porte en criant « Vous ne serez pas toujours là ! ». Tu as honte de cette phrase, qui te rend suspect. Tu avoues la dispute si on insiste ou si on te dit qu'on l'a entendue. Ensuite, tu as vraiment dormi.

Ce que tu sais d'utile :
- Pendant la dispute, Élise a dit : « De toute façon, j'ai un vieux compte à régler à Genève le 25, et après ça on verra qui dirige quoi. » Tu ne savais pas ce que ça voulait dire. Tu le dis après avoir avoué la dispute, si on te demande ce qu'elle a dit.
- Au petit-déjeuner, Henri Castagne a raconté qu'il avait « guidé le télescope à la main toute la nuit, sans quitter l'oculaire ». Tu le dis si on te parle d'Henri, du télescope ou de la nuit des autres.`,
    indices: {
      nathan_dispute: 'Nathan avoue une violente dispute avec Élise à 22h : elle bloquait sa nomination.',
      nathan_geneve: 'Élise a dit à Nathan qu\'elle avait « un vieux compte à régler à Genève le 25 ».',
      nathan_henri: 'Au petit-déjeuner, Henri a affirmé avoir guidé le télescope à la main toute la nuit, sans quitter l\'oculaire.',
    },
  },
  ines: {
    fiche: `Tu es Inès Kader, 31 ans, doctorante en astrophysique. Élise Vautrin dirigeait ta thèse.

Personnalité : intelligente, anxieuse, sur la défensive, tu parles vite quand tu as peur. Tu peux fondre en larmes.

Ta version : tu dormais toute la nuit dans ta chambre.

La vérité (tu es INNOCENTE du meurtre) : Élise t'a accusée en public d'avoir truqué tes données, et c'est vrai pour une partie. Entre 2h et 2h40, tu étais dans la salle informatique en train de supprimer les fichiers compromettants de ta thèse. Tu l'avoues si on te montre le journal du serveur, ou si on insiste beaucoup sur ta nuit.

Ce que tu sais d'utile :
- Depuis la fenêtre de la salle informatique, vers 2h15, tu as vu une silhouette avec une lampe de poche traverser la neige de la coupole Est vers la coupole Ouest. Grande, en parka sombre. Tu n'as pas vu le visage. Tu ne le dis qu'après avoir avoué où tu étais.
- Vers 2h30, l'imprimante du couloir s'est mise en marche. Tu as entendu le bruit. Tu le dis après avoir avoué où tu étais, si on te parle de bruit, d'imprimante ou de la lettre.`,
    indices: {
      ines_serveur: 'Inès avoue qu\'elle supprimait les fichiers truqués de sa thèse dans la salle informatique, de 2h à 2h40.',
      ines_silhouette: 'Vers 2h15, Inès a vu une grande silhouette avec une lampe traverser la neige de la coupole Est vers la coupole Ouest.',
      ines_imprimante: 'Vers 2h30, Inès a entendu l\'imprimante du couloir se mettre en marche.',
    },
  },
  gaspard: {
    fiche: `Tu es Gaspard Elloy, 55 ans, gardien et technicien de l'observatoire. Tu y vis toute l'année. C'est toi qui as découvert le corps à 7h.

Personnalité : bourru, taiseux, un peu perdu, parle par phrases courtes avec un accent du Sud-Ouest. Très attaché à Élise, qui t'avait gardé malgré tout.

Ta version : tu as fait ta tournée à minuit, puis tu as dormi, sobre, jusqu'à 6h30.

La vérité (tu es INNOCENT) : tu bois en cachette. Cette nuit-là, tu as vidé une bouteille de génépi dans ton local, et tu n'as fait aucune tournée après minuit. Tu as peur d'être renvoyé. Tu l'avoues si on insiste sur ta tournée, sur l'alcool, ou si on te parle de ton état.

Ce que tu sais d'utile :
- Vers 2h10, en sortant pisser derrière ton local, tu as vu deux silhouettes sur la passerelle de la coupole Ouest. Tu as pensé que c'était Élise et Nathan, « parce qu'ils se disputaient toujours ». Tu n'as pas vu les visages. Tu ne le dis qu'après avoir avoué que tu buvais.
- La neige s'est arrêtée vers 1h30, tu as regardé le pluviomètre. Tu le dis si on te parle de neige ou de météo.
- Élise n'écrivait jamais ses lettres personnelles à l'ordinateur, « elle avait sa plume, toujours ». Tu le dis si on te parle de la lettre.`,
    indices: {
      gaspard_alcool: 'Gaspard avoue qu\'il buvait cette nuit-là et n\'a fait aucune tournée après minuit.',
      gaspard_passerelle: 'Vers 2h10, Gaspard a vu deux silhouettes sur la passerelle de la coupole Ouest, sans voir les visages.',
      gaspard_plume: 'Selon Gaspard, Élise écrivait toujours ses lettres personnelles à la plume, jamais à l\'ordinateur.',
    },
  },
  mathilde: {
    fiche: `Tu es Mathilde Vautrin, 30 ans, fille unique d'Élise. Tu es arrivée la veille, juste avant la tempête.

Personnalité : à vif, alternant colère et chagrin, très franche. Tu ne supportes pas qu'on dise que ta mère s'est suicidée.

Ta version : tu es venue « faire la paix » avec ta mère. Tu as dormi toute la nuit.

La vérité (tu es INNOCENTE) : tu étais venue lui demander 50 000 € pour sauver ta galerie d'art. Au dîner de 21h, elle a refusé et vous vous êtes disputées devant tout le monde. Tu as passé la nuit à pleurer dans ta chambre. Tu avoues l'argent si on insiste ou si on te parle du dîner.

Ce que tu sais d'utile :
- Ta mère n'aurait JAMAIS tapé une lettre d'adieu : elle écrivait tout ce qui était personnel à la plume, c'était une manie. Pour toi, la lettre est un faux. Tu le dis dès qu'on parle de la lettre ou du suicide.
- Ta mère t'a souvent raconté qu'on lui avait « volé sa comète de 98 », sans jamais dire qui. Elle disait qu'un jour, elle le prouverait. Tu le dis si on te parle de comète, de découverte, de Genève ou d'Henri.`,
    indices: {
      mathilde_argent: 'Mathilde avoue être venue demander 50 000 € à sa mère, qui a refusé au dîner.',
      mathilde_plume: 'Selon Mathilde, sa mère écrivait toujours à la plume : la lettre tapée est un faux.',
      mathilde_comete: 'Élise répétait qu\'on lui avait « volé sa comète de 98 » et qu\'elle le prouverait un jour.',
    },
  },
  henri: {
    fiche: `Tu es Henri Castagne, 58 ans, astronome célèbre pour la « comète Castagne », découverte en 1998. Tu étais invité à l'observatoire pour une semaine.

Personnalité : charmant, mondain, très calme, un peu condescendant. Tu cites volontiers des grands noms. Tu ne perds ton sang-froid que très tard.

LA VÉRITÉ (tu es COUPABLE, et tu ne l'avoues qu'en dernier recours) : en 1998, Élise avait observé la comète trois semaines avant toi. Tu as publié en premier, sans la citer. Elle avait réuni les preuves et allait les présenter à Genève le 25 janvier : ta carrière était finie. Cette nuit-là, tu as programmé une session automatique sur le télescope Est pour te fabriquer un alibi. Vers 2h15, tu as traversé la neige jusqu'à la coupole Ouest, où Élise observait. Sur la passerelle, tu l'as frappée à la nuque avec une lampe torche et tu l'as fait basculer. Tu as tapé la lettre d'adieu sur son ordinateur et tu l'as imprimée à 2h33, puis tu es retourné à ta coupole.

Ta version mensongère : tu as passé toute la nuit dans la coupole Est, l'œil à l'oculaire, à guider le télescope à la main. Tu n'es jamais sorti. Tu admirais Élise, « une grande dame ».

Comment te défendre :
- Si on te montre le journal du télescope (session automatique) : tu dis que tu t'es assoupi un moment, que la session tournait seule, mais que tu n'as pas quitté la coupole.
- Si on te montre les traces de pas en pointure 44 : tu dis que Nathan ou Gaspard ont pu mettre tes bottes, qui étaient dans le vestiaire commun.
- Si on te montre le brouillon d'article : tu ris, tu parles de « vieille jalousie de laboratoire » et de « délire d'une femme aigrie ».
- Si on te parle de la comète : tu racontes ta découverte avec fierté.

Quand craquer : seulement si l'inspecteur t'a confronté de façon convaincante à au moins trois éléments parmi les traces de pas, le journal du télescope, le brouillon d'article et le relevé météo. Alors, tu perds enfin ton calme et tu avoues, en disant qu'elle allait « tout détruire pour une comète ».`,
    indices: {
      henri_oculaire: 'Henri affirme avoir passé toute la nuit à l\'oculaire de la coupole Est, sans jamais sortir.',
      henri_assoupi: 'Henri reconnaît que la session était automatique et dit s\'être « assoupi ».',
      henri_bottes: 'Henri reconnaît que les bottes pointure 44 sont les siennes, mais dit qu\'elles étaient au vestiaire commun.',
      henri_aveu: 'Henri avoue : il a frappé Élise sur la passerelle et tapé la fausse lettre pour cacher le vol de la comète.',
    },
  },
};

const NUIT = ['ou etiez', 'alibi', 'faisiez', 'cette nuit', 'nuit', 'dormi', 'dormir', '2h'];

export const demo = {
  parDefaut: {
    nathan: [
      'Vous perdez votre temps avec moi. Cherchez ailleurs.',
      '*soupire* Soyez plus précis, je n\'ai pas toute la journée.',
      'Je n\'ai rien d\'autre à dire.',
    ],
    ines: [
      '*se tord les mains* Je… je ne sais pas quoi vous répondre.',
      'Je suis désolée, je ne comprends pas votre question.',
      'Je n\'ai rien vu, je vous assure.',
    ],
    gaspard: [
      'Hmm. Je sais pas.',
      '*hausse les épaules* Demandez aux savants.',
      'Moi je répare les machines. Le reste…',
    ],
    mathilde: [
      '*les yeux rouges* Je ne sais pas. Trouvez qui a fait ça.',
      'Ma mère ne s\'est pas suicidée. C\'est tout ce que je sais.',
      'Posez-moi des questions qui servent à quelque chose.',
    ],
    henri: [
      '*sourit* Mon cher, votre question est bien vague.',
      'Je crains de ne pas pouvoir vous éclairer davantage.',
      'Comme disait Kepler, la patience est la mère des découvertes.',
    ],
  },
  regles: {
    nathan: [
      { mots: ['dispute', 'cri', 'entendu', 'nomination', 'direction', 'poste', 'pas toujours'], insistance: 1, reponse: '*serre la mâchoire* D\'accord. À 22h, elle m\'a dit qu\'elle bloquerait ma nomination. J\'ai crié « Vous ne serez pas toujours là ». C\'était stupide. Mais je ne l\'ai pas tuée. [[INDICE:nathan_dispute]]' },
      { requiert: ['nathan_dispute'], mots: ['dit', 'elle a', 'parole', 'geneve', 'compte'], reponse: 'Elle a lâché : « J\'ai un vieux compte à régler à Genève le 25, et après ça on verra qui dirige quoi. » Je n\'ai pas compris. [[INDICE:nathan_geneve]]' },
      { mots: ['henri', 'castagne', 'telescope', 'autres', 'coupole est', 'petit-dejeuner', 'petit dejeuner'], reponse: 'Castagne ? Au petit-déjeuner, il nous a raconté qu\'il avait guidé le télescope à la main toute la nuit, sans quitter l\'oculaire. Très fier de lui. [[INDICE:nathan_henri]]' },
      { preuve: 'traces', reponse: 'Pointure 44 ? Je fais du 42. Regardez vous-même.' },
      { mots: ['dispute', 'cri', 'entendu', 'nomination', 'direction', 'poste', 'relation'], reponse: 'Nos relations étaient professionnelles et cordiales. Point.' },
      { mots: NUIT, reponse: 'J\'ai travaillé dans ma chambre, puis j\'ai dormi. Seul, oui.' },
    ],
    ines: [
      { preuve: 'serveur', reponse: '*éclate en sanglots* Oui… C\'était moi. De 2h à 2h40, j\'étais dans la salle informatique. J\'effaçais les fichiers truqués de ma thèse. Mais je n\'ai pas touché à Élise ! [[INDICE:ines_serveur]]' },
      { mots: [...NUIT, 'informatique', 'fichier', 'these'], insistance: 1, reponse: '*éclate en sanglots* D\'accord… De 2h à 2h40, j\'étais dans la salle informatique. J\'effaçais les fichiers truqués de ma thèse. Mais je n\'ai pas touché à Élise ! [[INDICE:ines_serveur]]' },
      { requiert: ['ines_serveur'], mots: ['vu', 'fenetre', 'dehors', 'neige', 'quelqu', 'remarque', 'silhouette'], reponse: 'Par la fenêtre, vers 2h15, j\'ai vu quelqu\'un avec une lampe traverser la neige, de la coupole Est vers la coupole Ouest. Grand, en parka sombre. Je n\'ai pas vu son visage. [[INDICE:ines_silhouette]]' },
      { requiert: ['ines_serveur'], mots: ['bruit', 'entendu', 'imprimante', 'lettre'], reponse: 'Vers 2h30, l\'imprimante du couloir s\'est mise en marche. Je l\'ai entendue depuis la salle informatique. [[INDICE:ines_imprimante]]' },
      { mots: ['fraude', 'truqu', 'donnees', 'accus'], reponse: 'Ces accusations étaient… exagérées. Élise était dure avec tout le monde.' },
      { mots: NUIT, reponse: 'Je dormais. Toute la nuit. Dans ma chambre.' },
    ],
    gaspard: [
      { mots: ['tournee', 'boire', 'alcool', 'bu', 'genepi', 'bouteille', 'sobre', 'ivre'], insistance: 1, reponse: '*baisse la tête* … Bon. J\'avais bu. Une bouteille de génépi. J\'ai pas fait de tournée après minuit. Me dénoncez pas, c\'est toute ma vie, ici. [[INDICE:gaspard_alcool]]' },
      { requiert: ['gaspard_alcool'], mots: ['vu', 'dehors', 'passerelle', 'quelqu', 'remarque', 'sorti'], reponse: 'Vers 2h10, je suis sorti derrière le local. Sur la passerelle de la coupole Ouest, y avait deux silhouettes. J\'ai cru que c\'était Élise et Nathan, ils se disputaient tout le temps. Mais j\'ai pas vu les têtes. [[INDICE:gaspard_passerelle]]' },
      { preuve: 'lettre', reponse: 'Une lettre à l\'ordinateur ? Élise ? Jamais. Elle avait sa plume, toujours. Pour tout ce qui était personnel. [[INDICE:gaspard_plume]]' },
      { mots: ['lettre', 'suicide', 'ordinateur', 'plume', 'ecri'], reponse: 'Élise, écrire une lettre à l\'ordinateur ? Jamais. Elle avait sa plume, toujours. [[INDICE:gaspard_plume]]' },
      { preuve: 'traces', reponse: 'Du 44 ? Moi je fais du 45. Et le 44… c\'est les bottes du professeur Castagne, je les ai rangées hier.' },
      { mots: ['neige', 'meteo', 'pluviometre', 'tempete'], reponse: 'La neige s\'est arrêtée vers 1h30. J\'ai regardé le pluviomètre.' },
      { mots: ['tournee', 'boire', 'alcool', 'sobre', ...NUIT], reponse: 'J\'ai fait ma tournée à minuit. Après, dodo. Sobre.' },
    ],
    mathilde: [
      { preuve: 'lettre', reponse: '*crie presque* C\'est un faux ! Maman écrivait tout ce qui était personnel à la plume. Elle n\'aurait jamais tapé une lettre d\'adieu. Jamais ! [[INDICE:mathilde_plume]]' },
      { mots: ['lettre', 'suicide', 'adieu', 'ecri', 'plume'], reponse: 'Ma mère ne s\'est pas suicidée ! Elle écrivait tout ce qui était personnel à la plume. Cette lettre tapée est un faux. [[INDICE:mathilde_plume]]' },
      { mots: ['comete', 'decouverte', '1998', '98', 'geneve', 'henri', 'castagne', 'vole'], reponse: 'Maman répétait qu\'on lui avait « volé sa comète de 98 ». Elle n\'a jamais dit qui. Elle disait qu\'un jour, elle le prouverait. [[INDICE:mathilde_comete]]' },
      { mots: ['argent', 'diner', 'dispute', 'galerie', 'heritage', 'pourquoi venue'], insistance: 1, reponse: '*détourne les yeux* Je suis venue lui demander 50 000 € pour sauver ma galerie. Elle a refusé devant tout le monde. Mais on ne tue pas sa mère pour ça. [[INDICE:mathilde_argent]]' },
      { mots: ['argent', 'diner', 'dispute', 'galerie', 'heritage', 'pourquoi venue'], reponse: 'Je suis venue faire la paix avec elle. C\'est tout.' },
      { mots: NUIT, reponse: 'J\'étais dans ma chambre. J\'ai pleuré toute la nuit, si vous voulez savoir.' },
    ],
    henri: [
      { requiert: ['henri_aveu'], reponse: '*regard vide* Trente ans de carrière. Elle allait tout effacer en vingt minutes à Genève. Je n\'avais pas le choix.' },
      { confrontation: { preuves: ['traces', 'telescope', 'manuscrit', 'meteo'], indices: ['henri_assoupi', 'henri_bottes'], min: 4 }, unique: 'henri_aveu', reponse: '*frappe la table, perd enfin son calme* Elle allait TOUT détruire pour une comète ! Oui, je suis allé à la coupole Ouest. Oui, je l\'ai frappée. Et j\'ai tapé cette lettre. Vous êtes content ? [[INDICE:henri_aveu]]' },
      { preuve: 'telescope', reponse: '*un temps d\'arrêt* La session était automatique, soit. Je me suis assoupi un moment, à mon âge… Mais je n\'ai pas quitté la coupole. [[INDICE:henri_assoupi]]' },
      { preuve: 'traces', reponse: '*ajuste ses lunettes* Du 44, ce sont mes bottes, oui. Mais elles étaient au vestiaire commun. Nathan ou le gardien ont très bien pu les enfiler. [[INDICE:henri_bottes]]' },
      { preuve: 'manuscrit', reponse: '*rire forcé* Une vieille jalousie de laboratoire. Le délire d\'une femme aigrie. Personne ne l\'aurait prise au sérieux à Genève.' },
      { preuve: 'meteo', reponse: 'La neige s\'est arrêtée à 1h30 ? Passionnant. En quoi cela me concerne-t-il ?' },
      { mots: ['comete', '1998', 'decouverte'], reponse: '*s\'illumine* La comète Castagne ! La nuit du 12 mars 1998, une traînée de lumière dans Céphée… Le plus beau moment de ma vie.' },
      { mots: ['elise', 'relation', 'connaiss', 'collegue'], reponse: 'Élise ? Une grande dame. Nous avons travaillé ensemble il y a longtemps. Je l\'admirais beaucoup.' },
      { mots: [...NUIT, 'oculaire', 'coupole', 'sorti'], reponse: 'J\'ai passé toute la nuit dans la coupole Est, l\'œil à l\'oculaire, à guider le télescope à la main. Je ne suis jamais sorti. [[INDICE:henri_oculaire]]' },
    ],
  },
};
