'use strict';

(() => {
  const MAX_CARACTERES = 200;
  const CLE_SAUVEGARDE = 'interrogatoire-partie-v2';
  const CLE_RESULTATS = 'interrogatoire-resultats-v1';
  const $ = (id) => document.getElementById(id);

  let affaires = [];         // données publiques de toutes les affaires (sans les solutions)
  let modeDemo = false;
  let affaire = null;        // affaire en cours
  let etat = null;           // partie en cours, sauvegardée sur l'appareil
  let preuveJointe = null;
  let enAttente = false;
  let chronoId = null;

  const maxQuestions = () => affaire.questions;

  // ---------- Sauvegarde locale ----------
  function lire(cle) {
    try { const s = localStorage.getItem(cle); return s ? JSON.parse(s) : null; } catch (e) { return null; }
  }
  function ecrire(cle, valeur) {
    try { localStorage.setItem(cle, JSON.stringify(valeur)); } catch (e) { /* stockage indisponible */ }
  }
  const charger = () => lire(CLE_SAUVEGARDE);
  const sauver = () => ecrire(CLE_SAUVEGARDE, etat);
  function effacer() {
    try { localStorage.removeItem(CLE_SAUVEGARDE); } catch (e) { /* stockage indisponible */ }
  }
  // meilleur score obtenu pour chaque affaire
  const resultats = () => lire(CLE_RESULTATS) || {};
  function enregistrerResultat(r) {
    const tous = resultats();
    const avant = tous[affaire.id];
    if (!avant || (r.gagne && (!avant.gagne || r.score > avant.score))) {
      tous[affaire.id] = { gagne: r.gagne, score: r.score };
      ecrire(CLE_RESULTATS, tous);
    }
  }

  function nouvelEtat() {
    return {
      affaireId: affaire.id,
      ecran: 'briefing',
      conversations: {},
      utilisees: 0,
      indices: [],
      notes: '',
      secondes: 0,
      suspectActif: affaire.suspects[0].id,
      resultat: null,
      musique: true,
    };
  }

  // ---------- Outils ----------
  const echapper = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const formater = (s) => echapper(s).replace(/\*([^*\n]+)\*\s*/g, '<span class="attitude">$1</span>');
  const suspectPar = (id) => affaire.suspects.find((s) => s.id === id);
  const preuvePar = (id) => affaire.preuves.find((p) => p.id === id);
  const duree = (sec) => `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;

  // Sans serveur (GitHub Pages), le jeu tourne en mode démo directement dans le navigateur.
  let local = null;

  async function chargerModeLocal() {
    const [moteur, demo, liste] = await Promise.all([
      import('./lib/moteur.js'), import('./lib/demo.js'), import('./lib/affaires/index.js'),
    ]);
    local = {
      case: () => ({ affaires: liste.affaires.map((a) => a.publicCase), modeDemo: true }),
      ask: async (corps) => {
        const q = moteur.preparerQuestion(corps);
        await new Promise((r) => setTimeout(r, 500 + Math.random() * 600));
        const brut = demo.repondreDemo(q.affaire, q.suspectId, q.messages, q.preuve?.id);
        return moteur.finaliserReponse(q.affaire, brut, q.suspectId, q.contenu, true);
      },
      accuse: (corps) => moteur.verifierAccusation(corps),
    };
  }

  async function api(chemin, corps) {
    if (local) return local[chemin](corps);
    const options = corps
      ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(corps) }
      : {};
    const r = await fetch(`api/${chemin}`, options);
    const data = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(data.erreur || 'Impossible de joindre le serveur.');
    return data;
  }

  let toastId = null;
  function toast(texte) {
    const t = $('toast');
    t.textContent = texte;
    t.classList.remove('hidden');
    clearTimeout(toastId);
    toastId = setTimeout(() => t.classList.add('hidden'), 2800);
  }

  // Portraits dessinés en SVG (illustrations, pas de photos de vraies personnes)
  function portrait(p, classe = 'portrait') {
    const encre = '#1f2a44';
    const arriere = p.coiffure === 'long'
      ? `<path d="M25 78 Q20 22 50 19 Q80 22 75 78Z" fill="${p.cheveux}"/>` : '';
    const cheveux = {
      chignon: `<circle cx="50" cy="19" r="10" fill="${p.cheveux}"/><path d="M29 44 Q28 22 50 21 Q72 22 71 44 Q66 31 50 30 Q34 31 29 44Z" fill="${p.cheveux}"/>`,
      court: `<path d="M29 42 Q29 19 50 19 Q71 19 71 42 Q67 29 50 28 Q33 29 29 42Z" fill="${p.cheveux}"/>`,
      long: `<path d="M29 44 Q30 21 50 20 Q70 21 71 44 Q62 30 46 31 Q36 33 29 44Z" fill="${p.cheveux}"/>`,
      degarni: `<path d="M30 48 Q28 34 34 29 L36 46Z M70 48 Q72 34 66 29 L64 46Z" fill="${p.cheveux}"/>`,
      carre: `<path d="M27 60 Q24 20 50 19 Q76 20 73 60 L67 60 Q69 33 50 30 Q31 33 33 60Z" fill="${p.cheveux}"/>`,
    }[p.coiffure] || '';
    const accessoires = {
      lunettes: `<g fill="none" stroke="${encre}" stroke-width="2"><circle cx="42" cy="47" r="6"/><circle cx="58" cy="47" r="6"/><path d="M48 47h4"/></g>`,
      toque: `<path d="M31 32 Q26 13 39 15 Q43 4 54 8 Q66 4 68 17 Q77 18 69 32Z" fill="#fff" stroke="${encre}" stroke-width="1.5"/>`,
      tablier: `<path d="M39 84 L39 100 L61 100 L61 84Z" fill="#241510"/><path d="M39 84 L33 75 M61 84 L67 75" stroke="#241510" stroke-width="3"/>`,
      barbe: `<path d="M33 52 Q35 72 50 73 Q65 72 67 52 Q60 63 50 63 Q40 63 33 52Z" fill="${p.cheveux}"/>`,
      moustache: `<path d="M40 56 Q45 52 50 55 Q55 52 60 56 Q55 59 50 57 Q45 59 40 56Z" fill="${p.cheveux}"/>`,
      casquette: `<path d="M28 33 Q30 16 50 15 Q70 16 72 33Z" fill="#1f3354" stroke="${encre}" stroke-width="1.5"/><path d="M28 33 L76 33 Q74 38 60 37 L28 36Z" fill="#14223a"/><rect x="45" y="20" width="10" height="6" fill="#d9b44a"/>`,
      bonnet: `<path d="M28 36 Q28 12 50 11 Q72 12 72 36Z" fill="#8a2f2f" stroke="${encre}" stroke-width="1.5"/><rect x="27" y="31" width="46" height="7" rx="2" fill="#6e2424"/><circle cx="50" cy="10" r="5" fill="#e9e2d6"/>`,
      collier: `<g fill="#f3efe6" stroke="#bdb6a8" stroke-width="0.6"><circle cx="40" cy="76" r="2.2"/><circle cx="44" cy="78" r="2.2"/><circle cx="48" cy="79" r="2.2"/><circle cx="52" cy="79" r="2.2"/><circle cx="56" cy="78" r="2.2"/><circle cx="60" cy="76" r="2.2"/></g>`,
      echarpe: `<path d="M34 72 Q50 82 66 72 L68 80 Q50 90 32 80Z" fill="#b8423a"/><path d="M56 78 L60 98 L66 96 L62 77Z" fill="#a53a33"/>`,
    }[p.accessoire] || '';
    return `<svg class="${classe}" viewBox="0 0 100 100" aria-hidden="true">
      <rect width="100" height="100" fill="${p.fond || '#2b3654'}"/>
      ${arriere}
      <path d="M12 100 Q15 75 50 72 Q85 75 88 100Z" fill="${p.habit}" stroke="${encre}" stroke-width="1.5"/>
      <rect x="44" y="60" width="12" height="15" fill="${p.peau}" stroke="${encre}" stroke-width="1.2"/>
      <ellipse cx="50" cy="46" rx="20" ry="23" fill="${p.peau}" stroke="${encre}" stroke-width="1.5"/>
      <path d="M38 40 Q42 38 46 40 M54 40 Q58 38 62 40" stroke="${encre}" stroke-width="1.6" fill="none"/>
      <circle cx="42" cy="47" r="1.9" fill="${encre}"/><circle cx="58" cy="47" r="1.9" fill="${encre}"/>
      <path d="M50 49 Q48 56 51 57" stroke="${encre}" stroke-width="1.2" fill="none"/>
      <path d="M44 62 Q50 64 56 62" stroke="${encre}" stroke-width="1.6" fill="none"/>
      ${cheveux}
      ${accessoires}
    </svg>`;
  }

  // ---------- Musique d'ambiance (générée, discrète, désactivable) ----------
  const ambiance = (() => {
    let ctx = null, maitre = null, minuteur = null;
    const accords = [[220, 261.6, 329.6, 392], [146.8, 220, 261.6, 349.2], [174.6, 220, 261.6, 329.6], [164.8, 207.7, 246.9, 293.7]];
    let i = 0;
    function jouerAccord() {
      const t = ctx.currentTime;
      for (const f of accords[i % accords.length]) {
        for (const desaccord of [-3, 3]) {
          const o = ctx.createOscillator(), g = ctx.createGain();
          o.type = 'triangle';
          o.frequency.value = f / 2;
          o.detune.value = desaccord;
          g.gain.setValueAtTime(0.0001, t);
          g.gain.exponentialRampToValueAtTime(0.05, t + 2.5);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 8.5);
          o.connect(g).connect(maitre);
          o.start(t);
          o.stop(t + 9);
        }
      }
      i++;
    }
    return {
      demarrer() {
        try {
          if (!ctx) {
            ctx = new (window.AudioContext || window.webkitAudioContext)();
            const filtre = ctx.createBiquadFilter();
            filtre.type = 'lowpass';
            filtre.frequency.value = 900;
            maitre = ctx.createGain();
            maitre.gain.value = 0.35;
            maitre.connect(filtre).connect(ctx.destination);
          }
          ctx.resume();
          if (!minuteur) { jouerAccord(); minuteur = setInterval(jouerAccord, 8000); }
        } catch (e) { /* audio indisponible */ }
      },
      arreter() {
        clearInterval(minuteur);
        minuteur = null;
        if (ctx) ctx.suspend();
      },
    };
  })();

  // ---------- Bruitages dramatiques (générés, sans fichier) ----------
  const bruitage = (() => {
    let ctx = null;
    const actif = () => !etat || etat.musique !== false;
    function contexte() {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      ctx.resume();
      return ctx;
    }
    function bruit(duree) {
      const c = contexte();
      const tampon = c.createBuffer(1, c.sampleRate * duree, c.sampleRate);
      const d = tampon.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      const src = c.createBufferSource();
      src.buffer = tampon;
      return src;
    }
    function grave(freq, duree, volume, delai = 0) {
      const c = contexte();
      const t = c.currentTime + delai;
      const o = c.createOscillator(), g = c.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(freq, t);
      o.frequency.exponentialRampToValueAtTime(Math.max(20, freq * 0.4), t + duree);
      g.gain.setValueAtTime(volume, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + duree);
      o.connect(g).connect(c.destination);
      o.start(t);
      o.stop(t + duree + 0.05);
    }
    const securise = (fn) => (...args) => { if (!actif()) return; try { fn(...args); } catch (e) { /* audio indisponible */ } };
    return {
      // coup sourd de bande-annonce
      boom: securise(() => { grave(110, 1.6, 0.6); grave(55, 2.2, 0.5); }),
      // tampon qui s'abat sur le dossier
      tampon: securise(() => {
        const c = contexte(), src = bruit(0.25), f = c.createBiquadFilter(), g = c.createGain();
        f.type = 'lowpass'; f.frequency.value = 900;
        g.gain.setValueAtTime(0.9, c.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.25);
        src.connect(f).connect(g).connect(c.destination);
        src.start();
        grave(80, 0.5, 0.7);
      }),
      // roulement de tambour qui monte
      roulement: securise((duree) => {
        const c = contexte(), src = bruit(duree), f = c.createBiquadFilter(), g = c.createGain(), lfo = c.createOscillator(), lg = c.createGain();
        f.type = 'bandpass'; f.frequency.value = 180; f.Q.value = 0.8;
        g.gain.setValueAtTime(0.05, c.currentTime);
        g.gain.linearRampToValueAtTime(0.5, c.currentTime + duree);
        lfo.frequency.value = 18; lg.gain.value = 0.25;
        lfo.connect(lg).connect(g.gain);
        src.connect(f).connect(g).connect(c.destination);
        src.start(); lfo.start(); lfo.stop(c.currentTime + duree);
      }),
      // battement de cœur quand il reste peu de questions
      battement: securise(() => { grave(65, 0.18, 0.7); grave(60, 0.2, 0.55, 0.22); }),
      // petit déclic de machine à écrire
      touche: securise(() => {
        const c = contexte(), src = bruit(0.03), f = c.createBiquadFilter(), g = c.createGain();
        f.type = 'highpass'; f.frequency.value = 2500;
        g.gain.value = 0.08;
        src.connect(f).connect(g).connect(c.destination);
        src.start();
      }),
    };
  })();

  function majBoutonSon() {
    $('btn-son').classList.toggle('off', !etat.musique);
    $('btn-son').title = etat.musique ? 'Couper le son' : 'Activer le son';
  }

  // ---------- Pluie sur l'écran d'accueil ----------
  const pluie = (() => {
    const canvas = $('pluie');
    const ctx2d = canvas.getContext('2d');
    let gouttes = [], animId = null;
    function dimensionner() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      const n = Math.round((canvas.width * canvas.height) / 9000);
      gouttes = Array.from({ length: n }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        l: 10 + Math.random() * 22,
        v: 9 + Math.random() * 10,
        a: 0.1 + Math.random() * 0.35,
      }));
    }
    function image() {
      ctx2d.clearRect(0, 0, canvas.width, canvas.height);
      ctx2d.lineWidth = 1;
      for (const g of gouttes) {
        ctx2d.strokeStyle = `rgba(190, 200, 230, ${g.a})`;
        ctx2d.beginPath();
        ctx2d.moveTo(g.x, g.y);
        ctx2d.lineTo(g.x - g.l * 0.18, g.y + g.l);
        ctx2d.stroke();
        g.y += g.v;
        g.x -= g.v * 0.18;
        if (g.y > canvas.height) { g.y = -g.l; g.x = Math.random() * (canvas.width + 100); }
      }
      animId = requestAnimationFrame(image);
    }
    return {
      demarrer() {
        if (animId || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        dimensionner();
        image();
      },
      arreter() { cancelAnimationFrame(animId); animId = null; },
      dimensionner,
    };
  })();
  window.addEventListener('resize', () => { if (!$('ecran-accueil').classList.contains('hidden')) pluie.dimensionner(); });

  // texte qui s'écrit lettre par lettre, façon machine à écrire
  let machineId = null;
  function machineAEcrire(el, texte, vitesse = 22) {
    clearInterval(machineId);
    el.textContent = '';
    el.classList.add('ecrit-encore');
    let i = 0;
    machineId = setInterval(() => {
      el.textContent = texte.slice(0, ++i);
      if (i % 3 === 0) bruitage.touche();
      if (i >= texte.length) { clearInterval(machineId); el.classList.remove('ecrit-encore'); }
    }, vitesse);
  }

  const pause = (ms) => new Promise((r) => setTimeout(r, ms));

  function secouer() {
    document.body.classList.remove('secousse');
    void document.body.offsetWidth;
    document.body.classList.add('secousse');
  }

  // ---------- Écrans ----------
  function afficher(ecran) {
    for (const id of ['accueil', 'briefing', 'enquete', 'fin']) $(`ecran-${id}`).classList.toggle('hidden', id !== ecran);
    document.body.classList.toggle('en-enquete', ecran === 'enquete');
    window.scrollTo(0, 0);
    if (etat) { etat.ecran = ecran === 'accueil' ? etat.ecran : ecran; sauver(); }
    clearInterval(chronoId);
    if (ecran === 'enquete') {
      renderEnquete();
      chronoId = setInterval(() => {
        if (document.hidden) return;
        etat.secondes++;
        $('chrono').textContent = duree(etat.secondes);
        if (etat.secondes % 5 === 0) sauver();
      }, 1000);
      if (etat.musique) ambiance.demarrer();
    } else {
      ambiance.arreter();
    }
    if (ecran === 'accueil') pluie.demarrer(); else pluie.arreter();
    if (ecran !== 'briefing') clearInterval(machineId);
    if (ecran === 'briefing') renderBriefing();
    if (ecran === 'fin') renderFin();
  }

  const SILHOUETTE = '<svg class="silhouette" viewBox="0 0 100 130" aria-hidden="true"><circle cx="50" cy="34" r="22"/><path d="M6 130 Q8 72 50 66 Q92 72 94 130Z"/></svg>';
  const etoiles = (n) => `<span class="etoiles">${'★'.repeat(n)}<span class="eteintes">${'★'.repeat(4 - n)}</span></span>`;

  function renderAccueil() {
    const sauvegarde = charger();
    const enCours = sauvegarde && !sauvegarde.resultat ? sauvegarde.affaireId : null;
    const res = resultats();
    $('liste-affaires').innerHTML = affaires.map((a) => {
      const r = res[a.id];
      const tampon = r
        ? `<div class="tampon tampon-coin ${r.gagne ? 'vert' : ''}">${r.gagne ? `Résolue · ${r.score} pts` : 'Échec'}</div>`
        : '';
      return `<article class="dossier-affaire niveau-${a.niveau}">
        <div class="dossier-photo">${SILHOUETTE}<span class="dossier-etiquette">Affaire n° ${a.numero}</span><span class="badge-niveau">${echapper(a.niveauLabel)}</span></div>
        <div class="dossier-corps">
          ${tampon}
          <p class="surtitre">${etoiles(a.niveau)} · ${echapper(a.niveauLabel)}</p>
          <h2>${echapper(a.titre)}</h2>
          <p class="dossier-accroche">${echapper(a.accroche)}</p>
          <div class="avatars-empiles">${a.suspects.map((s) => portrait(s.portrait)).join('')}</div>
          <div class="dossier-meta"><span>${a.suspects.length} suspects</span><span>${a.questions} questions</span><span>${echapper(a.duree)}</span></div>
          <div class="actions-affaire">
            ${a.id === enCours ? `<button class="btn btn-principal" data-reprendre="${a.id}">Reprendre</button><button class="btn btn-fantome" data-ouvrir="${a.id}">Recommencer</button>`
              : `<button class="btn btn-principal" data-ouvrir="${a.id}">${r ? 'Rejouer' : 'Ouvrir le dossier'}</button>`}
          </div>
        </div>
      </article>`;
    }).join('');
    $('btn-commencer').disabled = false;
    $('bandeau-demo').classList.toggle('hidden', !modeDemo);
    $('btn-reprendre').classList.toggle('hidden', !sauvegarde);
    $('btn-reprendre').textContent = sauvegarde && sauvegarde.resultat ? 'Voir mon dernier résultat' : 'Reprendre mon enquête';
  }

  function ouvrirAffaire(id) {
    const sauvegarde = charger();
    if (sauvegarde && !sauvegarde.resultat && !confirm('Commencer cette enquête ? Ta partie en cours sera effacée.')) return;
    affaire = affaires.find((a) => a.id === id);
    etat = nouvelEtat();
    sauver();
    bruitage.boom();
    afficher('briefing');
  }

  function reprendre() {
    const sauvegarde = charger();
    const a = sauvegarde && affaires.find((x) => x.id === sauvegarde.affaireId);
    if (!a) return;
    affaire = a;
    etat = sauvegarde;
    afficher(etat.resultat ? 'fin' : etat.ecran === 'fin' ? 'enquete' : etat.ecran);
  }

  function renderBriefing() {
    const v = affaire.victime;
    $('brief-numero').textContent = `Affaire n° ${affaire.numero} · ${affaire.niveauLabel}`;
    $('brief-titre').textContent = affaire.titre;
    $('brief-victime').textContent = `${v.nom}${v.age ? `, ${v.age} ans` : ''}. ${v.description}`;
    $('brief-lieu').textContent = affaire.lieu;
    $('brief-date').textContent = affaire.date;
    machineAEcrire($('brief-resume'), `${affaire.resume} Tu as ${affaire.questions} questions pour trouver la vérité.`);
    $('brief-suspects').innerHTML = affaire.suspects.map((s, i) => `
      <article class="fiche-suspect" data-numero="0${i + 1}">
        ${portrait(s.portrait)}
        <h4>${echapper(s.nom)}, ${s.age} ans</h4>
        <p class="role">${echapper(s.role)}</p>
        <p>${echapper(s.description)}</p>
      </article>`).join('');
  }

  // ---------- Enquête ----------
  function renderEnquete() {
    $('enquete-titre').textContent = affaire.titre;
    $('chrono').textContent = duree(etat.secondes);
    $('vue-pieces').innerHTML = affaire.preuves.map((p) => `
      <article class="piece" draggable="true" data-preuve="${p.id}">
        <div class="piece-haut"><div class="photo">${p.icone}</div><h4>${echapper(p.titre)}</h4></div>
        <p>${echapper(p.texte)}</p>
        <button class="btn-montrer" data-montrer="${p.id}">📎 Montrer au suspect</button>
      </article>`).join('');
    $('vue-suspects').innerHTML = affaire.suspects.map((s) => `
      <div class="mini-suspect">
        ${portrait(s.portrait)}
        <div><h4>${echapper(s.nom)}, ${s.age} ans</h4><p class="role">${echapper(s.role)}</p><p>${echapper(s.description)}</p></div>
      </div>`).join('');
    $('vue-chrono').innerHTML = `<ol class="chronologie">${affaire.chronologie
      .map((c) => `<li><b>${echapper(c.heure)}</b>${echapper(c.texte)}</li>`).join('')}</ol>`;
    $('notes').value = etat.notes;
    majBoutonSon();
    renderChoixSuspect();
    renderMessages();
    renderCarnet();
    majCompteur();
  }

  function renderChoixSuspect() {
    $('choix-suspect').innerHTML = affaire.suspects.map((s) => {
      const nb = (etat.conversations[s.id] || []).length / 2;
      return `<button class="btn-suspect ${s.id === etat.suspectActif ? 'actif' : ''}" data-suspect="${s.id}">
        ${portrait(s.portrait)}<span>${echapper(s.nom.split(' ')[0])}</span>${nb ? `<span class="nb">${nb}</span>` : ''}
      </button>`;
    }).join('');
  }

  function bulleJoueur(m) {
    const preuve = m.preuveId ? preuvePar(m.preuveId) : null;
    const etiquette = preuve ? `<span class="etiquette-preuve">${preuve.icone} Pièce montrée : ${echapper(preuve.titre)}</span>` : '';
    return `<div class="ligne-msg joueur"><div class="bulle joueur">${etiquette}${echapper(m.affichage || '')}</div></div>`;
  }

  const ligneSuspect = (s, contenu, classe = '') =>
    `<div class="ligne-msg suspect">${portrait(s.portrait, 'avatar')}<div class="bulle suspect ${classe}">${contenu}</div></div>`;

  function renderMessages() {
    const s = suspectPar(etat.suspectActif);
    const conv = etat.conversations[s.id] || [];
    let html = '';
    if (!conv.length) {
      html = `<div class="intro-suspect">${portrait(s.portrait)}<h3>${echapper(s.nom)}</h3>
        <p class="intro-role">${echapper(s.role)}</p>
        <p>Sous la lampe, le silence. Pose ta première question, ou mets-lui une pièce sous les yeux.</p></div>`;
    }
    for (const m of conv) {
      html += m.role === 'user' ? bulleJoueur(m) : ligneSuspect(s, formater(m.affichage));
    }
    $('messages').innerHTML = html;
    defilerEnBas();
  }

  const defilerEnBas = () => { $('messages').scrollTop = $('messages').scrollHeight; };

  function renderCarnet(nouveauId) {
    const liste = $('liste-indices');
    if (!etat.indices.length) {
      liste.innerHTML = '<li class="vide">Aucun indice pour l\'instant. Interroge les suspects !</li>';
      return;
    }
    liste.innerHTML = etat.indices.map((i) => `
      <li class="${i.id === nouveauId ? 'nouveau' : ''}"><small>${echapper(suspectPar(i.suspect).nom)}</small>${echapper(i.texte)}</li>`).join('');
  }

  function majCompteur() {
    const restantes = maxQuestions() - etat.utilisees;
    $('compteur').textContent = `${restantes}/${maxQuestions()}`;
    $('jauge').style.width = `${(restantes / maxQuestions()) * 100}%`;
    document.querySelector('.jauge').classList.toggle('bas', restantes <= 5);
    const fini = restantes <= 0;
    $('saisie').disabled = fini || enAttente;
    $('btn-envoyer').disabled = fini || enAttente;
    $('btn-preuve').disabled = fini || enAttente;
    $('saisie').placeholder = fini ? 'Plus de questions : il est temps d\'accuser !' : 'Pose ta question…';
  }

  function joindrePreuve(id) {
    preuveJointe = id;
    const p = preuvePar(id);
    $('preuve-jointe').innerHTML = `${p.icone} ${echapper(p.titre)} <button type="button" title="Retirer">✕</button>`;
    $('preuve-jointe').classList.remove('hidden');
    $('preuve-jointe').querySelector('button').onclick = retirerPreuve;
    montrerPanneau('panneau-chat');
    $('saisie').focus();
  }

  function retirerPreuve() {
    preuveJointe = null;
    $('preuve-jointe').classList.add('hidden');
  }

  async function envoyer() {
    if (enAttente) return;
    const question = $('saisie').value.trim();
    if (!question && !preuveJointe) { toast('Écris une question ou joins une pièce.'); return; }
    if (question.length > MAX_CARACTERES) { toast(`200 caractères maximum.`); return; }
    if (etat.utilisees >= maxQuestions()) { toast(`Tu as utilisé tes ${maxQuestions()} questions. Il est temps d'accuser !`); return; }

    const suspectId = etat.suspectActif;
    const conv = etat.conversations[suspectId] || [];
    const preuveId = preuveJointe;
    const messageJoueur = { role: 'user', affichage: question, preuveId };

    // affichage immédiat de la question et de l'indicateur de frappe
    if (!conv.length) $('messages').innerHTML = '';
    $('messages').insertAdjacentHTML('beforeend', bulleJoueur(messageJoueur));
    const suspect = suspectPar(suspectId);
    $('messages').insertAdjacentHTML('beforeend', ligneSuspect(suspect, '<span></span><span></span><span></span>', 'ecrit'));
    $('messages').lastElementChild.id = 'ecrit';
    defilerEnBas();
    $('saisie').value = '';
    majNbCar();
    retirerPreuve();
    enAttente = true;
    majCompteur();

    try {
      const data = await api('ask', {
        affaireId: affaire.id,
        suspectId,
        question,
        preuveId,
        historique: conv.map(({ role, content }) => ({ role, content })),
      });
      messageJoueur.content = data.contenuQuestion;
      etat.conversations[suspectId] = [...conv, messageJoueur,
        { role: 'assistant', content: data.contenuReponse, affichage: data.reponse }];
      etat.utilisees++;
      ajouterIndices(data.indices, suspectId);
      sauver();
      $('ecrit')?.remove();
      await taper(suspect, data.reponse);
      renderChoixSuspect();
    } catch (err) {
      $('ecrit')?.remove();
      $('messages').lastElementChild?.remove();
      $('messages').insertAdjacentHTML('beforeend', `<div class="bulle erreur-bulle">${echapper(err.message)} Ta question n'a pas été comptée.</div>`);
      $('saisie').value = question;
      if (preuveId) joindrePreuve(preuveId);
      defilerEnBas();
    } finally {
      enAttente = false;
      majCompteur();
      const restantes = maxQuestions() - etat.utilisees;
      if (restantes <= 5 && restantes > 0) bruitage.battement();
      if (restantes <= 0) toast('C\'était ta dernière question. À toi d\'accuser !');
    }
  }

  // effet de frappe pour la réponse du suspect
  function taper(suspect, texte) {
    return new Promise((resolve) => {
      $('messages').insertAdjacentHTML('beforeend', ligneSuspect(suspect, ''));
      const bulle = $('messages').lastElementChild.querySelector('.bulle');
      let i = 0;
      const pas = Math.max(1, Math.round(texte.length / 120));
      const id = setInterval(() => {
        i = Math.min(texte.length, i + pas);
        bulle.textContent = texte.slice(0, i);
        defilerEnBas();
        if (i >= texte.length) {
          clearInterval(id);
          bulle.innerHTML = formater(texte);
          resolve();
        }
      }, 18);
    });
  }

  function ajouterIndices(indices, suspectId) {
    let dernier = null;
    for (const ind of indices || []) {
      if (etat.indices.some((x) => x.id === ind.id)) continue;
      etat.indices.push({ ...ind, suspect: suspectId });
      dernier = ind.id;
    }
    if (dernier) {
      renderCarnet(dernier);
      flashIndice(etat.indices.find((x) => x.id === dernier).texte);
      if (!$('panneau-carnet').classList.contains('visible')) $('pastille-carnet').classList.remove('hidden');
    }
  }

  let flashId = null;
  function flashIndice(texte) {
    const f = $('flash-indice');
    $('flash-texte').textContent = texte;
    f.classList.add('hidden');
    void f.offsetWidth;
    f.classList.remove('hidden');
    bruitage.boom();
    clearTimeout(flashId);
    flashId = setTimeout(() => f.classList.add('hidden'), 3300);
  }

  function montrerPanneau(id) {
    for (const p of ['panneau-dossier', 'panneau-chat', 'panneau-carnet']) $(p).classList.toggle('visible', p === id);
    document.querySelectorAll('.nav-mobile button').forEach((b) => b.classList.toggle('actif', b.dataset.panneau === id));
    if (id === 'panneau-carnet') $('pastille-carnet').classList.add('hidden');
  }

  function majNbCar() {
    $('nb-car').textContent = `${$('saisie').value.length}/${MAX_CARACTERES}`;
    $('saisie').style.height = 'auto';
    $('saisie').style.height = `${Math.min(120, $('saisie').scrollHeight + 4)}px`;
  }

  // ---------- Accusation ----------
  function ouvrirAccusation() {
    $('acc-suspects').innerHTML = affaire.suspects.map((s) => `
      <label><input type="radio" name="suspect" value="${s.id}">${portrait(s.portrait)}${echapper(s.nom)}</label>`).join('');
    $('acc-mobiles').innerHTML = affaire.mobiles.map((m) => `
      <label><input type="radio" name="mobile" value="${m.id}"> ${echapper(m.texte)}</label>`).join('');
    $('acc-preuves').innerHTML = affaire.preuves.map((p) => `
      <label><input type="radio" name="preuve" value="${p.id}"> ${p.icone} ${echapper(p.titre)}</label>`).join('');
    $('acc-erreur').textContent = '';
    confirmationEnAttente = false;
    const bouton = $('form-accusation').querySelector('[type=submit]');
    bouton.textContent = 'J\'accuse !';
    bouton.classList.remove('confirmer');
    $('modale-accusation').classList.remove('hidden');
  }

  let confirmationEnAttente = false;

  // la grande scène : roulement de tambour, puis le tampon tombe
  async function sceneAccusation(suspect, resultat) {
    const c = $('cinema');
    $('cinema-label').textContent = 'J\'accuse…';
    $('cinema-portrait').innerHTML = portrait(suspect.portrait);
    $('cinema-nom').textContent = suspect.nom;
    const tampon = $('cinema-tampon');
    tampon.className = 'cinema-tampon';
    tampon.textContent = resultat.gagne ? 'Coupable' : 'Innocent';
    c.classList.remove('hidden', 'secousse');
    bruitage.roulement(2.6);
    await pause(2700);
    tampon.classList.add('frappe');
    if (resultat.gagne) tampon.classList.add('vert');
    bruitage.tampon();
    c.classList.add('secousse');
    await pause(2200);
    c.classList.add('hidden');
  }

  async function accuser(e) {
    e.preventDefault();
    const f = new FormData($('form-accusation'));
    const suspectId = f.get('suspect'), mobileId = f.get('mobile'), preuveId = f.get('preuve');
    if (!suspectId || !mobileId || !preuveId) {
      $('acc-erreur').textContent = 'Choisis un coupable, un mobile et une preuve.';
      return;
    }
    const suspect = suspectPar(suspectId);
    const bouton = $('form-accusation').querySelector('[type=submit]');
    // deux clics pour accuser : c'est définitif
    if (!confirmationEnAttente) {
      confirmationEnAttente = true;
      bouton.textContent = `Confirmer : ${suspect.nom.split(' ')[0]} ?`;
      bouton.classList.add('confirmer');
      $('acc-erreur').textContent = 'C\'est définitif. Clique encore pour confirmer.';
      return;
    }
    try {
      const resultat = await api('accuse', {
        affaireId: affaire.id, suspectId, mobileId, preuveId,
        questionsRestantes: maxQuestions() - etat.utilisees,
        secondes: etat.secondes,
      });
      resultat.accuse = suspect.nom;
      etat.resultat = resultat;
      sauver();
      enregistrerResultat(resultat);
      $('modale-accusation').classList.add('hidden');
      clearInterval(chronoId);
      ambiance.arreter();
      await sceneAccusation(suspect, resultat);
      afficher('fin');
    } catch (err) {
      $('acc-erreur').textContent = err.message;
    }
  }

  function renderFin() {
    const r = etat.resultat;
    const tampon = $('fin-tampon');
    tampon.textContent = r.gagne ? 'Affaire résolue' : 'Affaire classée';
    tampon.classList.toggle('vert', r.gagne);
    tampon.classList.remove('frappe');
    void tampon.offsetWidth;
    tampon.classList.add('frappe');
    $('fin-titre').textContent = r.gagne ? 'Justice est faite.' : 'Le coupable court toujours.';
    let sous = r.gagne
      ? `Tu as démasqué ${r.coupable.nom}.`
      : `Tu as accusé ${r.accuse}, mais le coupable était ${r.coupable.nom}. L'enquête est perdue.`;
    if (r.gagne) {
      sous += r.bonMobile ? ' Tu as aussi trouvé le bon mobile.' : ` Le vrai mobile : ${r.mobile.toLowerCase()}.`;
      if (r.niveauPreuve === 'decisive') sous += ' Et ta preuve était décisive.';
      else if (r.niveauPreuve === 'faible') sous += ' Mais ta preuve n\'aurait pas tenu devant un juge.';
    }
    $('fin-sous-titre').textContent = sous;
    $('fin-revelation').textContent = r.revelation;
    const lignes = r.detail.map((d) => `<tr><td>${echapper(d.libelle)}</td><td>+${d.points}</td></tr>`).join('');
    $('fin-score').innerHTML = `
      <h3 class="section-titre">Score</h3>
      <div class="score-total">${r.score} <small>pts</small></div>
      ${lignes ? `<table>${lignes}</table>` : ''}
      <p class="aide">${etat.utilisees} question(s) utilisée(s) · durée ${duree(etat.secondes)}${r.multiplicateur > 1 ? ` · points ×${r.multiplicateur} (niveau ${echapper(affaire.niveauLabel)})` : ''}</p>`;
  }

  // ---------- Événements ----------
  $('btn-commencer').addEventListener('click', () => $('liste-affaires').scrollIntoView({ behavior: 'smooth' }));
  $('btn-reprendre').addEventListener('click', reprendre);
  $('liste-affaires').addEventListener('click', (e) => {
    const ouvrir = e.target.closest('[data-ouvrir]');
    if (ouvrir) ouvrirAffaire(ouvrir.dataset.ouvrir);
    if (e.target.closest('[data-reprendre]')) reprendre();
  });
  $('btn-ouvrir-dossier').addEventListener('click', () => afficher('enquete'));
  $('btn-rejouer').addEventListener('click', () => {
    effacer();
    etat = null;
    renderAccueil();
    afficher('accueil');
  });

  $('btn-son').addEventListener('click', () => {
    etat.musique = !etat.musique;
    if (etat.musique) ambiance.demarrer(); else ambiance.arreter();
    majBoutonSon();
    sauver();
  });

  document.querySelectorAll('.onglet').forEach((o) => o.addEventListener('click', () => {
    document.querySelectorAll('.onglet').forEach((x) => x.classList.toggle('actif', x === o));
    for (const v of ['pieces', 'suspects', 'chrono']) $(`vue-${v}`).classList.toggle('hidden', v !== o.dataset.vue);
  }));

  $('choix-suspect').addEventListener('click', (e) => {
    const b = e.target.closest('[data-suspect]');
    if (!b || enAttente) return;
    etat.suspectActif = b.dataset.suspect;
    sauver();
    renderChoixSuspect();
    renderMessages();
  });

  $('formulaire').addEventListener('submit', (e) => { e.preventDefault(); envoyer(); });
  $('saisie').addEventListener('input', majNbCar);
  $('saisie').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); envoyer(); }
  });

  $('notes').addEventListener('input', () => { etat.notes = $('notes').value; sauver(); });

  // Montrer une preuve : bouton, fenêtre de choix, ou glisser-déposer dans la conversation
  $('vue-pieces').addEventListener('click', (e) => {
    const b = e.target.closest('[data-montrer]');
    if (b && etat.utilisees < maxQuestions()) joindrePreuve(b.dataset.montrer);
  });
  $('vue-pieces').addEventListener('dragstart', (e) => {
    const p = e.target.closest('[data-preuve]');
    if (p) e.dataTransfer.setData('text/plain', `preuve:${p.dataset.preuve}`);
  });
  const chat = $('panneau-chat');
  let profondeur = 0;
  chat.addEventListener('dragenter', (e) => { e.preventDefault(); profondeur++; $('zone-depot').classList.remove('hidden'); });
  chat.addEventListener('dragleave', () => { if (--profondeur <= 0) { profondeur = 0; $('zone-depot').classList.add('hidden'); } });
  chat.addEventListener('dragover', (e) => e.preventDefault());
  chat.addEventListener('drop', (e) => {
    e.preventDefault();
    profondeur = 0;
    $('zone-depot').classList.add('hidden');
    const data = e.dataTransfer.getData('text/plain');
    if (data.startsWith('preuve:') && etat.utilisees < maxQuestions()) joindrePreuve(data.slice(7));
  });

  $('btn-preuve').addEventListener('click', () => {
    $('liste-choix-preuves').innerHTML = affaire.preuves.map((p) => `
      <button type="button" class="choix-preuve" data-choix="${p.id}"><span>${p.icone}</span><span>${echapper(p.titre)}</span></button>`).join('');
    $('modale-preuve').classList.remove('hidden');
  });
  $('liste-choix-preuves').addEventListener('click', (e) => {
    const b = e.target.closest('[data-choix]');
    if (!b) return;
    $('modale-preuve').classList.add('hidden');
    joindrePreuve(b.dataset.choix);
  });

  $('btn-accuser').addEventListener('click', ouvrirAccusation);
  $('form-accusation').addEventListener('submit', accuser);
  $('form-accusation').addEventListener('change', () => {
    if (!confirmationEnAttente) return;
    confirmationEnAttente = false;
    const bouton = $('form-accusation').querySelector('[type=submit]');
    bouton.textContent = 'J\'accuse !';
    bouton.classList.remove('confirmer');
    $('acc-erreur').textContent = '';
  });

  document.querySelectorAll('[data-fermer]').forEach((b) => b.addEventListener('click', () => b.closest('.modale').classList.add('hidden')));
  document.querySelectorAll('.modale').forEach((m) => m.addEventListener('click', (e) => { if (e.target === m) m.classList.add('hidden'); }));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.querySelectorAll('.modale').forEach((m) => m.classList.add('hidden'));
  });

  document.querySelectorAll('.nav-mobile button').forEach((b) => b.addEventListener('click', () => montrerPanneau(b.dataset.panneau)));

  // ---------- Démarrage ----------
  montrerPanneau('panneau-chat');
  pluie.demarrer();
  api('case')
    .catch(async () => {
      await chargerModeLocal();
      return api('case');
    })
    .then((data) => { affaires = data.affaires; modeDemo = data.modeDemo; renderAccueil(); })
    .catch(() => { $('liste-affaires').innerHTML = '<p class="aide">Impossible de charger les affaires.</p>'; });
})();
