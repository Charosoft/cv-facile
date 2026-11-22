import type { CvState } from '../types'

// "Prénom NOM" -> "Prénom-NOM-CV" (nom du fichier téléchargé)
export const nomFichier = (nom: string) =>
  `${nom.replace(/[\\/:*?"<>|]/g, '').trim().replace(/\s+/g, '-') || 'Mon'}-CV`

// Le navigateur nomme le PDF d'après le titre de la page
export const imprimerPdf = (nom: string) => {
  const avant = document.title
  document.title = nomFichier(nom)
  window.print()
  document.title = avant
}

// La librairie Word est lourde : elle n'est chargée qu'au moment du téléchargement
export async function telechargerWord(etat: CvState) {
  const { construireWord } = await import('./word')
  const blob = await construireWord(etat)
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${nomFichier(etat.data.perso.nom)}.docx`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 10_000)
}
