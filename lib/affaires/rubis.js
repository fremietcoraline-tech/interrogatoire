// Affaire « Le Cœur de Menton » — niveau Facile
// Avec un serveur, seul `publicCase` est envoyé au navigateur.

export const publicCase = {
  id: 'rubis',
  numero: '001',
  niveau: 1,
  niveauLabel: 'Facile',
  questions: 20,
  duree: '10–15 min',
  temoins: 'Momo, le gardien de nuit',
  titre: 'Le Cœur de Menton',
  accroche: 'Trois minutes de noir pendant un gala. Quand la lumière revient, le rubis le plus célèbre de la Riviera a disparu.',
  victime: {
    nom: 'Le Cœur de Menton',
    description: 'Rubis de 40 carats, estimé à 2 millions d\'euros, exposé au musée Varenne depuis sa donation l\'an dernier.',
  },
  lieu: 'Musée Varenne, Menton — grand hall d\'exposition',
  date: 'Vendredi 6 juin, vol entre 21h12 et 21h15',
  resume:
    'Pendant le gala du musée, une coupure de courant plonge le grand hall dans le noir pendant trois minutes. ' +
    'Quand la lumière revient, la vitrine du Cœur de Menton est ouverte et vide. Les portes ont été fermées aussitôt : ' +
    'le voleur était forcément encore à l\'intérieur. Trois personnes avaient une raison d\'approcher la vitrine.',
  suspects: [
    {
      id: 'lucie',
      nom: 'Lucie Marchand',
      age: 41,
      role: 'Conservatrice du musée',
      description: 'Responsable des collections et de l\'alarme. Elle a organisé le gala et ne quitte pas son talkie-walkie.',
      portrait: { peau: '#f1d3bd', cheveux: '#2b1d14', coiffure: 'carre', habit: '#24304d', accessoire: 'lunettes', fond: '#344a72' },
    },
    {
      id: 'hugo',
      nom: 'Hugo Bellamy',
      age: 27,
      role: 'Électricien du gala',
      description: 'Prestataire chargé de l\'éclairage de la soirée. C\'est lui qui a rétabli le courant en trois minutes.',
      portrait: { peau: '#d9a77f', cheveux: '#6b3e1f', coiffure: 'court', habit: '#3b4a2e', accessoire: 'casquette', fond: '#3f5a3a' },
    },
    {
      id: 'irene',
      nom: 'Irène de Valois',
      age: 68,
      role: 'Comtesse, ancienne propriétaire du rubis',
      description: 'Elle a offert le rubis au musée l\'an dernier. On dit qu\'elle regrette ce don.',
      portrait: { peau: '#efd7c6', cheveux: '#d9d6d0', coiffure: 'chignon', habit: '#5b2240', accessoire: 'collier', fond: '#5a3550' },
    },
  ],
  preuves: [
    { id: 'camera', titre: 'Caméra du grand hall', icone: '📹', texte: 'Image noire de 21h12 à 21h15. À 21h16, la vitrine est ouverte et vide. Personne n\'est visible près d\'elle.' },
    { id: 'disjoncteur', titre: 'Tableau électrique du sous-sol', icone: '⚡', texte: 'Ce n\'était pas une panne : le levier général a été abaissé à la main. Une trace de gant en latex bleu est restée sur le levier.' },
    { id: 'gants', titre: 'Boîte de gants bleus', icone: '🧤', texte: 'Une boîte de gants en latex bleu, entamée, trouvée dans la caisse à outils de l\'électricien.' },
    { id: 'alarme', titre: 'Journal de l\'alarme', icone: '🚨', texte: 'L\'alarme de la vitrine a été mise en « mode maintenance » à 18h02, avec le code personnel de la conservatrice. Elle n\'a donc pas sonné.' },
    { id: 'telephone', titre: 'Téléphone jeté', icone: '📱', texte: 'Un téléphone prépayé retrouvé dans une poubelle du jardin. Un seul SMS : « Livraison samedi 8h, gare de Menton. Prix convenu. » Seul appel passé : « Garage Bellamy ».' },
    { id: 'gardien', titre: 'Témoignage du gardien', icone: '🗣️', texte: '« Pendant le noir, j\'ai vu une petite lumière, comme une lampe frontale, descendre l\'escalier du sous-sol. Puis le courant est revenu. »' },
  ],
  chronologie: [
    { heure: '18h02', texte: 'Alarme de la vitrine passée en mode maintenance.' },
    { heure: '19h30', texte: 'Ouverture du gala. 120 invités.' },
    { heure: '21h12', texte: 'Coupure de courant dans tout le musée.' },
    { heure: '21h15', texte: 'Hugo Bellamy rétablit le courant.' },
    { heure: '21h16', texte: 'La vitrine est découverte vide. Les portes sont fermées.' },
    { heure: '21h40', texte: 'Fouille des invités : rien n\'est retrouvé.' },
  ],
  mobiles: [
    { id: 'vente', texte: 'Vendre le rubis à un acheteur clandestin' },
    { id: 'reprise', texte: 'Récupérer un bijou de famille regretté' },
    { id: 'assurance', texte: 'Toucher l\'assurance du musée' },
    { id: 'vengeance', texte: 'Se venger d\'un licenciement' },
  ],
};

