import { useEffect, useState, type ReactNode } from 'react'

// Mini routeur : deux pages seulement ("/" et "/creer"), pas besoin d'une librairie.
export const aller = (chemin: string) => {
  window.history.pushState(null, '', chemin)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo(0, 0)
}

export const useChemin = () => {
  const [chemin, setChemin] = useState(window.location.pathname)
  useEffect(() => {
    const maj = () => setChemin(window.location.pathname)
    window.addEventListener('popstate', maj)
    return () => window.removeEventListener('popstate', maj)
  }, [])
  return chemin
}

// Lien interne : navigation sans rechargement, mais clic droit / nouvel onglet restent normaux
export function Lien({ vers, className, children }: { vers: string; className?: string; children: ReactNode }) {
  return (
    <a
      href={vers}
      className={className}
      onClick={(e) => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
        e.preventDefault()
        aller(vers)
      }}
    >
      {children}
    </a>
  )
}
