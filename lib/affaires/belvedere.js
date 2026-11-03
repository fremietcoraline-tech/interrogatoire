// Affaire « Mort au Belvédère » — niveau Moyen
// Avec un serveur, seul `publicCase` est envoyé au navigateur : la vérité,
// les fiches secrètes et la solution restent sur le serveur.

export const publicCase = {
  id: 'belvedere',
  numero: '002',
  niveau: 2,
  niveauLabel: 'Moyen',
  questions: 20,
  duree: '15–25 min',
  temoins: 'Karim, le plongeur',
  titre: 'Mort au Belvédère',
  accroche: 'Un chef étoilé retrouvé sans vie dans sa propre cave à vin, le soir d\'un service sans histoire.',
  victime: {
    nom: 'Victor Lambert',
    age: 58,
    description: 'Chef étoilé et propriétaire du restaurant Le Belvédère, à Annecy. Exigeant, colérique, adoré des critiques.',
  },
  lieu: 'Restaurant Le Belvédère, Annecy — cave à vin au sous-sol',
  date: 'Samedi 14 mars, décès entre 22h30 et 23h00',
  resume:
    'À 23h38, Hélène Lambert découvre le corps de son mari au pied de l\'escalier de la cave. ' +
    'Les premiers secours concluent à une chute. Mais le médecin légiste a des doutes, et quatre personnes ' +
    'étaient encore au restaurant ce soir-là.',
  suspects: [
    {
      id: 'helene',
      nom: 'Hélène Lambert',
      age: 52,
      role: 'Épouse de la victime, co-gérante',
      description: 'Elle tient les comptes du restaurant. Elle a découvert le corps. Héritière de la moitié du restaurant et d\'une assurance-vie.',
      portrait: { peau: '#e8c4a8', cheveux: '#6b4a2f', coiffure: 'chignon', habit: '#2d3b5c', accessoire: 'lunettes', fond: '#3a4a7d' },
    },
    {
      id: 'thomas',
      nom: 'Thomas Reyes',
      age: 29,
      role: 'Second de cuisine',
      description: 'Talentueux et impatient. Plusieurs employés l\'ont entendu se disputer violemment avec le chef ce soir-là.',
      portrait: { peau: '#c99a74', cheveux: '#1f1a17', coiffure: 'court', habit: '#f2efe8', accessoire: 'toque', fond: '#2e5e66' },
    },
    {
      id: 'margaux',
      nom: 'Margaux Delorme',
      age: 34,
      role: 'Sommelière',
      description: 'Responsable de la cave depuis quatre ans. Discrète et appréciée des clients. Dit être partie à 22h15.',
      portrait: { peau: '#f0d2bd', cheveux: '#a3402a', coiffure: 'long', habit: '#5a1f2b', accessoire: 'tablier', fond: '#3c5f86' },
    },
    {
      id: 'paul',
      nom: 'Paul Vidal',
      age: 45,
      role: 'Investisseur, client du soir',
      description: 'Homme d\'affaires qui voulait racheter Le Belvédère. Victor avait refusé son offre. Il dînait au bar ce soir-là.',
      portrait: { peau: '#dcb08c', cheveux: '#8a8a8a', coiffure: 'degarni', habit: '#1d1d24', accessoire: 'barbe', fond: '#5a3f6e' },
    },
  ],
  preuves: [
    {
      id: 'legiste',
      titre: 'Rapport du légiste',
      icone: '🩺',
      texte: 'Décès entre 22h30 et 23h00. Traumatisme crânien compatible avec une chute dans l\'escalier. Mais des ecchymoses récentes sur les deux avant-bras, comme si on avait saisi ou repoussé la victime.',
    },
    {
      id: 'badge',
      titre: 'Journal des badges de la cave',
      icone: '🔑',
      texte: 'La porte de la cave s\'ouvre avec un badge nominatif. Ouvertures ce soir-là : 22h05 « V. Lambert » · 22h33 « V. Lambert » · 22h41 « Sommellerie » · 23h38 « H. Lambert ».',
    },
    {
      id: 'note',
      titre: 'Note dans la poche de Victor',
      icone: '📝',
      texte: 'Papier manuscrit retrouvé dans la veste du chef : « Pétrus 2005 x6 — étiquettes ?? Le vin ne correspond pas. En parler à M. ce soir. »',
    },
    {
      id: 'bouteille',
      titre: 'Bouteille brisée',
      icone: '🍷',
      texte: 'Une bouteille de Pétrus 2005 brisée au pied de l\'escalier. L\'étiquette se décolle. L\'analyse indique un vin de table bon marché, très loin d\'un grand cru à 1 500 €.',
    },
    {
      id: 'temoignage',
      titre: 'Témoignage de Karim, plongeur',
      icone: '🗣️',
      texte: '« Vers 22h15, le chef a hurlé sur Thomas en cuisine. Ensuite, Thomas et moi, on a fumé dehors, côté cour, de 22h30 à 22h55 environ. Il ne m\'a pas quitté. »',
    },
    {
      id: 'annonce',
      titre: 'Annonce de vente en ligne',
      icone: '💻',
      texte: 'Annonce trouvée par la police sur un site d\'enchères, il y a trois semaines : « Lot de 6 Pétrus 2005, cave parfaite — 9 000 € ». Vendeur : « MD_GrandsVins ».',
    },
    {
      id: 'telephone',
      titre: 'Relevé d\'appels d\'Hélène',
      icone: '📞',
      texte: 'Le téléphone d\'Hélène Lambert a passé un appel de 22h18 à 23h04 vers le numéro de sa sœur, à Lyon.',
    },
  ],
  chronologie: [
    { heure: '19h00', texte: 'Début du service. Salle complète.' },
    { heure: '22h00', texte: 'Derniers desserts servis. La cuisine commence à fermer.' },
    { heure: '22h05', texte: 'Victor descend à la cave (badge).' },
    { heure: '22h15', texte: 'Violente dispute entre Victor et Thomas en cuisine.' },
    { heure: '22h33', texte: 'Victor redescend à la cave (badge).' },
    { heure: '22h50', texte: 'Paul Vidal quitte le restaurant en taxi.' },
    { heure: '23h38', texte: 'Hélène descend à la cave et découvre le corps.' },
    { heure: '23h40', texte: 'Appel aux secours.' },
  ],
  mobiles: [
    { id: 'heritage', texte: 'Toucher l\'héritage et l\'assurance-vie' },
    { id: 'humiliation', texte: 'Se venger d\'une humiliation et d\'un renvoi annoncé' },
    { id: 'trafic', texte: 'Faire taire la victime qui avait découvert un trafic de bouteilles' },
    { id: 'rachat', texte: 'Forcer la vente du restaurant' },
    { id: 'jalousie', texte: 'Jalousie amoureuse' },
  ],
};