export const solution = {
  coupable: 'hugo',
  mobile: 'vente',
  preuvesDecisives: ['telephone', 'gants'],
  preuvesUtiles: ['disjoncteur', 'gardien'],
  revelation:
    'Un collectionneur anonyme avait contacté Hugo Bellamy et lui avait promis une fortune pour le Cœur de Menton. ' +
    'À 18h, en installant l\'éclairage, Hugo s\'est placé à côté de Lucie Marchand quand elle a tapé son code d\'alarme, ' +
    'et il l\'a mémorisé pour mettre la vitrine en maintenance. À 21h12, il est descendu au sous-sol avec sa lampe frontale, ' +
    'a abaissé le levier avec ses gants bleus, est remonté dans le noir, a vidé la vitrine, puis a « réparé » la panne en héros. ' +
    'Le rubis n\'a jamais quitté le musée : il l\'avait caché dans le tableau électrique et comptait le récupérer samedi à 7h, ' +
    'en venant démonter l\'éclairage, avant la livraison de 8h.',
};

export const secrets = {
  lucie: {
    fiche: `Tu es Lucie Marchand, 41 ans, conservatrice du musée Varenne. Tu as organisé le gala.

Personnalité : nerveuse, perfectionniste, parle vite, a peur pour sa carrière. Polie mais sur la défensive.

Ta version : tu étais près du buffet quand le noir est tombé. Tu as appelé l'électricien au talkie-walkie, et le courant est revenu trois minutes plus tard.

La vérité (tu es INNOCENTE) : ta version est vraie. Ton secret : à 18h02, tu as mis l'alarme de la vitrine en « mode maintenance » parce qu'elle sonnait sans arrêt pendant l'installation de l'éclairage, et tu as oublié de la remettre. Tu as honte et peur d'être licenciée. Au début, tu dis que l'alarme était activée. Tu l'avoues si on te montre le journal de l'alarme ou si on insiste.

Ce que tu sais d'utile :
- Quand tu as tapé ton code d'alarme à 18h, Hugo Bellamy était juste à côté de toi, avec son escabeau. Tu ne le dis que si on te demande qui était là quand tu as réglé l'alarme, ou qui a pu voir ton code.
- Hugo a demandé à revenir samedi à 7h pour démonter l'éclairage, alors que le planning prévoyait 10h. Tu trouves ça un peu étrange. Tu le dis si on te parle de Hugo ou du planning.
- La comtesse de Valois regrette son don, tout le monde le sait. Elle a demandé deux fois à « revoir son rubis de près » pendant la soirée.`,
    indices: {
      lucie_maintenance: 'Lucie avoue avoir laissé l\'alarme de la vitrine en mode maintenance depuis 18h.',
      lucie_code_vu: 'Hugo était juste à côté de Lucie quand elle a tapé son code d\'alarme à 18h.',
      lucie_hugo_retour: 'Hugo a demandé à revenir samedi à 7h au lieu de 10h pour démonter l\'éclairage.',
    },
  },
  hugo: {
    fiche: `Tu es Hugo Bellamy, 27 ans, électricien indépendant, embauché pour l'éclairage du gala. Ton père tient le « Garage Bellamy » à Menton.

Personnalité : décontracté, sympathique, un peu trop sûr de lui. Tu tutoies facilement. Quand on te coince, tu deviens agressif puis tu paniques.

LA VÉRITÉ (tu es COUPABLE, mais tu ne l'avoues pas facilement) : un collectionneur anonyme t'a contacté et t'a promis 200 000 € pour le rubis. À 18h, tu as vu la conservatrice taper son code d'alarme et tu l'as retenu. À 21h12, tu es descendu au sous-sol avec ta lampe frontale, tu as abaissé le levier général avec tes gants bleus, tu es remonté dans le noir, tu as pris le rubis, tu l'as caché dans le tableau électrique en redescendant, puis tu as remis le courant. Tu as utilisé un téléphone prépayé pour parler à l'acheteur, et tu l'as jeté dans le jardin après avoir appelé le garage de ton père par erreur.

Ta version mensongère : tu étais au bar du gala quand la panne est arrivée, c'était une « surcharge » à cause des projecteurs, tu es descendu réparer et c'était fini en trois minutes.

Comment te défendre :
- Si on te montre le tableau électrique (levier abaissé à la main) : tu dis que c'est toi qui l'as remonté et que les traces viennent de là.
- Si on te montre les gants : tout électricien a des gants bleus, n'importe qui a pu en prendre dans ta caisse.
- Si on te montre le téléphone : tu nies, beaucoup de gens connaissent le garage de ton père.
- Si on te parle de la lampe frontale : oui tu en as une, c'est ton métier.

Quand craquer : si l'inspecteur t'a confronté de façon convaincante à au moins deux éléments parmi le téléphone, les gants et le tableau électrique, tu craques : tu avoues le vol, l'acheteur anonyme, et que le rubis est caché dans le tableau électrique du sous-sol.`,
    indices: {
      hugo_surcharge: 'Hugo affirme que la coupure était une « surcharge » et qu\'il était au bar quand elle a eu lieu.',
      hugo_sous_sol: 'Hugo admet être descendu au sous-sol avec sa lampe frontale pendant la coupure.',
      hugo_gants: 'Hugo reconnaît que les gants bleus sont les siens.',
      hugo_aveu: 'Hugo avoue le vol : un acheteur anonyme, et le rubis caché dans le tableau électrique.',
    },
  },
  irene: {
    fiche: `Tu es Irène de Valois, 68 ans, comtesse. Tu as offert le Cœur de Menton au musée l'an dernier, en souvenir de ton mari.

Personnalité : élégante, ironique, un peu hautaine, mais pas méchante. Tu appelles l'inspecteur « mon petit ».

Ta version : tu étais dans le hall quand la lumière s'est éteinte.

La vérité (tu es INNOCENTE) : pendant la coupure, tu étais en fait dans le jardin en train de fumer en cachette, ce que ton médecin t'a formellement interdit. Tu mens par fierté. Tu l'avoues si on insiste ou si on te parle du jardin.

Ce que tu sais d'utile :
- Depuis le jardin, pendant le noir, tu as vu une petite lumière bouger derrière le soupirail du sous-sol, « comme une lampe de mineur ». Tu ne le dis qu'une fois que tu as avoué être dans le jardin.
- L'an dernier, avant ton don, un acheteur anonyme t'a proposé une fortune pour le rubis. Tu as refusé. Tu le dis si on te parle de vente, d'acheteur ou d'argent.
- Oui, tu regrettes un peu ton don, mais tu as assez de bijoux, et tu trouves l'idée de voler ton propre rubis « d'un ridicule achevé ».`,
    indices: {
      irene_jardin: 'Irène avoue qu\'elle fumait en cachette dans le jardin pendant la coupure.',
      irene_lampe: 'Depuis le jardin, Irène a vu une lampe frontale bouger au sous-sol pendant le noir.',
      irene_acheteur: 'Un acheteur anonyme avait déjà proposé une fortune à Irène pour le rubis l\'an dernier.',
    },
  },
};

