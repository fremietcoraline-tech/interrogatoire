'use strict';

(() => {
  const MAX_QUESTIONS = 20;
  const MAX_CARACTERES = 200;
  const CLE_SAUVEGARDE = 'interrogatoire-belvedere-v1';
  const $ = (id) => document.getElementById(id);

  let affaire = null;        // données publiques de l'affaire (sans la solution)
  let etat = null;           // partie en cours, sauvegardée sur l'appareil
  let preuveJointe = null;
  let enAttente = false;
  let chronoId = null;

  // ---------- Sauvegarde locale ----------
  function charger() {
    try { const s = localStorage.getItem(CLE_SAUVEGARDE); return s ? JSON.parse(s) : null; } catch (e) { return null; }
  }
  function sauver() {
    try { localStorage.setItem(CLE_SAUVEGARDE, JSON.stringify(etat)); } catch (e) { /* stockage indisponible */ }
  }
  function effacer() {
    try { localStorage.removeItem(CLE_SAUVEGARDE); } catch (e) { /* stockage indisponible */ }
  }

  function nouvelEtat() {
    return {
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
  const formater = (s) => echapper(s).replace(/\*([^*\n]+)\*/g, '<span class="attitude">$1</span>');
  const suspectPar = (id) => affaire.suspects.find((s) => s.id === id);
  const preuvePar = (id) => affaire.preuves.find((p) => p.id === id);
  const duree = (sec) => `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;

  // Sans serveur (GitHub Pages), le jeu tourne en mode démo directement dans le navigateur.
  let local = null;

  async function chargerModeLocal() {
    const [moteur, demo, scenario] = await Promise.all([
      import('./lib/moteur.js'), import('./lib/demo.js'), import('./lib/affaire-belvedere.js'),
    ]);
    local = {
      case: () => ({ ...scenario.publicCase, modeDemo: true }),
      ask: async (corps) => {
        const q = moteur.preparerQuestion(corps);
        await new Promise((r) => setTimeout(r, 500 + Math.random() * 600));
        return moteur.finaliserReponse(demo.repondreDemo(q.suspectId, q.messages, q.preuve?.id), q.suspectId, q.contenu, true);
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
    }[p.coiffure] || '';
    const accessoires = {
      lunettes: `<g fill="none" stroke="${encre}" stroke-width="2"><circle cx="42" cy="47" r="6"/><circle cx="58" cy="47" r="6"/><path d="M48 47h4"/></g>`,
      toque: `<path d="M31 32 Q26 13 39 15 Q43 4 54 8 Q66 4 68 17 Q77 18 69 32Z" fill="#fff" stroke="${encre}" stroke-width="1.5"/>`,
      tablier: `<path d="M39 84 L39 100 L61 100 L61 84Z" fill="#241510"/><path d="M39 84 L33 75 M61 84 L67 75" stroke="#241510" stroke-width="3"/>`,
      barbe: `<path d="M33 52 Q35 72 50 73 Q65 72 67 52 Q60 63 50 63 Q40 63 33 52Z" fill="${p.cheveux}"/>`,
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

  function majBoutonSon() {
    $('btn-son').classList.toggle('off', !etat.musique);
    $('btn-son').title = etat.musique ? 'Couper la musique' : 'Activer la musique';
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
    if (ecran === 'briefing') renderBriefing();
    if (ecran === 'fin') renderFin();
  }

  function renderAccueil() {
    $('accueil-accroche').textContent = affaire.accroche;
    $('accueil-suspects').innerHTML = affaire.suspects.map((s) => portrait(s.portrait)).join('');
    $('btn-commencer').disabled = false;
    $('bandeau-demo').classList.toggle('hidden', !affaire.modeDemo);
    const sauvegarde = charger();
    $('btn-reprendre').classList.toggle('hidden', !sauvegarde);
    $('btn-reprendre').textContent = sauvegarde && sauvegarde.resultat ? 'Voir mon résultat' : 'Reprendre l\'enquête';
  }

  function renderBriefing() {
    $('brief-titre').textContent = affaire.titre;
    $('brief-victime').textContent = `${affaire.victime.nom}, ${affaire.victime.age} ans. ${affaire.victime.description}`;
    $('brief-lieu').textContent = affaire.lieu;
    $('brief-date').textContent = affaire.date;
    $('brief-resume').textContent = affaire.resume;
    $('brief-suspects').innerHTML = affaire.suspects.map((s) => `
      <article class="fiche-suspect">
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
        <p>${echapper(s.role)}. Pose ta première question, ou montre-lui une pièce du dossier.</p></div>`;
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
    const restantes = MAX_QUESTIONS - etat.utilisees;
    $('compteur').textContent = `${restantes}/${MAX_QUESTIONS}`;
    $('jauge').style.width = `${(restantes / MAX_QUESTIONS) * 100}%`;
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
    if (etat.utilisees >= MAX_QUESTIONS) { toast('Tu as utilisé tes 20 questions. Il est temps d\'accuser !'); return; }

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
      if (etat.utilisees >= MAX_QUESTIONS) toast('C\'était ta dernière question. À toi d\'accuser !');
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
      toast('📓 Nouvel indice ajouté au carnet');
      if (!$('panneau-carnet').classList.contains('visible')) $('pastille-carnet').classList.remove('hidden');
    }
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
    $('modale-accusation').classList.remove('hidden');
  }

  async function accuser(e) {
    e.preventDefault();
    const f = new FormData($('form-accusation'));
    const suspectId = f.get('suspect'), mobileId = f.get('mobile'), preuveId = f.get('preuve');
    if (!suspectId || !mobileId || !preuveId) {
      $('acc-erreur').textContent = 'Choisis un coupable, un mobile et une preuve.';
      return;
    }
    const nom = suspectPar(suspectId).nom;
    if (!confirm(`Tu accuses ${nom}. C'est définitif. Confirmer ?`)) return;
    try {
      etat.resultat = await api('accuse', {
        suspectId, mobileId, preuveId,
        questionsRestantes: MAX_QUESTIONS - etat.utilisees,
        secondes: etat.secondes,
      });
      etat.resultat.accuse = nom;
      sauver();
      $('modale-accusation').classList.add('hidden');
      afficher('fin');
    } catch (err) {
      $('acc-erreur').textContent = err.message;
    }
  }

  function renderFin() {
    const r = etat.resultat;
    const tampon = $('fin-tampon');
    tampon.textContent = r.gagne ? 'Affaire résolue' : 'Échec';
    tampon.classList.toggle('vert', r.gagne);
    $('fin-titre').textContent = r.gagne ? 'Bravo, inspecteur !' : 'Mauvaise pioche…';
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
      <p class="aide">${etat.utilisees} question(s) utilisée(s) · durée ${duree(etat.secondes)}</p>`;
  }

  // ---------- Événements ----------
  $('btn-commencer').addEventListener('click', () => {
    if (charger() && !confirm('Commencer une nouvelle enquête ? La partie sauvegardée sera effacée.')) return;
    etat = nouvelEtat();
    sauver();
    afficher('briefing');
  });
  $('btn-reprendre').addEventListener('click', () => {
    etat = charger();
    if (!etat) return;
    afficher(etat.resultat ? 'fin' : etat.ecran === 'fin' ? 'enquete' : etat.ecran);
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
    if (b && etat.utilisees < MAX_QUESTIONS) joindrePreuve(b.dataset.montrer);
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
    if (data.startsWith('preuve:') && etat.utilisees < MAX_QUESTIONS) joindrePreuve(data.slice(7));
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

  document.querySelectorAll('[data-fermer]').forEach((b) => b.addEventListener('click', () => b.closest('.modale').classList.add('hidden')));
  document.querySelectorAll('.modale').forEach((m) => m.addEventListener('click', (e) => { if (e.target === m) m.classList.add('hidden'); }));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.querySelectorAll('.modale').forEach((m) => m.classList.add('hidden'));
  });

  document.querySelectorAll('.nav-mobile button').forEach((b) => b.addEventListener('click', () => montrerPanneau(b.dataset.panneau)));

  // ---------- Démarrage ----------
  montrerPanneau('panneau-chat');
  api('case')
    .catch(async () => {
      await chargerModeLocal();
      return api('case');
    })
    .then((data) => { affaire = data; renderAccueil(); })
    .catch(() => { $('accueil-accroche').textContent = 'Impossible de charger l\'affaire.'; });
})();
