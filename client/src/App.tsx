import { useEffect } from 'react'
import Compte from './components/Compte'
import CvPreview from './components/CvPreview'
import Editor from './components/Editor'
import Header from './components/Header'
import TemplatePicker from './components/TemplatePicker'
import { useAuth } from './hooks/useAuth'
import { useCv } from './hooks/useCv'
import { reveillerServeur } from './lib/api'

export default function App() {
  const cv = useCv()
  const auth = useAuth()

  useEffect(() => { reveillerServeur() }, [])

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <div className="grid gap-5 p-5 lg:grid-cols-[400px_1fr] print:block print:p-0">
        <aside className="h-fit space-y-5 rounded-lg bg-white p-4 lg:sticky lg:top-3 lg:max-h-[95vh] lg:overflow-y-auto print:hidden">
          <Compte auth={auth} cv={cv} />
          <TemplatePicker cv={cv} />
          <Editor cv={cv} />
        </aside>

        <main className="overflow-x-auto print:overflow-visible">
          <CvPreview state={cv.state} />
        </main>
      </div>

      <footer className="py-4 text-center text-sm text-slate-500 print:hidden">
        Conçu par{' '}
        <a href="https://charosoft.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue-600">
          Charosoft
        </a>
      </footer>
    </div>
  )
}
