import { HAUTEUR_A4 } from './ApercuAjuste'

const HAUTEUR_LIGNE = 16 // une ligne de texte de CV, en px
const PETIT_DEBORDEMENT = 8 // lignes

// 1 page : vert. Petit débordement sur la page 2 : conseil. CV long : simple information (c'est normal).
export default function IndicateurPage({ hauteur }: { hauteur: number }) {
  const pages = hauteur / HAUTEUR_A4
  const tient = pages <= 1.003
  const lignes = Math.max(1, Math.round((hauteur - HAUTEUR_A4) / HAUTEUR_LIGNE))
  const petit = !tient && pages <= 2 && lignes <= PETIT_DEBORDEMENT

  const texte = tient
    ? '1 page · tient sur une feuille A4'
    : petit
      ? `Dépasse de ${lignes} ligne${lignes > 1 ? 's' : ''} sur la page 2 : un petit ajustement suffit pour tenir sur 1 page`
      : `${Math.ceil(pages)} pages`

  const style = tient
    ? 'bg-emerald-50 text-emerald-800 ring-emerald-200'
    : petit
      ? 'bg-amber-50 text-amber-900 ring-amber-300'
      : 'bg-slate-100 text-slate-700 ring-slate-300'
  const point = tient ? 'bg-emerald-500' : petit ? 'bg-amber-500' : 'bg-slate-400'

  return (
    <p role="status" className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ring-1 ${style}`}>
      <span className={`h-2 w-2 shrink-0 rounded-full ${point}`} aria-hidden="true" />
      {texte}
    </p>
  )
}
