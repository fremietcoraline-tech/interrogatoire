// Règles du jeu partagées par le serveur (api/) et par la version démo sans serveur (GitHub Pages).
// Ce fichier n'importe rien de spécifique à Node : il fonctionne aussi dans le navigateur.
import { publicCase, secrets, solution } from './affaire-belvedere.js';

const MAX_QUESTION = 200;
const MAX_HISTORIQUE = 40;

export class ErreurJeu extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function historiqueValide(h) {
  if (!Array.isArray(h) || h.length > MAX_HISTORIQUE || h.length % 2 !== 0) return false;
  return h.every((m, i) =>
    m && typeof m.content === 'string' && m.content.length <= 2000 &&
    m.role === (i % 2 === 0 ? 'user' : 'assistant'));
}

// Vérifie la question et construit le message envoyé au suspect.
export function preparerQuestion({ suspectId, question = '', preuveId = null, historique = [] } = {}) {
  if (!secrets[suspectId]) throw new ErreurJeu(400, 'Suspect inconnu.');
  if (typeof question !== 'string' || question.length > MAX_QUESTION) {
    throw new ErreurJeu(400, `Ta question doit faire ${MAX_QUESTION} caractères au maximum.`);
  }
  const preuve = preuveId ? publicCase.preuves.find((p) => p.id === preuveId) : null;
  if (preuveId && !preuve) throw new ErreurJeu(400, 'Pièce inconnue.');
  if (!question.trim() && !preuve) throw new ErreurJeu(400, 'Écris une question.');
  if (!historiqueValide(historique)) throw new ErreurJeu(400, 'Historique de conversation invalide.');

  let contenu = question.trim();
  if (preuve) {
    contenu = `[Pièce montrée : ${preuve.id}] L'inspecteur vous montre « ${preuve.titre} » : ${preuve.texte}\n` +
      (contenu || 'Qu\'avez-vous à dire là-dessus ?');
  }
  return { suspectId, preuve, contenu, messages: [...historique, { role: 'user', content: contenu }] };
}

// Retire les balises [[INDICE:id]] de la réponse brute et renvoie les indices du carnet.
export function finaliserReponse(brut, suspectId, contenu, demo) {
  const connus = secrets[suspectId].indices;
  const indices = [];
  const texte = brut.replace(/\[\[INDICE:([a-z_]+)\]\]/g, (_, id) => {
    if (connus[id] && !indices.some((x) => x.id === id)) indices.push({ id, texte: connus[id] });
    return '';
  }).trim();
  const reponse = texte || '*garde le silence*';
  // contenuReponse garde les balises d'indices : le suspect sait ainsi ce qu'il a déjà révélé
  return { reponse, contenuQuestion: contenu, contenuReponse: brut.slice(0, 2000) || reponse, indices, demo };
}

export function verifierAccusation({ suspectId, mobileId, preuveId, questionsRestantes = 0, secondes = 0 } = {}) {
  if (!publicCase.suspects.some((s) => s.id === suspectId)) throw new ErreurJeu(400, 'Choisis un suspect.');
  if (!publicCase.mobiles.some((m) => m.id === mobileId)) throw new ErreurJeu(400, 'Choisis un mobile.');
  if (!publicCase.preuves.some((p) => p.id === preuveId)) throw new ErreurJeu(400, 'Choisis une preuve.');

  const restantes = Math.max(0, Math.min(20, Number(questionsRestantes) || 0));
  const minutes = Math.max(0, Number(secondes) || 0) / 60;

  const bonCoupable = suspectId === solution.coupable;
  const bonMobile = mobileId === solution.mobile;
  const niveauPreuve = solution.preuvesDecisives.includes(preuveId) ? 'decisive'
    : solution.preuvesUtiles.includes(preuveId) ? 'utile' : 'faible';

  const detail = [];
  let score = 0;
  if (bonCoupable) {
    score += 1000;
    detail.push({ libelle: 'Bon coupable', points: 1000 });
    if (bonMobile) { score += 300; detail.push({ libelle: 'Bon mobile', points: 300 }); }
    if (niveauPreuve === 'decisive') { score += 300; detail.push({ libelle: 'Preuve décisive', points: 300 }); }
    if (niveauPreuve === 'utile') { score += 150; detail.push({ libelle: 'Preuve utile', points: 150 }); }
    const bonusQuestions = restantes * 20;
    if (bonusQuestions) { score += bonusQuestions; detail.push({ libelle: `${restantes} question(s) non utilisée(s)`, points: bonusQuestions }); }
    const bonusTemps = Math.round(Math.max(0, 300 - Math.max(0, minutes - 10) * 15));
    if (bonusTemps) { score += bonusTemps; detail.push({ libelle: 'Rapidité', points: bonusTemps }); }
  }

  const coupable = publicCase.suspects.find((s) => s.id === solution.coupable);
  return {
    gagne: bonCoupable,
    bonMobile,
    niveauPreuve,
    score,
    detail,
    coupable: { id: coupable.id, nom: coupable.nom },
    mobile: publicCase.mobiles.find((m) => m.id === solution.mobile).texte,
    revelation: solution.revelation,
  };
}
