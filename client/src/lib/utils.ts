// Ajoute https:// si absent (bloque aussi les liens "javascript:")
export const urlSure = (u: string) => (/^https?:\/\//i.test(u) ? u : `https://${u}`)

// Réduit la photo (320px max) pour que la sauvegarde reste légère
export function redimensionner(file: File, max = 320): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      const ratio = Math.min(1, max / Math.max(img.width, img.height))
      const canvas = document.createElement('canvas')
      canvas.width = img.width * ratio
      canvas.height = img.height * ratio
      canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(url)
      resolve(canvas.toDataURL('image/jpeg', 0.85))
    }
    img.onerror = reject
    img.src = url
  })
}

export const messageErreur = (e: unknown) =>
  (e as { message?: string })?.message ?? 'Une erreur est survenue'

// Choisit texte blanc ou sombre selon la clarté de la couleur de fond (#rrggbb)
export const contraste = (hex: string) => {
  const n = parseInt(hex.slice(1), 16)
  const lum = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255
  return lum < 0.6 ? '#ffffff' : '#111827'
}