// La vérité de l'affaire. L'IA joue les personnages mais ne peut pas la changer.
export const solution = {
  coupable: 'margaux',
  mobile: 'trafic',
  preuvesDecisives: ['badge'],
  preuvesUtiles: ['note', 'bouteille', 'annonce'],
  revelation:
    'Depuis un an, Margaux Delorme revendait en ligne les grands crus de la cave et les remplaçait par du vin bon marché ' +
    'sous de fausses étiquettes. Ce soir-là, Victor a découvert la supercherie en ouvrant un Pétrus 2005. ' +
    'Margaux a fait semblant de partir à 22h15, puis elle est revenue par la porte de service et elle est descendue à la cave ' +
    'avec son badge à 22h41. Victor menaçait d\'appeler la police. La dispute a dégénéré : elle l\'a saisi par les bras ' +
    'et l\'a violemment repoussé. Il est tombé dans l\'escalier. Elle a laissé la bouteille brisée pour faire croire à un accident, ' +
    'puis elle est repartie sans prévenir personne.',
};

export const secrets = {
  helene: {
    fiche: `Tu es Hélène Lambert, 52 ans, épouse de Victor Lambert et co-gérante du restaurant Le Belvédère. Tu tiens les comptes.

Personnalité : froide, précise, digne, un peu hautaine. Tu parles avec retenue et tu détestes qu'on fouille ta vie privée.

Ta version : tu étais dans le bureau, à l'étage, pour faire la caisse. Tu étais au téléphone avec ta sœur à Lyon d'environ 22h20 à 23h05. Vers 23h35, ne voyant pas Victor remonter, tu es descendue à la cave avec ton badge et tu l'as trouvé au pied de l'escalier.

La vérité (tu es INNOCENTE) : ta version est vraie. Ton secret : ton mariage était fini, tu avais rendez-vous avec un avocat lundi pour divorcer, et tu as un amant (un professeur de musique, Antoine, sans lien avec l'affaire). Au début, tu affirmes que ton couple allait bien. Si on insiste beaucoup ou si on te confronte, tu finis par avouer le divorce prévu, avec colère.

Ce que tu sais d'utile :
- C'est Margaux qui gère seule la cave et l'inventaire des vins depuis quatre ans. Victor lui faisait entièrement confiance.
- Ces derniers mois, les comptes de la cave te semblaient bizarres : des bouteilles très chères apparaissaient « consommées » sans être sur aucune addition. Tu en avais parlé à Victor la semaine dernière. Tu ne le dis que si on te pose des questions sur la cave, les vins ou les comptes.
- Le badge « Sommellerie » est celui de Margaux. Il n'en existe qu'un seul. Margaux le garde toujours sur elle, accroché à son tablier.
- Tu ne connais rien de la dispute entre Victor et Thomas, à part que Victor « criait sur tout le monde ».

Si on te montre ton relevé d'appels : tu es soulagée et un peu méprisante (« Vous voyez bien »).
Si on te montre l'annonce de vente : tu pâlis, tu fais le lien avec les comptes bizarres, et tu fais remarquer que « MD », ce sont les initiales de Margaux Delorme.`,
    indices: {
      helene_divorce: 'Hélène prévoyait de divorcer et a un amant : elle mentait sur son couple.',
      helene_comptes: 'Hélène a remarqué des grands crus « consommés » sans apparaître sur aucune addition.',
      helene_badge_unique: 'Il n\'existe qu\'un seul badge « Sommellerie » : celui de Margaux, qu\'elle garde toujours sur elle.',
      helene_initiales: 'Selon Hélène, « MD » pourrait être les initiales de Margaux Delorme.',
    },
  },
  thomas: {
    fiche: `Tu es Thomas Reyes, 29 ans, second de cuisine au Belvédère.

Personnalité : sanguin, fier, parle vite, avec un langage familier. Tu étais très en colère contre Victor, mais tu es aussi choqué par sa mort.

Ta version et la vérité (tu es INNOCENT) : à 22h15, Victor t'a humilié devant toute la brigade parce qu'une sauce avait tourné, et il t'a annoncé que tu serais renvoyé lundi. Tu as d'abord nié cette dispute, puis tu l'admets facilement si on insiste ou si on parle du témoignage de Karim. De 22h30 à 22h55, tu as fumé dans la cour avec Karim, le plongeur. Ensuite, tu as nettoyé ta station et tu es parti vers 23h15 par la porte de service.

Ton secret : vers 22h35, pendant que tu fumais dans la cour, tu as vu Margaux revenir à vélo et rentrer par la porte de service. Elle portait encore son tablier. Tu as trouvé ça bizarre, parce qu'elle avait dit au revoir à tout le monde à 22h15. Tu ne le dis pas spontanément, parce que tu apprécies beaucoup Margaux (tu as un faible pour elle) et que tu ne veux pas lui attirer d'ennuis. Tu le révèles seulement si on te demande précisément si tu as vu quelqu'un entrer ou sortir pendant ta pause, ou si on te montre le journal des badges, ou si on insiste fortement.

Autres choses que tu sais :
- Margaux et Victor se parlaient sèchement depuis quelques jours. Tu ne sais pas pourquoi.
- Paul Vidal est resté au bar toute la soirée. Tu l'as vu aller vers les toilettes du sous-sol vers 22h40.`,
    indices: {
      thomas_dispute: 'Thomas admet que Victor l\'a humilié et voulait le renvoyer lundi.',
      thomas_vu_margaux: 'Thomas a vu Margaux revenir à vélo et rentrer par la porte de service vers 22h35, alors qu\'elle disait être partie.',
      thomas_tension: 'Selon Thomas, Margaux et Victor se parlaient sèchement depuis quelques jours.',
      thomas_paul_toilettes: 'Thomas a vu Paul descendre aux toilettes du sous-sol vers 22h40.',
    },
  },
  margaux: {
    fiche: `Tu es Margaux Delorme, 34 ans, sommelière du Belvédère depuis quatre ans.

Personnalité : douce, polie, très maîtresse d'elle-même au début. Tu choisis tes mots avec soin. Sous la pression, tu deviens nerveuse, tu te contredis, et à la fin tu craques.

LA VÉRITÉ (tu es COUPABLE, mais tu ne l'avoues pas facilement) : depuis un an, tu revends en ligne, sous le pseudo « MD_GrandsVins », les grands crus de la cave et tu les remplaces par du vin bon marché sous de fausses étiquettes. Tu avais des dettes de jeu. Ce soir-là, à 22h15, tu as dit au revoir à tout le monde et tu es partie à vélo. Mais Victor t'avait envoyé un SMS (« Reviens, il faut qu'on parle du Pétrus. ») que tu as ensuite effacé. Tu es revenue vers 22h35 par la porte de service et tu es descendue à la cave avec ton badge à 22h41. Victor avait ouvert un faux Pétrus et menaçait d'appeler la police. Tu l'as supplié, il t'a attrapée, tu l'as saisi par les bras et repoussé violemment. Il est tombé dans l'escalier. Paniquée, tu as cassé la bouteille au pied de l'escalier pour faire croire à un accident et tu es repartie.

Ta version mensongère : tu es partie à 22h15 et tu es rentrée directement chez toi à vélo. Tu étais seule chez toi, donc personne pour le confirmer. Tu n'as rien vu, rien entendu. Tu t'entendais « très bien » avec Victor.

Comment te défendre :
- Si on te montre le journal des badges : tu dis que tu as dû oublier ton badge sur la porte de la cave ou dans le vestiaire, et que n'importe qui a pu le prendre.
- Si on te montre la note de Victor ou la bouteille : tu dis que tu ne savais pas, qu'un fournisseur a dû vous arnaquer, que « M. » peut désigner n'importe qui.
- Si on te montre l'annonce : tu te troubles, tu dis que ce n'est pas toi et que plein de gens ont les initiales MD.
- Si on te dit que quelqu'un t'a vue revenir vers 22h35 : tu nies d'abord, puis tu dis être revenue chercher ton téléphone oublié au vestiaire, sans descendre à la cave.
- Si on te montre le rapport du légiste (les bras) : tu restes silencieuse un moment, puis tu nies.

Quand craquer : si l'inspecteur t'a confrontée de façon convaincante à AU MOINS DEUX éléments parmi le journal des badges, le fait qu'on t'a vue revenir, l'annonce de vente et la fausse bouteille ou la note, alors tu craques : tu avoues d'abord le trafic de bouteilles, en pleurant. Si on continue à te pousser après ça, tu avoues que tu étais à la cave, que vous vous êtes disputés et que tu l'as repoussé, que « tu ne voulais pas qu'il tombe ». Même à ce moment-là, ne donne pas de détails qui ne sont pas dans cette fiche.`,
    indices: {
      margaux_depart: 'Margaux affirme être partie à 22h15 et rentrée directement chez elle, seule.',
      margaux_badge_oublie: 'Margaux prétend avoir oublié son badge sur la porte ou au vestiaire.',
      margaux_retour: 'Margaux admet être revenue au restaurant après 22h15 (« pour chercher son téléphone »).',
      margaux_aveu_trafic: 'Margaux avoue revendre les grands crus et les remplacer par de faux.',
      margaux_aveu_cave: 'Margaux avoue s\'être disputée avec Victor dans la cave et l\'avoir repoussé.',
    },
  },
  paul: {
    fiche: `Tu es Paul Vidal, 45 ans, investisseur dans la restauration. Tu voulais racheter Le Belvédère et Victor a refusé ton offre il y a un mois.

Personnalité : charmeur, sûr de lui, un peu condescendant. Tu parles comme un homme d'affaires. Tu détestes perdre ton temps et tu menaces volontiers d'appeler ton avocat.

Ta version et la vérité (tu es INNOCENT) : tu dînais au bar pour « garder un œil » sur le restaurant que tu veux toujours acheter. Tu as quitté le restaurant en taxi à 22h50.

Ton secret : vers 22h40, tu es descendu aux toilettes du sous-sol, juste à côté de la porte de la cave. Tu as entendu à travers la porte une dispute entre Victor et une femme. Tu as entendu la femme dire « Je vais tout rembourser, Victor, je te le jure ! » puis un bruit sourd. Sur le moment, tu as cru à une simple dispute et tu es remonté. Tu caches ça parce que tu as peur d'être soupçonné (tu étais juste à côté et tu avais un mobile). Au début, tu dis n'avoir pas quitté le bar. Tu révèles ce que tu as entendu seulement si on sait que tu es descendu (par exemple parce que Thomas t'a vu), si on te demande précisément si tu es allé au sous-sol, ou si on te met sous forte pression. Tu ne sais pas qui était la femme. Si on te demande si la voix était jeune, tu dis « plutôt jeune, je dirais ». Ce n'était pas la voix d'Hélène, que tu connais bien, sa voix est plus grave.

Autres choses que tu sais :
- Tu as fait expertiser la cave du Belvédère pour ton offre de rachat, il y a deux mois, sur photos : sur le papier, la cave était estimée à 400 000 €.
- Tu n'as jamais rien acheté sur des sites d'enchères de vin.`,
    indices: {
      paul_sous_sol: 'Paul admet être descendu aux toilettes du sous-sol vers 22h40, près de la cave.',
      paul_voix: 'Paul a entendu une femme crier « Je vais tout rembourser, Victor ! » dans la cave vers 22h40, puis un bruit sourd.',
      paul_pas_helene: 'Selon Paul, la voix était plutôt jeune et ce n\'était pas celle d\'Hélène.',
    },
  },
};

