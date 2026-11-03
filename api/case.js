import { publicCase } from '../lib/affaire-belvedere.js';
import { iaActive } from '../lib/ia.js';
import { send } from '../lib/http.js';

// Données publiques de l'affaire : jamais la solution ni les fiches secrètes.
export default function handler(req, res) {
  send(res, 200, { ...publicCase, modeDemo: !iaActive() });
}
