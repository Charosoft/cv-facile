// Nettoyage du texte saisi, partagé par tous les modèles de CV.

// "• texte" ou "- texte" par ligne -> liste de puces propres.
// Texte copié d'un PDF : les retours à la ligne forcés coupent les phrases ; une ligne sans puce
// qui commence par une minuscule est donc la suite de la puce précédente.
export const puces = (t = '') => {
  const out: string[] = []
  for (const brut of t.split('\n')) {
    const l = brut.trim()
    if (!l) continue
    const marque = /^[•*–-]\s*/.test(l)
    const texte = l.replace(/^[•*–-]\s*/, '')
    if (!marque && out.length && /^\p{Ll}/u.test(texte)) out[out.length - 1] += ' ' + texte
    else out.push(texte)
  }
  return out
}

// Profil : les retours à la ligne simples sont ignorés, une ligne vide sépare deux paragraphes
export const paragraphes = (t = '') =>
  t.split(/\n{2,}/).map((x) => x.replace(/\s*\n\s*/g, ' ').trim()).filter(Boolean)

// Texte long aligné des deux côtés, avec césure automatique (la page est en lang="fr")
export const JUSTIFIE = 'text-justify hyphens-auto'
