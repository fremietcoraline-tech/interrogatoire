import { affaires } from '../lib/affaires/index.js';
import { iaActive } from '../lib/ia.js';
import { send } from '../lib/http.js';

// Données publiques des affaires : jamais la solution ni les fiches secrètes.
export default function handler(req, res) {
  send(res, 200, { affaires: affaires.map((a) => a.publicCase), modeDemo: !iaActive() });
}
