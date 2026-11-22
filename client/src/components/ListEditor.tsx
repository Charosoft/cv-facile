import { LISTES } from '../data/config'
import type { Cv } from '../hooks/useCv'
import type { ListKey } from '../types'
import ChampDates from './ChampDates'

const champ = 'mb-1.5 w-full rounded-md border border-slate-300 p-2 text-sm'

export default function ListEditor({ liste, cv }: { liste: ListKey; cv: Cv }) {
  const cfg = LISTES[liste]
  const items = cv.state.data[liste]
  const entrees = Object.entries(cfg.champs)
  const courts = entrees.filter(([k]) => !cfg.longs?.includes(k))
  const longs = entrees.filter(([k]) => cfg.longs?.includes(k))

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className="mb-2 rounded-md border border-dashed border-slate-300 p-2">
          {courts.map(([k, label]) => (
            <input
              key={k}
              className={champ}
              placeholder={label}
              value={item[k] ?? ''}
              onChange={(e) => cv.setItem(liste, i, k, e.target.value)}
            />
          ))}
          {cfg.dates && (
            <ChampDates
              item={item}
              precision={cfg.dates.precision}
              enCoursLabel={cfg.dates.enCours}
              onChange={(k, v) => cv.setItem(liste, i, k, v)}
            />
          )}
          {longs.map(([k, label]) => (
            <textarea
              key={k}
              className={`${champ} min-h-[70px]`}
              placeholder={label}
              value={item[k] ?? ''}
              onChange={(e) => cv.setItem(liste, i, k, e.target.value)}
            />
          ))}
          <button onClick={() => cv.removeItem(liste, i)} className="rounded bg-red-600 px-3 py-2 text-xs text-white lg:px-2 lg:py-1">
            Supprimer
          </button>
        </div>
      ))}
      <button onClick={() => cv.addItem(liste)} className="rounded-md bg-blue-600 px-4 py-2.5 text-sm text-white lg:px-3 lg:py-1.5">
        + Ajouter
      </button>
    </div>
  )
}
