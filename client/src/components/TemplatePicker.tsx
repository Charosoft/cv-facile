import type { Cv } from '../hooks/useCv'
import type { ModeleId } from '../types'
import { MODELES } from './templates'

export default function TemplatePicker({ cv }: { cv: Cv }) {
  const { modele, couleur } = cv.state
  return (
    <section>
      <h3 className="mb-2 text-sm font-bold">Modèle</h3>
      <div className="mb-3 flex flex-wrap gap-1.5">
        {(Object.keys(MODELES) as ModeleId[]).map((id) => (
          <button
            key={id}
            onClick={() => cv.setModele(id)}
            className={`rounded-md px-3 py-1.5 text-sm ${id === modele ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}
          >
            {MODELES[id].nom}
          </button>
        ))}
      </div>
      <label className="flex items-center gap-2 text-sm">
        Couleur
        <input type="color" value={couleur} onChange={(e) => cv.setCouleur(e.target.value)} className="h-8 w-14" />
      </label>
    </section>
  )
}
