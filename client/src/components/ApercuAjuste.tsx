import { useEffect, useRef, useState, type ReactNode } from 'react'

export const LARGEUR_A4 = 793.7 // 210mm en px
export const HAUTEUR_A4 = 1122.5 // 297mm en px

// Affiche la feuille A4 à l'échelle de l'écran (téléphone, tablette, petit portable)
// et remonte sa hauteur réelle pour savoir si le CV tient sur une page.
// À l'impression, l'échelle est retirée (voir index.css).
export default function ApercuAjuste({ children, onHauteur }: { children: ReactNode; onHauteur?: (px: number) => void }) {
  const boite = useRef<HTMLDivElement>(null)
  const feuille = useRef<HTMLDivElement>(null)
  const [echelle, setEchelle] = useState(1)
  const [hauteur, setHauteur] = useState(HAUTEUR_A4)

  useEffect(() => {
    const b = boite.current
    const f = feuille.current
    if (!b || !f) return
    const mesurer = () => {
      if (b.clientWidth === 0) return // onglet masqué : on garde la dernière mesure
      setEchelle(Math.min(1, b.clientWidth / LARGEUR_A4))
      setHauteur(f.offsetHeight)
    }
    mesurer()
    const ro = new ResizeObserver(mesurer)
    ro.observe(b)
    ro.observe(f)
    return () => ro.disconnect()
  }, [])

  useEffect(() => { onHauteur?.(hauteur) }, [hauteur, onHauteur])

  return (
    <div ref={boite} className="w-full">
      <div className="apercu-ajuste overflow-hidden" style={{ height: hauteur * echelle }}>
        <div ref={feuille} className="mx-auto origin-top-left" style={{ width: '210mm', transform: `scale(${echelle})` }}>
          {children}
        </div>
      </div>
    </div>
  )
}
