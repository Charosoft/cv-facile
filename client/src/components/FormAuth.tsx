import { useState } from 'react'
import type { Auth } from '../hooks/useAuth'
import { messageErreur } from '../lib/utils'

const champ = 'mb-2 w-full rounded-md border border-slate-300 p-2.5 text-sm'

// Connexion / création de compte (utilisé dans « Compte » et dans la fenêtre de téléchargement)
export default function FormAuth({ auth }: { auth: Auth }) {
  const [email, setEmail] = useState('')
  const [mdp, setMdp] = useState('')
  const [msg, setMsg] = useState('')

  const entrer = async (action: 'login' | 'register') => {
    setMsg('Connexion en cours…')
    try {
      await auth[action](email, mdp)
      setMsg('')
    } catch (e) {
      setMsg(messageErreur(e))
    }
  }

  return (
    <div>
      <input
        className={champ} type="email" inputMode="email" autoComplete="email" autoCapitalize="none" autoCorrect="off"
        placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={champ} type="password" autoComplete="current-password"
        placeholder="Mot de passe (8 caractères min.)" value={mdp} onChange={(e) => setMdp(e.target.value)}
      />
      <div className="flex flex-wrap gap-2">
        <button className="rounded-md bg-blue-600 px-4 py-2.5 text-sm text-white lg:px-3 lg:py-1.5" onClick={() => entrer('login')}>
          Connexion
        </button>
        <button className="rounded-md bg-slate-200 px-4 py-2.5 text-sm lg:px-3 lg:py-1.5" onClick={() => entrer('register')}>
          Créer un compte
        </button>
      </div>
      {msg && <p className="mt-2 text-xs text-slate-600" role="status">{msg}</p>}
    </div>
  )
}
