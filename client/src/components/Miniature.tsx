import { useMemo } from 'react'
import { preparer } from '../lib/dates'
import type { CvData, ModeleId } from '../types'
import { MODELES } from './templates'

interface Props {
  id: ModeleId
  data: CvData
  couleur: string
  largeur: number // en px
  className?: string
}

// Le VRAI rendu d'un modèle, réduit. Rien à fabriquer ni à maintenir :
// un nouveau modèle a sa vignette automatiquement.
export default function Miniature({ id, data, couleur, largeur, className = '' }: Props) {
  const { Composant } = MODELES[id]
  const donnees = useMemo(() => preparer(data), [data])
  const echelle = largeur / 793.7 // 210mm = 793.7px
  return (
    <div
      className={`overflow-hidden rounded border border-slate-200 bg-white ${className}`}
      style={{ width: largeur, height: 1122.5 * echelle }}
      aria-hidden="true"
      inert
    >
      <div
        className="w-[210mm] origin-top-left bg-white font-cv text-[12.5px] leading-normal text-gray-800"
        style={{ transform: `scale(${echelle})` }}
      >
        <Composant d={donnees} c={couleur} />
      </div>
    </div>
  )
}
