import type { CvState } from '../types'
import { MODELES } from './templates'

export default function CvPreview({ state }: { state: CvState }) {
  const { Composant } = MODELES[state.modele]
  return (
    <div className="mx-auto min-h-[297mm] w-[210mm] bg-white text-[12.5px] leading-normal text-gray-800 shadow-lg print:w-full print:shadow-none">
      <Composant d={state.data} c={state.couleur} />
    </div>
  )
}
