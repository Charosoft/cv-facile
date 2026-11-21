import { LISTES } from '../data/config'
import type { Cv } from '../hooks/useCv'
import type { ListKey } from '../types'

const champ = 'mb-1.5 w-full rounded-md border border-slate-300 p-2 text-sm'

export default function ListEditor({ liste, cv }: { liste: ListKey; cv: Cv }) {
  const cfg = LISTES[liste]
  const items = cv.state.data[liste]

  return (
    <section>
      <h3 className="mb-2 mt-5 text-sm font-bold">{cfg.titre}</h3>
      {items.map((item, i) => (
        <div key={i} className="mb-2 rounded-md border border-dashed border-slate-300 p-2">
          {Object.entries(cfg.champs).map(([k, label]) =>
            cfg.longs?.includes(k) ? (
              <textarea
                key={k}
                className={`${champ} min-h-[70px]`}
                placeholder={label}
                value={item[k] ?? ''}
                onChange={(e) => cv.setItem(liste, i, k, e.target.value)}
              />
            ) : (
              <input
                key={k}
                className={champ}
                placeholder={label}
                value={item[k] ?? ''}
                onChange={(e) => cv.setItem(liste, i, k, e.target.value)}
              />
            ),
          )}
          <button onClick={() => cv.removeItem(liste, i)} className="rounded bg-red-600 px-2 py-1 text-xs text-white">
            Supprimer
          </button>
        </div>
      ))}
      <button onClick={() => cv.addItem(liste)} className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white">
        + Ajouter
      </button>
    </section>
  )
}
