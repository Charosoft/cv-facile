import { MOIS_LONGS, finAvantDebut } from '../lib/dates'
import type { Item } from '../types'

const select = 'w-full rounded-md border border-slate-300 bg-white p-2 text-sm disabled:bg-slate-100 disabled:text-slate-400'

const ANNEE_MAX = new Date().getFullYear() + 6 // permet un diplôme en cours / à venir
const ANNEES = Array.from({ length: ANNEE_MAX - 1969 }, (_, i) => String(ANNEE_MAX - i))

// "2023-05" ou "2023" ou "-05" (mois choisi avant l'année)
const assembler = (a: string, m: string) => (m ? `${a}-${m}` : a)

function Selecteur({
  label, valeur, precision, desactive, onChange,
}: {
  label: string
  valeur: string
  precision: 'mois' | 'annee'
  desactive?: boolean
  onChange: (v: string) => void
}) {
  const [a = '', m = ''] = valeur.split('-')
  return (
    <div className="mb-1.5 grid grid-cols-[3.2rem_1fr] items-center gap-2">
      <span className="text-xs font-semibold text-slate-600">{label}</span>
      <div className={precision === 'mois' ? 'grid grid-cols-2 gap-2' : ''}>
        {precision === 'mois' && (
          <select aria-label={`${label} : mois`} className={select} disabled={desactive} value={m} onChange={(e) => onChange(assembler(a, e.target.value))}>
            <option value="">Mois</option>
            {MOIS_LONGS.map((nom, i) => (
              <option key={nom} value={String(i + 1).padStart(2, '0')}>{nom}</option>
            ))}
          </select>
        )}
        <select
          aria-label={`${label} : année`}
          className={select}
          disabled={desactive}
          value={a}
          onChange={(e) => onChange(precision === 'mois' ? assembler(e.target.value, m) : e.target.value)}
        >
          <option value="">Année</option>
          {ANNEES.map((an) => <option key={an} value={an}>{an}</option>)}
        </select>
      </div>
    </div>
  )
}

export default function ChampDates({
  item, precision, enCoursLabel, onChange,
}: {
  item: Item
  precision: 'mois' | 'annee'
  enCoursLabel: string
  onChange: (cle: string, valeur: string) => void
}) {
  const enCours = item.enCours === '1'
  const ancien = !item.debut && !item.fin && !enCours && item.periode

  return (
    <div className="mb-2">
      {ancien && (
        <p className="mb-1.5 text-xs text-slate-500">
          Ancienne période : « {item.periode} ». Choisissez les dates ci-dessous pour la remplacer.
        </p>
      )}
      <Selecteur label="Début" valeur={item.debut ?? ''} precision={precision} onChange={(v) => onChange('debut', v)} />
      <Selecteur label="Fin" valeur={item.fin ?? ''} precision={precision} desactive={enCours} onChange={(v) => onChange('fin', v)} />
      <label className="flex items-center gap-2 py-1 text-sm">
        <input
          type="checkbox"
          className="h-4 w-4"
          checked={enCours}
          onChange={(e) => {
            onChange('enCours', e.target.checked ? '1' : '')
            if (e.target.checked) onChange('fin', '')
          }}
        />
        {enCoursLabel}
      </label>
      {finAvantDebut(item) && <p role="alert" className="text-xs text-red-600">La fin est avant le début.</p>}
    </div>
  )
}
