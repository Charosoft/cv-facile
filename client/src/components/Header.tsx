import { Lien } from '../lib/route'

export default function Header({ onTelecharger }: { onTelecharger: () => void }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-slate-800 px-5 py-3.5 text-white lg:static print:hidden">
      <Lien vers="/" className="font-bold">CV Facile</Lien>
      <button onClick={onTelecharger} className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold lg:px-3 lg:py-2">
        Télécharger
      </button>
    </header>
  )
}
