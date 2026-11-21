import type { ChangeEvent } from 'react'
import { LISTES, PERSO_CHAMPS } from '../data/config'
import type { Cv } from '../hooks/useCv'
import { redimensionner } from '../lib/utils'
import type { ListKey, PersoKey } from '../types'
import ListEditor from './ListEditor'

const champ = 'mb-1.5 w-full rounded-md border border-slate-300 p-2 text-sm'

export default function Editor({ cv }: { cv: Cv }) {
  const { data } = cv.state

  const onPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) cv.setPerso('photo', await redimensionner(f))
  }

  return (
    <div>
      <h3 className="mb-2 text-sm font-bold">Informations</h3>
      <input type="file" accept="image/*" onChange={onPhoto} className="mb-2 text-sm" />
      {data.perso.photo && (
        <button onClick={() => cv.setPerso('photo', '')} className="mb-2 block text-xs text-red-600">
          Retirer la photo
        </button>
      )}

      {(Object.keys(PERSO_CHAMPS) as Exclude<PersoKey, 'photo'>[]).map((k) => (
        <input
          key={k}
          className={champ}
          placeholder={PERSO_CHAMPS[k]}
          value={data.perso[k]}
          onChange={(e) => cv.setPerso(k, e.target.value)}
        />
      ))}

      <h3 className="mb-2 mt-5 text-sm font-bold">Profil</h3>
      <textarea
        className={`${champ} min-h-[80px]`}
        value={data.profil}
        onChange={(e) => cv.setTexte('profil', e.target.value)}
      />

      <h3 className="mb-2 mt-5 text-sm font-bold">Centres d'intérêt</h3>
      <input className={champ} value={data.interets} onChange={(e) => cv.setTexte('interets', e.target.value)} />

      {(Object.keys(LISTES) as ListKey[]).map((l) => (
        <ListEditor key={l} liste={l} cv={cv} />
      ))}
    </div>
  )
}
