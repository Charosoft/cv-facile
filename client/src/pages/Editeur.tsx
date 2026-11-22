import { useEffect, useState } from 'react'
import Accordeon from '../components/Accordeon'
import ApercuAjuste from '../components/ApercuAjuste'
import Compte from '../components/Compte'
import CvPreview from '../components/CvPreview'
import Editor from '../components/Editor'
import ExportDialog from '../components/ExportDialog'
import Header from '../components/Header'
import IndicateurPage from '../components/IndicateurPage'
import TemplatePicker from '../components/TemplatePicker'
import { MODELES } from '../components/templates'
import { useAuth } from '../hooks/useAuth'
import { useCv } from '../hooks/useCv'
import { reveillerServeur } from '../lib/api'
import type { ModeleId } from '../types'

type Onglet = 'edition' | 'apercu'
const ONGLETS: { id: Onglet; label: string }[] = [
  { id: 'edition', label: 'Modifier' },
  { id: 'apercu', label: 'Aperçu' },
]

export default function Editeur() {
  const cv = useCv()
  const auth = useAuth()
  // Téléphone / tablette : un seul volet à la fois. Sur grand écran les deux sont visibles.
  const [onglet, setOnglet] = useState<Onglet>('edition')
  const [compteOuvert, setCompteOuvert] = useState(false)
  const [exportOuvert, setExportOuvert] = useState(false)
  const [hauteur, setHauteur] = useState(1122.5)

  useEffect(() => {
    reveillerServeur()
    document.title = 'Créer mon CV – CV Facile'
    // /creer?modele=classique : arrivée depuis la galerie de l'accueil
    const m = new URLSearchParams(window.location.search).get('modele')
    if (m && m in MODELES) cv.setModele(m as ModeleId)
  }, [])

  return (
    <div className="min-h-screen bg-slate-100">
      <Header onTelecharger={() => setExportOuvert(true)} />

      <div className="grid gap-5 p-3 sm:p-5 lg:grid-cols-[400px_1fr] print:block print:p-0">
        <aside
          className={`${onglet === 'edition' ? 'block' : 'hidden'} h-fit space-y-5 rounded-lg bg-white p-4 lg:sticky lg:top-3 lg:block lg:max-h-[95vh] lg:overflow-y-auto print:hidden`}
        >
          <Accordeon
            titre={auth.user ? 'Mes CV' : 'Compte et sauvegarde'}
            ouvert={compteOuvert}
            onToggle={() => setCompteOuvert((o) => !o)}
          >
            <Compte auth={auth} cv={cv} />
          </Accordeon>
          <TemplatePicker cv={cv} />
          <Editor cv={cv} />
        </aside>

        {/* print:block : le CV s'imprime même si l'onglet Aperçu n'est pas affiché */}
        <main className={`${onglet === 'apercu' ? 'block' : 'hidden'} min-w-0 lg:block print:block`}>
          <div className="mb-3 print:hidden">
            <IndicateurPage hauteur={hauteur} />
          </div>
          <ApercuAjuste onHauteur={setHauteur}>
            <CvPreview state={cv.state} />
          </ApercuAjuste>
          <p className="mt-4 text-xs text-slate-500 lg:hidden print:hidden">
            Pincez l'écran pour zoomer.
          </p>
        </main>
      </div>

      <footer className="mb-16 py-4 text-center text-sm text-slate-500 lg:mb-0 print:hidden">
        Conçu par{' '}
        <a href="https://charosoft.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-600">
          Charosoft
        </a>
      </footer>

      {exportOuvert && <ExportDialog auth={auth} etat={cv.state} onClose={() => setExportOuvert(false)} />}

      <nav
        className="fixed inset-x-0 bottom-0 z-30 flex border-t border-slate-200 bg-white lg:hidden print:hidden"
        aria-label="Volets de l'éditeur"
      >
        {ONGLETS.map((o) => (
          <button
            key={o.id}
            onClick={() => { setOnglet(o.id); window.scrollTo(0, 0) }}
            aria-pressed={onglet === o.id}
            className={`flex-1 py-4 text-sm font-semibold ${
              onglet === o.id ? '-mt-px border-t-2 border-mandarine text-nuit' : 'text-slate-500'
            }`}
          >
            {o.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
