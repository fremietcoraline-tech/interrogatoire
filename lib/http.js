export function send(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(data));
}

export function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (fwd) return String(fwd).split(',')[0].trim();
  return req.socket?.remoteAddress || 'inconnue';
}

// Anti-abus : nombre de questions limité par adresse IP.
// En mémoire : sur un hébergement serverless, chaque instance a son propre compteur,
// c'est une protection simple qui complète la limite de 20 questions par partie.
const FENETRE = 60 * 60 * 1000;
const MAX_PAR_FENETRE = 60;
const appels = new Map();

export function autoriser(ip) {
  const maintenant = Date.now();
  const liste = (appels.get(ip) || []).filter((t) => maintenant - t < FENETRE);
  if (liste.length >= MAX_PAR_FENETRE) {
    appels.set(ip, liste);
    return false;
  }
  liste.push(maintenant);
  appels.set(ip, liste);
  return true;
}