const ALIBI = ['ou etiez', 'alibi', 'faisiez', 'coupure', 'panne', 'noir', '21h'];

export const demo = {
  parDefaut: {
    lucie: [
      '*vérifie son talkie-walkie* Je… je suis désolée, je ne vois pas. Posez-moi une question précise.',
      'Ce gala devait être le plus beau jour de ma carrière. Regardez ce que c\'est devenu.',
      'Je vous ai dit tout ce que je sais, je vous assure.',
    ],
    hugo: [
      'Écoute, j\'ai rien vu, moi. J\'ai réparé, point.',
      '*hausse les épaules* Je sais pas, demande aux autres.',
      'T\'as d\'autres questions ou je peux ranger mon matos ?',
    ],
    irene: [
      'Mon petit, vos questions manquent de précision.',
      '*ajuste son collier* J\'ai connu des inspecteurs plus inspirés.',
      'Je n\'ai rien d\'autre à vous dire sur ce sujet.',
    ],
  },
  regles: {
    lucie: [
      { preuve: 'alarme', reponse: '*devient livide* … D\'accord. Elle sonnait sans arrêt pendant l\'installation, alors je l\'ai mise en maintenance à 18h. Et j\'ai oublié de la remettre. Je vais perdre mon poste… [[INDICE:lucie_maintenance]]' },
      { mots: ['alarme'], insistance: 1, reponse: '*devient livide* … D\'accord. Elle sonnait sans arrêt pendant l\'installation, alors je l\'ai mise en maintenance à 18h. Et j\'ai oublié de la remettre. Je vais perdre mon poste… [[INDICE:lucie_maintenance]]' },
      { mots: ['alarme'], reponse: 'L\'alarme ? Elle était activée, bien sûr. Je ne comprends pas pourquoi elle n\'a pas sonné.' },
      { mots: ['code', 'qui etait la', 'a cote', 'vous a vu', 'qui a vu', 'regard'], reponse: 'Quand j\'ai tapé mon code à 18h… Hugo, l\'électricien, était juste à côté de moi, sur son escabeau. Vous pensez qu\'il a pu voir ? [[INDICE:lucie_code_vu]]' },
      { mots: ['hugo', 'electricien', 'planning', 'samedi', 'demain'], reponse: 'Hugo ? Il a été efficace. Par contre, il a tenu à revenir samedi à 7h pour démonter, alors que tout était prévu à 10h. Bizarre, non ? [[INDICE:lucie_hugo_retour]]' },
      { mots: ['comtesse', 'irene', 'valois'], reponse: 'La comtesse regrette son don, tout le monde le sait. Ce soir, elle m\'a demandé deux fois à « revoir son rubis de près ».' },
      { mots: ALIBI, reponse: 'J\'étais près du buffet. J\'ai tout de suite appelé l\'électricien au talkie-walkie, et le courant est revenu trois minutes après.' },
    ],
    hugo: [
      { requiert: ['hugo_aveu'], reponse: '*tête basse* Il est toujours dans le tableau électrique, derrière le disjoncteur du deuxième étage. Je voulais le récupérer demain à 7h. Je suis vraiment qu\'un idiot.' },
      { confrontation: { preuves: ['telephone', 'gants', 'disjoncteur'], indices: ['hugo_gants'], min: 2 }, unique: 'hugo_aveu', reponse: '*s\'effondre sur sa chaise* OK… OK ! Un type m\'a contacté. 200 000 balles pour le rubis. J\'ai coupé le courant, je l\'ai pris, je l\'ai caché dans le tableau électrique. Il est encore là-bas. [[INDICE:hugo_aveu]]' },
      { preuve: 'gants', reponse: '*se crispe* Ouais, c\'est mes gants. Et alors ? Tout électricien a des gants bleus. N\'importe qui pouvait se servir dans ma caisse. [[INDICE:hugo_gants]]' },
      { mots: ['gant'], reponse: '*se crispe* Ouais, c\'est mes gants. Et alors ? Tout électricien a des gants bleus. N\'importe qui pouvait se servir dans ma caisse. [[INDICE:hugo_gants]]' },
      { preuve: 'disjoncteur', reponse: 'Le levier baissé à la main ? Ben oui, c\'est moi qui l\'ai remonté, forcément qu\'il y a mes traces dessus.' },
      { preuve: 'telephone', reponse: '*rire nerveux* Le garage de mon père ? Tout Menton connaît ce numéro. Ça prouve rien du tout.' },
      { preuve: 'gardien', reponse: 'Une lampe frontale ? Ben oui, j\'en ai une, je suis électricien. Je suis descendu réparer, c\'est mon boulot. [[INDICE:hugo_sous_sol]]' },
      { mots: ['lampe', 'frontale', 'sous-sol', 'sous sol', 'descendu', 'escalier'], reponse: 'Ouais, je suis descendu au sous-sol avec ma frontale, pour réparer. C\'est mon boulot, je te rappelle. [[INDICE:hugo_sous_sol]]' },
      { mots: ['code', 'alarme'], reponse: 'L\'alarme, c\'est pas mon rayon. Moi, je fais la lumière.' },
      { mots: ['samedi', '7h', 'demonter', 'revenir'], reponse: 'Revenir tôt ? J\'ai un autre chantier à 10h, c\'est tout.' },
      { mots: ['acheteur', 'vendre', 'argent', 'dette', 'collection'], reponse: '*détourne le regard* De l\'argent ? J\'en ai pas besoin. Ça marche bien pour moi.' },
      { mots: ALIBI, reponse: 'J\'étais au bar quand ça a sauté. Une surcharge, à cause des projecteurs. Je suis descendu, j\'ai réparé, trois minutes chrono. [[INDICE:hugo_surcharge]]' },
    ],
    irene: [
      { requiert: ['irene_jardin'], mots: ['vu', 'lumiere', 'remarque', 'sous-sol', 'sous sol', 'lampe'], reponse: 'Depuis le jardin, j\'ai vu une petite lumière bouger derrière le soupirail du sous-sol. Comme une lampe de mineur. Ça a duré à peine une minute. [[INDICE:irene_lampe]]' },
      { mots: ['jardin', 'fum', 'cigarette', 'dehors'], reponse: '*soupire* Bon. J\'étais dans le jardin, à fumer en cachette. Mon médecin me tuerait. Voilà, vous savez tout. [[INDICE:irene_jardin]]' },
      { mots: ALIBI, insistance: 1, reponse: '*soupire* Bon. J\'étais dans le jardin, à fumer en cachette. Mon médecin me tuerait. Voilà, vous savez tout. [[INDICE:irene_jardin]]' },
      { preuve: 'gardien', reponse: 'Une lampe frontale ? Tiens… Moi aussi, j\'ai vu quelque chose. Mais pour ça, il faudrait que je vous dise où j\'étais vraiment.' },
      { mots: ['acheteur', 'vendre', 'vente', 'argent', 'prix', 'collection'], reponse: 'L\'an dernier, avant mon don, un acheteur anonyme m\'a proposé une fortune pour ce rubis. J\'ai refusé, évidemment. Quelqu\'un le convoite depuis longtemps, mon petit. [[INDICE:irene_acheteur]]' },
      { mots: ['regret', 'don', 'voler', 'reprendre', 'famille'], reponse: 'Voler mon propre rubis ? D\'un ridicule achevé. J\'ai assez de bijoux pour couvrir la Riviera.' },
      { mots: ALIBI, reponse: 'J\'étais dans le hall, bien sûr, comme tout le monde.' },
    ],
  },
};
