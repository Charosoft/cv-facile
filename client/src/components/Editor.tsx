import { useState, type ChangeEvent } from 'react'
import { LISTES, PERSO_CHAMPS } from '../data/config'
import type { Cv } from '../hooks/useCv'
import { redimensionner } from '../lib/utils'
import type { ListKey, PersoKey } from '../types'
import Accordeon from './Accordeon'
import ListEditor from './ListEditor'

const champ = 'mb-1.5 w-full rounded-md border border-slate-300 p-2 text-sm'

// Ordre d'affichage : le plus important pour un recruteur d'abord
const LISTES_ORDRE: ListKey[] = ['experiences', 'formations', 'competences', 'stages', 'liens', 'langues']

export default function Editor({ cv }: { cv: Cv }) {
  const { data } = cv.state
  // Une seule section ouverte à la fois ; tout est replié au départ
  const [ouvert, setOuvert] = useState<string | null>(null)
  const bascule = (id: string) => setOuvert((o) => (o === id ? null : id))

  const onPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f) cv.setPerso('photo', await redimensionner(f))
  }

  const rempli = (l: ListKey) => data[l].filter((it) => Object.values(it).some((v) => v?.trim())).length

  return (
    <div className="space-y-2">
      <Accordeon titre="Informations" ouvert={ouvert === 'perso'} onToggle={() => bascule('perso')}>
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
      </Accordeon>

      <Accordeon titre="Profil" ouvert={ouvert === 'profil'} onToggle={() => bascule('profil')}>
        <textarea
          className={`${champ} min-h-[110px]`}
          value={data.profil}
          onChange={(e) => cv.setTexte('profil', e.target.value)}
        />
      </Accordeon>

      {LISTES_ORDRE.map((l) => (
        <Accordeon key={l} titre={LISTES[l].titre} badge={rempli(l)} ouvert={ouvert === l} onToggle={() => bascule(l)}>
          <ListEditor liste={l} cv={cv} />
        </Accordeon>
      ))}

      <Accordeon titre="Centres d'intérêt" ouvert={ouvert === 'interets'} onToggle={() => bascule('interets')}>
        <input className={champ} value={data.interets} onChange={(e) => cv.setTexte('interets', e.target.value)} />
      </Accordeon>
    </div>
  )
}