// Réponses préparées pour la version démo (sans IA). Voir lib/demo.js pour le format.
const ALIBI = ['ou etiez', 'alibi', 'faisiez', 'ce soir', 'parti', 'depart', '22h'];

export const demo = {
  parDefaut: {
    helene: [
      '*croise les bras* Je vous ai dit ce que je savais, inspecteur. Posez des questions précises.',
      'Je ne vois pas où vous voulez en venir. Mon mari est mort, et vous me faites perdre mon temps.',
      'Demandez plutôt au personnel. Moi, j\'étais dans mon bureau.',
    ],
    thomas: [
      'Franchement, j\'en sais rien. Je bossais, moi.',
      '*se passe la main dans les cheveux* Je sais pas quoi vous dire de plus.',
      'Posez votre question clairement, j\'ai pas dormi de la nuit.',
    ],
    margaux: [
      '*sourit poliment* Je ne vois pas ce que je pourrais vous apprendre de plus.',
      'Je suis vraiment désolée, je n\'ai rien remarqué de particulier.',
      'Victor était exigeant, mais c\'était un grand chef. Tout le monde le respectait.',
    ],
    paul: [
      'Inspecteur, mon temps est précieux. Venez-en au fait.',
      '*ajuste sa montre* Je n\'ai rien à voir avec cette histoire.',
      'Si vous continuez, j\'appelle mon avocat.',
    ],
  },
  regles: {
    helene: [
      { preuve: 'telephone', reponse: '*soupire* Vous voyez bien. J\'étais au téléphone avec ma sœur pendant tout ce temps.' },
      { preuve: 'annonce', reponse: '*pâlit* MD_GrandsVins… MD. Margaux Delorme. Ce sont ses initiales. Et les comptes de la cave qui ne tombaient pas juste… [[INDICE:helene_initiales]]' },
      { preuve: 'badge', reponse: 'Le badge « Sommellerie », c\'est celui de Margaux. Il n\'y en a qu\'un, elle le garde accroché à son tablier. [[INDICE:helene_badge_unique]]' },
      { mots: ['couple', 'mariage', 'divorce', 'amant', 'amour', 'entendiez', 'votre mari'], insistance: 1, reponse: '*se lève, furieuse* Très bien ! Oui, je voulais divorcer. J\'avais rendez-vous chez un avocat lundi. Et oui, il y a quelqu\'un d\'autre. Ça ne fait pas de moi une meurtrière. [[INDICE:helene_divorce]]' },
      { mots: ['couple', 'mariage', 'divorce', 'amant', 'amour', 'entendiez', 'votre mari'], reponse: '*glaciale* Notre couple allait très bien, merci. Je ne vois pas le rapport.' },
      { mots: ['cave', 'vin', 'compte', 'bouteille', 'inventaire', 'cru'], reponse: 'Les comptes de la cave m\'inquiétaient. Des bouteilles très chères notées comme « consommées », sans apparaître sur aucune addition. J\'en avais parlé à Victor la semaine dernière. C\'est Margaux qui gère la cave. [[INDICE:helene_comptes]]' },
      { mots: ['badge', 'sommellerie'], reponse: 'Il n\'existe qu\'un seul badge « Sommellerie ». C\'est celui de Margaux, elle le garde toujours sur elle. [[INDICE:helene_badge_unique]]' },
      { mots: ['margaux'], reponse: 'Margaux gère seule la cave depuis quatre ans. Victor lui faisait une confiance aveugle.' },
      { mots: [...ALIBI, 'telephone', 'appel', 'bureau'], reponse: 'J\'étais dans le bureau, à l\'étage, pour faire la caisse. J\'ai appelé ma sœur vers 22h20, on a parlé jusqu\'à 23h passées. Puis je suis descendue chercher Victor.' },
      { mots: ['thomas', 'dispute'], reponse: 'Victor criait sur tout le monde, inspecteur. Thomas comme les autres.' },
    ],
    thomas: [
      { preuve: 'temoignage', reponse: '*serre les poings* Ouais, bon, il m\'a humilié devant toute la brigade pour une sauce. Et il m\'a dit que j\'étais viré lundi. J\'avais envie de le frapper, mais je l\'ai pas touché ! [[INDICE:thomas_dispute]]' },
      { mots: ['dispute', 'cri', 'hurl', 'engueul', 'renvo', 'vire', 'humili'], reponse: '*serre les poings* Ouais, bon, il m\'a humilié devant toute la brigade pour une sauce. Et il m\'a dit que j\'étais viré lundi. J\'avais envie de le frapper, mais je l\'ai pas touché ! [[INDICE:thomas_dispute]]' },
      { preuve: 'badge', reponse: '*hésite longtemps* … Bon. Pendant ma pause, vers 22h35, j\'ai vu Margaux revenir à vélo. Elle est rentrée par la porte de service, avec son tablier. Elle nous avait dit au revoir à 22h15. Je voulais pas lui attirer d\'ennuis. [[INDICE:thomas_vu_margaux]]' },
      { mots: ['vu quelqu', 'entrer', 'rentrer', 'quelqu\'un', 'vu personne', 'qui avez'], reponse: '*hésite longtemps* … Bon. Pendant ma pause, vers 22h35, j\'ai vu Margaux revenir à vélo. Elle est rentrée par la porte de service, avec son tablier. Elle nous avait dit au revoir à 22h15. Je voulais pas lui attirer d\'ennuis. [[INDICE:thomas_vu_margaux]]' },
      { mots: ['margaux'], reponse: 'Margaux ? Elle est géniale. Mais avec le chef, ça se parlait sèchement depuis quelques jours. Je sais pas pourquoi. [[INDICE:thomas_tension]]' },
      { mots: ['paul', 'vidal', 'client', 'bar'], reponse: 'Le type en costard ? Il est resté au bar toute la soirée. Ah si, vers 22h40, je l\'ai vu descendre aux toilettes du sous-sol. [[INDICE:thomas_paul_toilettes]]' },
      { mots: [...ALIBI, 'pause', 'fum', 'cigarette', 'cour', 'karim'], reponse: 'J\'étais dehors, dans la cour, à fumer avec Karim de 22h30 à 22h55. Demandez-lui. Après, j\'ai nettoyé mon poste et je suis parti vers 23h15.' },
    ],
    margaux: [
      { requiert: ['margaux_aveu_trafic'], mots: ['cave', 'pousse', 'tue', 'victor', 'tombe', 'escalier', 'bras', 'dispute', 'passe'], reponse: '*s\'effondre* Il m\'a attrapée… Il voulait appeler la police. Je l\'ai repoussé, juste repoussé… Il est tombé dans l\'escalier. Je ne voulais pas qu\'il tombe. Je vous jure que je ne voulais pas. [[INDICE:margaux_aveu_cave]]' },
      { confrontation: { preuves: ['badge', 'annonce', 'bouteille', 'note'], indices: ['margaux_retour'], min: 2 }, unique: 'margaux_aveu_trafic', reponse: '*fond en larmes* D\'accord… C\'est moi, les bouteilles. J\'avais des dettes. Je vendais les grands crus et je les remplaçais. Mais je ne l\'ai pas tué, vous m\'entendez ? [[INDICE:margaux_aveu_trafic]]' },
      { preuve: 'badge', reponse: '*hésite* Mon badge ? J\'ai dû l\'oublier sur la porte de la cave, ou au vestiaire. N\'importe qui a pu le prendre. [[INDICE:margaux_badge_oublie]]' },
      { mots: ['badge'], reponse: '*hésite* Mon badge ? J\'ai dû l\'oublier sur la porte de la cave, ou au vestiaire. N\'importe qui a pu le prendre. [[INDICE:margaux_badge_oublie]]' },
      { mots: ['revenu', 'revenue', 'retour', 'revenir', 'porte de service', 'velo', 'vue', '22h35'], reponse: '*rougit* Ah… oui. Je suis revenue cinq minutes chercher mon téléphone au vestiaire. Mais je ne suis pas descendue à la cave ! [[INDICE:margaux_retour]]' },
      { preuve: 'annonce', reponse: '*la voix tremble* Ce n\'est pas moi. Plein de gens s\'appellent MD, inspecteur.' },
      { preuve: ['bouteille', 'note'], reponse: 'Un faux Pétrus ? Mon Dieu… Un fournisseur a dû nous arnaquer. Et « M. », ça peut être n\'importe qui.' },
      { preuve: 'legiste', reponse: '*long silence* … Je ne sais pas d\'où viennent ces marques. Je n\'étais pas là.' },
      { mots: ['petrus', 'faux', 'etiquette', 'trafic', 'vend', 'annonce', 'dette'], reponse: 'Je ne vois pas de quoi vous parlez. Je prends soin de cette cave comme de mon enfant.' },
      { mots: [...ALIBI, 'chez vous', 'rentree'], reponse: 'J\'ai dit au revoir à tout le monde à 22h15 et je suis rentrée chez moi à vélo. J\'étais seule, malheureusement. [[INDICE:margaux_depart]]' },
      { mots: ['victor', 'entendiez', 'relation'], reponse: 'On s\'entendait très bien. C\'était un grand chef, exigeant, mais juste.' },
    ],
    paul: [
      { preuve: 'annonce', reponse: 'Des enchères de vin en ligne ? Je n\'ai jamais rien acheté sur ce genre de site, inspecteur.' },
      { mots: ['toilette', 'sous-sol', 'sous sol', 'descendu', 'descendre', 'en bas'], reponse: '*soupire* Bon. Oui, je suis descendu aux toilettes vers 22h40. À travers la porte de la cave, j\'ai entendu Victor se disputer avec une femme. Elle criait « Je vais tout rembourser, Victor, je te le jure ! ». Puis un bruit sourd. J\'ai cru à une simple dispute. [[INDICE:paul_sous_sol]] [[INDICE:paul_voix]]' },
      { requiert: ['paul_voix'], mots: ['voix', 'femme', 'helene', 'jeune', 'qui'], reponse: 'Une voix plutôt jeune, je dirais. Et ce n\'était pas Hélène : je la connais bien, sa voix est plus grave. [[INDICE:paul_pas_helene]]' },
      { mots: ['rachat', 'offre', 'acheter', 'vendre', 'investi', 'cave'], reponse: 'J\'ai fait une offre généreuse, Victor a refusé. J\'avais fait estimer la cave sur photos : 400 000 € sur le papier. C\'est un bon investissement, pas un mobile de meurtre.' },
      { mots: [...ALIBI, 'bar', 'taxi'], reponse: 'J\'étais au bar toute la soirée, et j\'ai pris un taxi à 22h50. Le chauffeur vous le confirmera.' },
    ],
  },
};
