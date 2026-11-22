import { useEffect, useState } from 'react'
import type { Auth } from '../hooks/useAuth'
import { imprimerPdf, telechargerWord } from '../lib/export'
import { messageErreur } from '../lib/utils'
import type { CvState } from '../types'
import FormAuth from './FormAuth'

const carte = 'block w-full rounded-xl border border-slate-300 p-4 text-left hover:border-nuit disabled:opacity-60'

// Télécharger = compte obligatoire, puis choix du format (PDF ou Word).
// Téléphone : la fenêtre monte du bas de l'écran.
export default function ExportDialog({ auth, etat, onClose }: { auth: Auth; etat: CvState; onClose: () => void }) {
  const [msg, setMsg] = useState('')
  const [preparation, setPreparation] = useState(false)

  useEffect(() => {
    const touche = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', touche)
    document.body.style.overflow = 'hidden' // la page derrière ne défile pas
    return () => {
      window.removeEventListener('keydown', touche)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const pdf = () => {
    onClose()
    setTimeout(() => imprimerPdf(etat.data.perso.nom), 150) // laisse la fenêtre se fermer avant d'imprimer
  }

  const word = async () => {
    setPreparation(true)
    setMsg('')
    try {
      await telechargerWord(etat)
      onClose()
    } catch (e) {
      setMsg(messageErreur(e))
      setPreparation(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-nuit/60 sm:items-center print:hidden" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="titre-export"
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-2xl bg-white p-5 sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="titre-export" className="font-titre text-xl font-extrabold text-nuit">
            {auth.user ? 'Télécharger mon CV' : 'Un compte est nécessaire'}
          </h2>
          <button onClick={onClose} aria-label="Fermer" className="-m-2 p-2 text-2xl leading-none text-slate-500">×</button>
        </div>

        {auth.user ? (
          <>
            <p className="mt-1 text-sm text-slate-500">Choisissez le format.</p>
            <div className="mt-4 space-y-3">
              <button onClick={pdf} className={carte}>
                <span className="font-semibold text-nuit">PDF</span>
                <span className="mt-0.5 block text-sm text-slate-600">
                  Mise en page du modèle choisi, texte lisible par les logiciels de recrutement. Le format à envoyer.
                </span>
              </button>
              <button onClick={word} disabled={preparation} className={carte}>
                <span className="font-semibold text-nuit">{preparation ? 'Préparation du fichier…' : 'Word (.docx)'}</span>
                <span className="mt-0.5 block text-sm text-slate-600">
                  Version modifiable, sur une colonne et sans photo : sa mise en page diffère du modèle.
                </span>
              </button>
            </div>
            {msg && <p className="mt-3 text-sm text-red-600" role="alert">{msg}</p>}
            <p className="mt-4 text-xs text-slate-500">
              PDF : dans la fenêtre qui s'ouvre, choisissez « Enregistrer au format PDF ».
            </p>
          </>
        ) : (
          <>
            <p className="mb-4 mt-2 text-sm text-slate-600">
              Créez un compte ou connectez-vous pour télécharger votre CV. Ce que vous avez rempli est conservé.
            </p>
            <FormAuth auth={auth} />
          </>
        )}
      </div>
    </div>
  )
}
