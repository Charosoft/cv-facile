import { useEffect, useRef, type ReactNode } from 'react'

interface Props {
  titre: string
  badge?: number | string
  ouvert: boolean
  onToggle: () => void
  children: ReactNode
}

// Section repliable : seul l'en-tête est visible tant qu'elle est fermée.
export default function Accordeon({ titre, badge, ouvert, onToggle, children }: Props) {
  const ref = useRef<HTMLElement>(null)

  // À l'ouverture, on amène la section dans la zone visible (les autres viennent de se refermer)
  useEffect(() => {
    if (ouvert) ref.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [ouvert])

  return (
    <section ref={ref} className="scroll-mt-16 rounded-lg border border-slate-200">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={ouvert}
          className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-sm font-bold hover:bg-slate-50"
        >
          <span className="flex items-center gap-2">
            {titre}
            {badge ? (
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">{badge}</span>
            ) : null}
          </span>
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
            className={`shrink-0 text-slate-500 transition-transform ${ouvert ? 'rotate-180' : ''}`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </h3>
      {ouvert && <div className="border-t border-slate-200 p-3">{children}</div>}
    </section>
  )
}
