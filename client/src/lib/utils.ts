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
