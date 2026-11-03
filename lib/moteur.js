// Règles du jeu partagées par le serveur (api/) et par la version démo sans serveur (GitHub Pages).
// Ce fichier n'importe rien de spécifique à Node : il fonctionne aussi dans le navigateur.
import { affaire as trouverAffaire } from './affaires/index.js';

const MAX_QUESTION = 200;
const MAX_HISTORIQUE = 50;

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

export function chargerAffaire(affaireId) {
  const a = trouverAffaire(affaireId);
  if (!a) throw new ErreurJeu(400, 'Affaire inconnue.');
  return a;
}

// Vérifie la question et construit le message envoyé au suspect.
export function preparerQuestion({ affaireId, suspectId, question = '', preuveId = null, historique = [] } = {}) {
  const affaire = chargerAffaire(affaireId);
  if (!affaire.secrets[suspectId]) throw new ErreurJeu(400, 'Suspect inconnu.');
  if (typeof question !== 'string' || question.length > MAX_QUESTION) {
    throw new ErreurJeu(400, `Ta question doit faire ${MAX_QUESTION} caractères au maximum.`);
  }
  const preuve = preuveId ? affaire.publicCase.preuves.find((p) => p.id === preuveId) : null;
  if (preuveId && !preuve) throw new ErreurJeu(400, 'Pièce inconnue.');
  if (!question.trim() && !preuve) throw new ErreurJeu(400, 'Écris une question.');
  if (!historiqueValide(historique)) throw new ErreurJeu(400, 'Historique de conversation invalide.');

  let contenu = question.trim();
  if (preuve) {
    contenu = `[Pièce montrée : ${preuve.id}] L'inspecteur vous montre « ${preuve.titre} » : ${preuve.texte}\n` +
      (contenu || 'Qu\'avez-vous à dire là-dessus ?');
  }
  return { affaire, suspectId, preuve, contenu, messages: [...historique, { role: 'user', content: contenu }] };
}

// Retire les balises [[INDICE:id]] de la réponse brute et renvoie les indices du carnet.
export function finaliserReponse(affaire, brut, suspectId, contenu, demo) {
  const connus = affaire.secrets[suspectId].indices;
  const indices = [];
  const texte = brut.replace(/\[\[INDICE:([a-z_]+)\]\]/g, (_, id) => {
    if (connus[id] && !indices.some((x) => x.id === id)) indices.push({ id, texte: connus[id] });
    return '';
  }).trim();
  const reponse = texte || '*garde le silence*';
  // contenuReponse garde les balises d'indices : le suspect sait ainsi ce qu'il a déjà révélé
  return { reponse, contenuQuestion: contenu, contenuReponse: brut.slice(0, 2000) || reponse, indices, demo };
}

export function verifierAccusation({ affaireId, suspectId, mobileId, preuveId, questionsRestantes = 0, secondes = 0 } = {}) {
  const { publicCase, solution } = chargerAffaire(affaireId);
  if (!publicCase.suspects.some((s) => s.id === suspectId)) throw new ErreurJeu(400, 'Choisis un suspect.');
  if (!publicCase.mobiles.some((m) => m.id === mobileId)) throw new ErreurJeu(400, 'Choisis un mobile.');
  if (!publicCase.preuves.some((p) => p.id === preuveId)) throw new ErreurJeu(400, 'Choisis une preuve.');

  const restantes = Math.max(0, Math.min(publicCase.questions, Number(questionsRestantes) || 0));
  const minutes = Math.max(0, Number(secondes) || 0) / 60;
  // les affaires difficiles rapportent plus de points
  const multiplicateur = [1, 1, 1.25, 1.5, 2][publicCase.niveau] || 1;

  const bonCoupable = suspectId === solution.coupable;
  const bonMobile = mobileId === solution.mobile;
  const niveauPreuve = solution.preuvesDecisives.includes(preuveId) ? 'decisive'
    : solution.preuvesUtiles.includes(preuveId) ? 'utile' : 'faible';

  const detail = [];
  const ajouter = (libelle, points) => { if (points) detail.push({ libelle, points: Math.round(points * multiplicateur) }); };
  if (bonCoupable) {
    ajouter('Bon coupable', 1000);
    if (bonMobile) ajouter('Bon mobile', 300);
    if (niveauPreuve === 'decisive') ajouter('Preuve décisive', 300);
    if (niveauPreuve === 'utile') ajouter('Preuve utile', 150);
    ajouter(`${restantes} question(s) non utilisée(s)`, restantes * 20);
    ajouter('Rapidité', Math.max(0, 300 - Math.max(0, minutes - 10) * 15));
  }
  const score = detail.reduce((t, d) => t + d.points, 0);

  const coupable = publicCase.suspects.find((s) => s.id === solution.coupable);
  return {
    multiplicateur,
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
