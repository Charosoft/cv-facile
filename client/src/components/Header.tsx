export default function Header() {
  return (
    <header className="flex items-center justify-between bg-slate-800 px-5 py-3.5 text-white print:hidden">
      <strong>CV Facile</strong>
      <button onClick={() => window.print()} className="rounded-md bg-blue-600 px-3 py-2 text-sm">
        Télécharger en PDF
      </button>
    </header>
  )
}
