import type { CvData, Item } from '../types'

const MOIS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.']
export const MOIS_LONGS = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
]

// Une date est stockée "2023-05" (mois + année) ou "2023" (année seule).
// "2023-05" -> "mai 2023" ; "2023" -> "2023" ; "-05" (année pas encore choisie) -> ""
export const formaterDate = (v = '') => {
  const [a, m] = v.split('-')
  if (!a) return ''
  const i = Number(m) - 1
  return i >= 0 && i < 12 ? `${MOIS[i]} ${a}` : a
}

// "mai 2023 - Présent". Anciens CV (texte libre dans `periode`) : on garde le texte tel quel.
export const periode = (it: Item, mot = 'Présent') => {
  const d = formaterDate(it.debut)
  const f = it.enCours === '1' ? mot : formaterDate(it.fin)
  if (!d && !f) return it.periode ?? ''
  if (d && f) return d === f ? d : `${d} - ${f}`
  return d || f
}

// "2022" se range comme "2022-12" pour comparer avec des dates mois + année
const norm = (v = '') => (v.length === 4 ? `${v}-12` : v)
const fin = (it: Item) => (it.enCours === '1' ? '9999-12' : norm(it.fin || it.debut))
const aUneDate = (it: Item) => Boolean(it.debut || it.fin || it.enCours === '1')

// Plus récent d'abord. On ne trie que si TOUS les éléments ont une date : sinon on respecte l'ordre choisi.
const trier = (l: Item[]) =>
  l.length > 1 && l.every(aUneDate)
    ? [...l].sort((a, b) => fin(b).localeCompare(fin(a)) || norm(b.debut).localeCompare(norm(a.debut)))
    : l

// Données telles que les modèles les affichent : dates formatées + ordre chronologique inverse.
// Les modèles lisent simplement `periode`, ils n'ont pas à connaître le détail.
export const preparer = (d: CvData): CvData => {
  const prep = (l: Item[], mot?: string) => trier(l).map((it) => ({ ...it, periode: periode(it, mot) }))
  return {
    ...d,
    experiences: prep(d.experiences),
    formations: prep(d.formations, 'En cours'),
    stages: prep(d.stages),
  }
}

// Vrai si la fin est avant le début (pour avertir dans le formulaire)
export const finAvantDebut = (it: Item) =>
  it.enCours !== '1' && Boolean(it.debut) && Boolean(it.fin) && norm(it.fin) < norm(it.debut)
