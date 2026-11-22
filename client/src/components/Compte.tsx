import { useCallback, useEffect, useState } from 'react'
import type { Auth } from '../hooks/useAuth'
import type { Cv } from '../hooks/useCv'
import { chargerCv, listerCv, sauverCv, supprimerCv, type CvResume } from '../lib/cloud'
import { messageErreur } from '../lib/utils'
import FormAuth from './FormAuth'

const btn = 'rounded-md bg-blue-600 px-4 py-2.5 text-sm text-white lg:px-3 lg:py-1.5'

export default function Compte({ auth, cv }: { auth: Auth; cv: Cv }) {
  const { user } = auth
  const [liste, setListe] = useState<CvResume[]>([])
  const [cvId, setCvId] = useState<string | undefined>()
  const [msg, setMsg] = useState('')

  const rafraichir = useCallback(async () => {
    try { setListe(await listerCv()) } catch (e) { setMsg(messageErreur(e)) }
  }, [])

  useEffect(() => {
    if (user) rafraichir()
    else { setListe([]); setCvId(undefined) }
  }, [user, rafraichir])

  const enregistrer = async () => {
    const { data, modele, couleur } = cv.state
    try {
      const saved = await sauverCv({ id: cvId, titre: data.perso.nom || 'Mon CV', modele, couleur, data })
      setCvId(saved.id)
      setMsg('Enregistré ✔')
      rafraichir()
    } catch (e) { setMsg(messageErreur(e)) }
  }

  const ouvrir = async (id: string) => {
    try {
      const row = await chargerCv(id)
      cv.remplacer({ data: row.data, modele: row.modele, couleur: row.couleur })
      setCvId(id)
      setMsg('')
    } catch (e) { setMsg(messageErreur(e)) }
  }

  const supprimer = async (id: string) => {
    try {
      await supprimerCv(id)
      if (id === cvId) setCvId(undefined)
      rafraichir()
    } catch (e) { setMsg(messageErreur(e)) }
  }

  const nouveau = () => { setCvId(undefined); cv.reset() }

  if (!user) {
    return (
      <section>
        <p className="mb-2 text-xs text-slate-500">Pour retrouver vos CV sur un autre appareil.</p>
        <FormAuth auth={auth} />
      </section>
    )
  }

  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-bold">Mes CV</h3>
        <button className="px-1 py-2 text-xs text-slate-500 underline" onClick={auth.logout}>Déconnexion</button>
      </div>
      <p className="mb-2 truncate text-xs text-slate-500">{user.email}</p>
      <div className="mb-2 flex gap-2">
        <button className={btn} onClick={enregistrer}>{cvId ? 'Mettre à jour' : 'Enregistrer'}</button>
        <button className="rounded-md bg-slate-200 px-4 py-2.5 text-sm lg:px-3 lg:py-1.5" onClick={nouveau}>Nouveau</button>
      </div>
      {msg && <p className="mb-2 text-xs text-slate-600">{msg}</p>}
      <ul className="space-y-1">
        {liste.map((c) => (
          <li key={c.id} className={`flex items-center justify-between rounded border p-1.5 text-sm ${c.id === cvId ? 'border-blue-500' : 'border-slate-200'}`}>
            <button className="truncate text-left" onClick={() => ouvrir(c.id)}>{c.titre}</button>
            <button className="px-2 py-2 text-xs text-red-600" onClick={() => supprimer(c.id)}>Suppr.</button>
          </li>
        ))}
      </ul>
    </section>
  )
}
