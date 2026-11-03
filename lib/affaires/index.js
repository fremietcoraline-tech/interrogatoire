// Liste des affaires, de la plus facile à la plus difficile.
// Pour ajouter une affaire : crée un fichier sur le modèle de belvedere.js et ajoute-le ici.
import * as rubis from './rubis.js';
import * as belvedere from './belvedere.js';
import * as train from './train.js';
import * as observatoire from './observatoire.js';

export const affaires = [rubis, belvedere, train, observatoire];

export function affaire(id) {
  return affaires.find((a) => a.publicCase.id === id) || null;
}
