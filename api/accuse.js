import { verifierAccusation, ErreurJeu } from '../lib/moteur.js';
import { send } from '../lib/http.js';

// L'accusation est vérifiée sur le serveur : le navigateur ne connaît jamais la solution.
export default function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { erreur: 'Méthode non autorisée.' });
  try {
    send(res, 200, verifierAccusation(req.body));
  } catch (err) {
    if (err instanceof ErreurJeu) return send(res, err.status, { erreur: err.message });
    throw err;
  }
}
