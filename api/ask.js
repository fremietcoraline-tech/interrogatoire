import { systemPromptFor } from '../lib/affaire-belvedere.js';
import { iaActive, repondreIA, Anthropic } from '../lib/ia.js';
import { repondreDemo } from '../lib/demo.js';
import { preparerQuestion, finaliserReponse, ErreurJeu } from '../lib/moteur.js';
import { send, clientIp, autoriser } from '../lib/http.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { erreur: 'Méthode non autorisée.' });
  if (!autoriser(clientIp(req))) {
    return send(res, 429, { erreur: 'Trop de questions envoyées depuis cet appareil. Réessaie dans un moment.' });
  }

  let q;
  try {
    q = preparerQuestion(req.body);
  } catch (err) {
    if (err instanceof ErreurJeu) return send(res, err.status, { erreur: err.message });
    throw err;
  }

  let brut;
  const demo = !iaActive();
  try {
    brut = demo
      ? repondreDemo(q.suspectId, q.messages, q.preuve?.id)
      : await repondreIA(systemPromptFor(q.suspectId), q.messages);
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return send(res, 503, { erreur: 'Le suspect a besoin d\'une pause. Réessaie dans quelques secondes.' });
    }
    if (err instanceof Anthropic.APIError) {
      console.error('Erreur API IA', err.status, err.message);
      return send(res, 502, { erreur: 'Le suspect ne répond pas pour le moment. Réessaie.' });
    }
    console.error(err);
    return send(res, 500, { erreur: 'Erreur interne.' });
  }

  send(res, 200, finaliserReponse(brut, q.suspectId, q.contenu, demo));
}
