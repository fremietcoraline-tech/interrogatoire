// Mode démo : utilisé quand aucune clé d'API n'est configurée.
// Les suspects répondent avec des réponses écrites à l'avance, choisies selon les mots de la question.
// Cela permet de tester tout le jeu sans payer l'IA. Les réponses de l'IA seront bien plus riches.

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const has = (q, mots) => mots.some((m) => q.includes(m));

// pièces du dossier déjà montrées à ce suspect, retrouvées dans l'historique
function preuvesMontrees(messages) {
  const ids = new Set();
  for (const m of messages) {
    if (m.role !== 'user') continue;
    const match = m.content.match(/\[Pièce montrée : ([a-z]+)\]/);
    if (match) ids.add(match[1]);
  }
  return ids;
}

function dejaDit(messages, balise) {
  return messages.some((m) => m.role === 'assistant' && m.content.includes(balise));
}

const PAR_DEFAUT = {
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
};

const REGLES = {
  helene(q, msgs, preuve) {
    if (preuve === 'telephone') return '*soupire* Vous voyez bien. J\'étais au téléphone avec ma sœur pendant tout ce temps.';
    if (preuve === 'annonce') return '*pâlit* MD_GrandsVins… MD. Margaux Delorme. Ce sont ses initiales. Et les comptes de la cave qui ne tombaient pas juste… [[INDICE:helene_initiales]]';
    if (preuve === 'badge') return 'Le badge « Sommellerie », c\'est celui de Margaux. Il n\'y en a qu\'un, elle le garde accroché à son tablier. [[INDICE:helene_badge_unique]]';
    if (has(q, ['couple', 'mariage', 'mari ', 'divorce', 'amant', 'amour', 'entendiez'])) {
      const insistance = msgs.filter((m) => m.role === 'user' && has(norm(m.content), ['couple', 'mariage', 'divorce', 'amant', 'amour'])).length;
      if (insistance >= 2) return '*se lève, furieuse* Très bien ! Oui, je voulais divorcer. J\'avais rendez-vous chez un avocat lundi. Et oui, il y a quelqu\'un d\'autre. Ça ne fait pas de moi une meurtrière. [[INDICE:helene_divorce]]';
      return '*glaciale* Notre couple allait très bien, merci. Je ne vois pas le rapport.';
    }
    if (has(q, ['cave', 'vin', 'compte', 'bouteille', 'inventaire', 'cru'])) return 'Les comptes de la cave m\'inquiétaient. Des bouteilles très chères notées comme « consommées », sans apparaître sur aucune addition. J\'en avais parlé à Victor la semaine dernière. C\'est Margaux qui gère la cave. [[INDICE:helene_comptes]]';
    if (has(q, ['badge', 'sommellerie'])) return 'Il n\'existe qu\'un seul badge « Sommellerie ». C\'est celui de Margaux, elle le garde toujours sur elle. [[INDICE:helene_badge_unique]]';
    if (has(q, ['margaux'])) return 'Margaux gère seule la cave depuis quatre ans. Victor lui faisait une confiance aveugle.';
    if (has(q, ['ou etiez', 'alibi', 'faisiez', 'soir', 'telephone', 'appel', 'bureau'])) return 'J\'étais dans le bureau, à l\'étage, pour faire la caisse. J\'ai appelé ma sœur vers 22h20, on a parlé jusqu\'à 23h passées. Puis je suis descendue chercher Victor.';
    if (has(q, ['thomas', 'dispute'])) return 'Victor criait sur tout le monde, inspecteur. Thomas comme les autres.';
    return null;
  },
  thomas(q, msgs, preuve) {
    if (preuve === 'temoignage' || has(q, ['dispute', 'cri', 'hurl', 'engueul', 'renvo', 'vire', 'humili'])) return '*serre les poings* Ouais, bon, il m\'a humilié devant toute la brigade pour une sauce. Et il m\'a dit que j\'étais viré lundi. J\'avais envie de le frapper, mais je l\'ai pas touché ! [[INDICE:thomas_dispute]]';
    if (preuve === 'badge' || has(q, ['vu quelqu', 'entrer', 'rentrer', 'quelqu\'un', 'qui avez-vous vu', 'vu personne'])) return '*hésite longtemps* … Bon. Pendant ma pause, vers 22h35, j\'ai vu Margaux revenir à vélo. Elle est rentrée par la porte de service, avec son tablier. Elle nous avait dit au revoir à 22h15. Je voulais pas lui attirer d\'ennuis. [[INDICE:thomas_vu_margaux]]';
    if (has(q, ['margaux'])) return 'Margaux ? Elle est géniale. Mais avec le chef, ça se parlait sèchement depuis quelques jours. Je sais pas pourquoi. [[INDICE:thomas_tension]]';
    if (has(q, ['paul', 'vidal', 'client', 'bar'])) return 'Le type en costard ? Il est resté au bar toute la soirée. Ah si, vers 22h40, je l\'ai vu descendre aux toilettes du sous-sol. [[INDICE:thomas_paul_toilettes]]';
    if (has(q, ['ou etiez', 'alibi', 'faisiez', 'pause', 'fum', 'cigarette', 'cour', 'karim'])) return 'J\'étais dehors, dans la cour, à fumer avec Karim de 22h30 à 22h55. Demandez-lui. Après, j\'ai nettoyé mon poste et je suis parti vers 23h15.';
    return null;
  },
  margaux(q, msgs, preuve) {
    const montrees = preuvesMontrees(msgs);
    if (preuve) montrees.add(preuve);
    const confrontations = ['badge', 'annonce', 'bouteille', 'note'].filter((id) => montrees.has(id)).length
      + (has(q, ['vu revenir', 'vue revenir', 'thomas vous a vu', 'on vous a vue', 'on vous a vu']) || dejaDit(msgs, 'INDICE:margaux_retour') ? 1 : 0);
    if (dejaDit(msgs, 'INDICE:margaux_aveu_trafic') && has(q, ['cave', 'pousse', 'tue', 'victor', 'tombe', 'escalier', 'bras', 'dispute'])) {
      return '*s\'effondre* Il m\'a attrapée… Il voulait appeler la police. Je l\'ai repoussé, juste repoussé… Il est tombé dans l\'escalier. Je ne voulais pas qu\'il tombe. Je vous jure que je ne voulais pas. [[INDICE:margaux_aveu_cave]]';
    }
    if (confrontations >= 2) {
      return '*fond en larmes* D\'accord… C\'est moi, les bouteilles. J\'avais des dettes. Je vendais les grands crus et je les remplaçais. Mais je ne l\'ai pas tué, vous m\'entendez ? [[INDICE:margaux_aveu_trafic]]';
    }
    if (preuve === 'badge' || has(q, ['badge'])) return '*hésite* Mon badge ? J\'ai dû l\'oublier sur la porte de la cave, ou au vestiaire. N\'importe qui a pu le prendre. [[INDICE:margaux_badge_oublie]]';
    if (has(q, ['revenu', 'revenue', 'retour', 'revenir', 'porte de service', 'velo', 'vue', '22h35'])) return '*rougit* Ah… oui. Je suis revenue cinq minutes chercher mon téléphone au vestiaire. Mais je ne suis pas descendue à la cave ! [[INDICE:margaux_retour]]';
    if (preuve === 'annonce') return '*la voix tremble* Ce n\'est pas moi. Plein de gens s\'appellent MD, inspecteur.';
    if (preuve === 'bouteille' || preuve === 'note') return 'Un faux Pétrus ? Mon Dieu… Un fournisseur a dû nous arnaquer. Et « M. », ça peut être n\'importe qui.';
    if (preuve === 'legiste') return '*long silence* … Je ne sais pas d\'où viennent ces marques. Je n\'étais pas là.';
    if (has(q, ['petrus', 'faux', 'etiquette', 'trafic', 'vend', 'annonce', 'dette'])) return 'Je ne vois pas de quoi vous parlez. Je prends soin de cette cave comme de mon enfant.';
    if (has(q, ['ou etiez', 'alibi', 'faisiez', 'soir', 'parti', 'depart', 'chez vous', 'rentree', '22h'])) return 'J\'ai dit au revoir à tout le monde à 22h15 et je suis rentrée chez moi à vélo. J\'étais seule, malheureusement. [[INDICE:margaux_depart]]';
    if (has(q, ['victor', 'entendiez', 'relation'])) return 'On s\'entendait très bien. C\'était un grand chef, exigeant, mais juste.';
    return null;
  },
  paul(q, msgs, preuve) {
    const aRevele = dejaDit(msgs, 'INDICE:paul_voix');
    if (preuve === 'annonce') return 'Des enchères de vin en ligne ? Je n\'ai jamais rien acheté sur ce genre de site, inspecteur.';
    if (has(q, ['toilette', 'sous-sol', 'sous sol', 'descendu', 'descendre', 'en bas'])) return '*soupire* Bon. Oui, je suis descendu aux toilettes vers 22h40. À travers la porte de la cave, j\'ai entendu Victor se disputer avec une femme. Elle criait « Je vais tout rembourser, Victor, je te le jure ! ». Puis un bruit sourd. J\'ai cru à une simple dispute. [[INDICE:paul_sous_sol]] [[INDICE:paul_voix]]';
    if (aRevele && has(q, ['voix', 'femme', 'helene', 'jeune', 'qui'])) return 'Une voix plutôt jeune, je dirais. Et ce n\'était pas Hélène : je la connais bien, sa voix est plus grave. [[INDICE:paul_pas_helene]]';
    if (has(q, ['rachat', 'offre', 'acheter', 'vendre', 'investi', 'cave'])) return 'J\'ai fait une offre généreuse, Victor a refusé. J\'avais fait estimer la cave sur photos : 400 000 € sur le papier. C\'est un bon investissement, pas un mobile de meurtre.';
    if (has(q, ['ou etiez', 'alibi', 'faisiez', 'soir', 'bar', 'taxi', 'parti'])) return 'J\'étais au bar toute la soirée, et j\'ai pris un taxi à 22h50. Le chauffeur vous le confirmera.';
    return null;
  },
};

export function repondreDemo(suspectId, messages, preuveId) {
  const derniere = messages[messages.length - 1].content;
  const question = norm(derniere.replace(/\[Pièce montrée : [a-z]+\][^\n]*\n?/, ''));
  const precedents = messages.slice(0, -1);
  const r = REGLES[suspectId](question, precedents, preuveId);
  if (r) return r;
  const liste = PAR_DEFAUT[suspectId];
  return liste[precedents.length / 2 % liste.length];
}
