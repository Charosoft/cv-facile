import { useMemo } from 'react'
import { preparer } from '../lib/dates'
import type { CvState } from '../types'
import { MODELES } from './templates'

export default function CvPreview({ state }: { state: CvState }) {
  // Si un ancien CV pointe vers un modèle supprimé, on retombe sur le premier
  const { Composant } = MODELES[state.modele] ?? MODELES.executif
  const donnees = useMemo(() => preparer(state.data), [state.data])
  return (
    <div className="mx-auto min-h-[297mm] w-[210mm] bg-white font-cv text-[12.5px] leading-normal text-gray-800 shadow-lg print:w-full print:shadow-none">
      <Composant d={donnees} c={state.couleur} />
    </div>
  )
}
