// Mode démo : utilisé quand aucune IA n'est disponible (pas de clé d'API, ou version GitHub Pages).
// Chaque affaire déclare dans `demo.regles` une liste de règles par suspect, lues dans l'ordre ;
// la première qui correspond donne la réponse. Champs possibles d'une règle :
//   mots          : la question contient l'un de ces mots (sans accents, en minuscules)
//   preuve        : la pièce montrée est celle-ci (ou l'une de cette liste)
//   requiert      : indices que ce suspect a déjà révélés dans la conversation
//   insistance    : nombre de questions précédentes sur le même sujet avant de céder
//   confrontation : { preuves, indices, min } — nombre de pièces montrées et d'indices révélés pour craquer
//   unique        : ne plus utiliser la règle une fois cet indice révélé
// Sans `mots` ni `preuve`, une règle s'applique à n'importe quelle question dès que ses conditions sont remplies.

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’`]/g, '\'');
const contient = (q, mots) => mots.some((m) => q.includes(norm(m)));

function preuvesMontrees(messages) {
  const ids = new Set();
  for (const m of messages) {
    const match = m.role === 'user' && m.content.match(/\[Pièce montrée : ([a-z_]+)\]/);
    if (match) ids.add(match[1]);
  }
  return ids;
}

function indicesDits(messages) {
  const ids = new Set();
  for (const m of messages) {
    if (m.role !== 'assistant') continue;
    for (const [, id] of m.content.matchAll(/\[\[INDICE:([a-z_]+)\]\]/g)) ids.add(id);
  }
  return ids;
}

const sansPreuve = (texte) => norm(texte.replace(/\[Pièce montrée : [a-z_]+\][^\n]*\n?/, ''));

export function repondreDemo(affaire, suspectId, messages, preuveId) {
  const question = sansPreuve(messages[messages.length - 1].content);
  const precedents = messages.slice(0, -1);
  const montrees = preuvesMontrees(precedents);
  if (preuveId) montrees.add(preuveId);
  const dits = indicesDits(precedents);
  const questionsPrecedentes = precedents.filter((m) => m.role === 'user').map((m) => sansPreuve(m.content));

  for (const r of affaire.demo.regles[suspectId] || []) {
    if (r.unique && dits.has(r.unique)) continue;
    if (r.requiert && !r.requiert.every((id) => dits.has(id))) continue;
    if (r.confrontation) {
      const c = r.confrontation;
      const n = (c.preuves || []).filter((p) => montrees.has(p)).length + (c.indices || []).filter((i) => dits.has(i)).length;
      if (n < c.min) continue;
    }
    let correspond;
    if (r.preuve) correspond = [].concat(r.preuve).includes(preuveId);
    else if (r.mots) correspond = contient(question, r.mots);
    else correspond = true;
    if (!correspond) continue;
    if (r.insistance && questionsPrecedentes.filter((q) => contient(q, r.mots)).length < r.insistance) continue;
    return r.reponse;
  }
  const liste = affaire.demo.parDefaut[suspectId];
  return liste[(precedents.length / 2) % liste.length];
}
