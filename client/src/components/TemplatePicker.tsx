import type { Cv } from '../hooks/useCv'
import type { ModeleId } from '../types'
import Miniature from './Miniature'
import { MODELES } from './templates'

export default function TemplatePicker({ cv }: { cv: Cv }) {
  const { modele, couleur, data } = cv.state
  return (
    <section>
      <h3 className="mb-2 text-sm font-bold">Modèle</h3>
      <div className="mb-2 flex gap-2 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:gap-1 lg:overflow-visible lg:pb-0">
        {(Object.keys(MODELES) as ModeleId[]).map((id) => (
          <button
            key={id}
            onClick={() => cv.setModele(id)}
            className={`shrink-0 rounded-lg border-2 p-1.5 text-left ${id === modele ? 'border-blue-600 bg-blue-50' : 'border-transparent hover:border-slate-300'}`}
          >
            <Miniature id={id} data={data} couleur={couleur} largeur={100} />
            <div className="mt-1 text-xs font-semibold">{MODELES[id].nom}</div>
            <div className="text-[10px] text-slate-500">
              {MODELES[id].colonnes === 1 ? '1 colonne · ATS ✔' : '2 colonnes'}
            </div>
          </button>
        ))}
      </div>
      <p className="mb-3 text-[11px] text-slate-500">
        Les modèles 1 colonne sont les plus sûrs pour les logiciels de recrutement (ATS).
      </p>
      <label className="flex items-center gap-2 text-sm">
        Couleur
        <input type="color" value={couleur} onChange={(e) => cv.setCouleur(e.target.value)} className="h-8 w-14" />
      </label>
    </section>
  )
}
