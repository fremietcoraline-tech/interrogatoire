// Serveur local pour développer et tester sans Vercel : `npm run dev`
// En production, Vercel sert le dossier public/ et transforme les fichiers de api/ en fonctions serverless.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ici = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3000;

// Lecture simple du fichier .env (la clé d'API reste sur le serveur)
const envFile = path.join(ici, '.env');
if (fs.existsSync(envFile)) {
  for (const ligne of fs.readFileSync(envFile, 'utf8').split(/\r?\n/)) {
    const m = ligne.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon',
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname.startsWith('/api/')) {
    const nom = url.pathname.slice(5).replace(/[^a-z]/g, '');
    const fichier = path.join(ici, 'api', `${nom}.js`);
    if (!fs.existsSync(fichier)) { res.statusCode = 404; return res.end(); }
    let corps = '';
    for await (const morceau of req) corps += morceau;
    try { req.body = corps ? JSON.parse(corps) : {}; } catch { req.body = {}; }
    const { default: handler } = await import(pathToFileURL(fichier).href);
    return handler(req, res);
  }

  const relatif = url.pathname === '/' ? 'index.html' : decodeURIComponent(url.pathname).replace(/^\/+/, '');
  const fichier = path.join(ici, 'public', relatif);
  if (!fichier.startsWith(path.join(ici, 'public')) || !fs.existsSync(fichier) || fs.statSync(fichier).isDirectory()) {
    res.statusCode = 404;
    return res.end('Introuvable');
  }
  res.setHeader('Content-Type', TYPES[path.extname(fichier)] || 'application/octet-stream');
  res.setHeader('Cache-Control', 'no-cache');
  fs.createReadStream(fichier).pipe(res);
});

server.listen(PORT, () => {
  const mode = process.env.ANTHROPIC_API_KEY ? 'IA activée' : 'mode démo (pas de clé ANTHROPIC_API_KEY)';
  console.log(`Interrogatoire : http://localhost:${PORT} — ${mode}`);
});
