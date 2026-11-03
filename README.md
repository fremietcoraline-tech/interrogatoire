# Interrogatoire — jeu d'enquête IA

Un jeu d'enquête dans le navigateur : le joueur interroge librement des suspects animés par une intelligence artificielle pour démasquer le coupable. Pas de liste de questions : il écrit ce qu'il veut, et les suspects peuvent mentir, se contredire ou craquer.

Version 1 du cahier des charges : une affaire complète, **« Mort au Belvédère »**.

## Ce qui est fait (V1)

| Fonctionnalité | Où |
|---|---|
| Écran d'accueil, choix de l'affaire, reprise de partie | `public/index.html`, `public/app.js` |
| Dossier : pièces, fiches suspects, chronologie | panneau de gauche (onglet « Dossier » sur téléphone) |
| Interrogatoire libre comme une messagerie, effet de frappe | panneau central |
| 20 questions maximum, compteur toujours visible | barre du haut |
| Montrer une preuve : glisser une pièce dans la conversation, bouton 📎, ou « Montrer au suspect » | panneau central |
| Carnet d'enquête : indices ajoutés automatiquement + notes libres | panneau de droite (onglet « Carnet ») |
| Accusation unique (coupable + mobile + preuve), révélation et score | bouton « Accuser » |
| Sauvegarde de la partie sur l'appareil | `localStorage` |
| Musique d'ambiance discrète, désactivable | bouton ♪ |
| Politique de confidentialité | `public/confidentialite.html` |

## Sécurité : la clé d'API et la solution restent sur le serveur

- La clé d'API est lue uniquement dans la variable d'environnement `ANTHROPIC_API_KEY`, côté serveur (`lib/ia.js`). Elle n'apparaît jamais dans le code envoyé au navigateur.
- La vérité de l'affaire (coupable, fiches secrètes des suspects) est dans `lib/affaire-belvedere.js`, qui n'est jamais envoyé au navigateur. L'accusation est vérifiée sur le serveur (`api/accuse.js`).
- Anti-abus : questions de 200 caractères maximum, 20 questions par partie, et 60 questions par heure et par adresse IP (`lib/http.js`).
- Garde-fous : les suspects refusent les sujets hors enquête et les contenus choquants, et ne révèlent jamais directement la solution (règles dans `lib/affaire-belvedere.js`).

## Organisation des fichiers

```
public/            le site (HTML, CSS, JavaScript du navigateur)
api/case.js        donne les infos publiques de l'affaire
api/ask.js         envoie la question au suspect (IA) et renvoie sa réponse
api/accuse.js      vérifie l'accusation et calcule le score
lib/               code serveur : scénario secret, appel à l'IA, mode démo
server.js          petit serveur pour jouer en local
```

## Jouer en local

Il faut [Node.js](https://nodejs.org) version 18 ou plus.

```bash
npm install
```

```bash
npm run dev
```

Puis ouvre http://localhost:3000.

Sans clé d'API, le jeu tourne en **mode démo** : les suspects répondent avec des phrases préparées selon les mots-clés de la question. C'est pratique pour tester, mais l'IA est bien plus riche. Pour activer l'IA, copie `.env.example` en `.env` et colle ta clé d'API Anthropic dedans.

## Version démo sur GitHub Pages

À chaque envoi sur la branche `main`, le fichier `.github/workflows/pages.yml` publie automatiquement une **version démo** sur GitHub Pages : `https://TON-PSEUDO.github.io/interrogatoire/`.

- Pour l'activer une seule fois : dans le dépôt, **Settings → Pages → Source : GitHub Actions**.
- Sans serveur, le jeu tourne entièrement dans le navigateur avec les réponses préparées (`lib/demo.js`). Aucune question n'est envoyée à une IA.
- Limite : dans cette version, la solution est lisible dans les fichiers du site. Pour la version complète avec IA et solution secrète, utilise Vercel (ci-dessous).

## Version complète avec IA (GitHub + Vercel)

GitHub Pages ne peut héberger que des pages statiques : il ne peut pas cacher la clé d'API. La version avec IA tourne donc sur Vercel, gratuitement au lancement, à partir du même dépôt GitHub.

1. Envoie le projet sur GitHub (le fichier `.gitignore` empêche d'envoyer `.env` et `node_modules`).
2. Sur [vercel.com](https://vercel.com), connecte-toi avec GitHub, clique sur **Add New → Project** et importe le dépôt.
3. Dans **Environment Variables**, ajoute `ANTHROPIC_API_KEY` avec ta clé d'API.
4. Clique sur **Deploy**. Chaque `git push` mettra ensuite le site à jour automatiquement.
5. Dans la console Anthropic, règle un **plafond de dépense mensuel** pour éviter toute mauvaise surprise.

## Modèle d'IA

`claude-haiku-5-5` (Claude Haiku 5.5), le modèle rapide et peu coûteux d'Anthropic, réglé avec un effort de réflexion bas pour répondre vite. La fiche du suspect est mise en cache entre deux questions pour réduire le coût. Le modèle se change dans `lib/ia.js`.

## Ajouter une affaire (V2)

Copie `lib/affaire-belvedere.js` et adapte l'affaire publique, les fiches secrètes et la solution. Le scénario doit être terminé avant les réglages : les fiches secrètes servent à guider l'IA.
