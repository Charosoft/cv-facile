import { useEffect, useState } from 'react'
import { EXEMPLE, vide } from '../data/config'
import type { CvData, CvState, ListKey, ModeleId, PersoKey } from '../types'

const CLE = 'cv-facile'

const initial = (): CvState => ({
  data: structuredClone(EXEMPLE),
  modele: 'sidebar',
  couleur: '#1e3a8a',
})

function charger(): CvState {
  try {
    const s = localStorage.getItem(CLE)
    if (s) return JSON.parse(s) as CvState
  } catch { /* on repart de l'exemple */ }
  return initial()
}

export function useCv() {
  const [state, setState] = useState<CvState>(charger)

  // Sauvegarde automatique dans le navigateur
  useEffect(() => {
    try { localStorage.setItem(CLE, JSON.stringify(state)) } catch { /* ignore */ }
  }, [state])

  // Petit outil : modifie seulement la partie "data"
  const maj = (fn: (d: CvData) => CvData) => setState((s) => ({ ...s, data: fn(s.data) }))

  return {
    state,
    setModele: (modele: ModeleId) => setState((s) => ({ ...s, modele })),
    setCouleur: (couleur: string) => setState((s) => ({ ...s, couleur })),
    setPerso: (k: PersoKey, v: string) =>
      maj((d) => ({ ...d, perso: { ...d.perso, [k]: v } }) as CvData),
    setTexte: (k: 'profil' | 'interets', v: string) =>
      maj((d) => ({ ...d, [k]: v }) as CvData),
    setItem: (l: ListKey, i: number, k: string, v: string) =>
      maj((d) => ({ ...d, [l]: d[l].map((it, idx) => (idx === i ? { ...it, [k]: v } : it)) }) as CvData),
    addItem: (l: ListKey) =>
      maj((d) => ({ ...d, [l]: [...d[l], vide(l)] }) as CvData),
    removeItem: (l: ListKey, i: number) =>
      maj((d) => ({ ...d, [l]: d[l].filter((_, idx) => idx !== i) }) as CvData),
    remplacer: (s: CvState) => setState(s),
    reset: () => setState(initial()),
  }
}

export type Cv = ReturnType<typeof useCv>
