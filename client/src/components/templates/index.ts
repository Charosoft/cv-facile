import type { ComponentType } from 'react'
import type { ModeleId, TplProps } from '../../types'
import Classique from './Classique'
import Executif from './Executif'
import Moderne from './Moderne'
import Sidebar from './Sidebar'

// Un modèle = une ligne ici (+ son id dans types.ts).
// colonnes: 1 = lecture la plus sûre pour les logiciels de recrutement (ATS)
export const MODELES: Record<ModeleId, { nom: string; colonnes: 1 | 2; Composant: ComponentType<TplProps> }> = {
  executif: { nom: 'Exécutif', colonnes: 2, Composant: Executif },
  sidebar: { nom: 'Barre latérale', colonnes: 2, Composant: Sidebar },
  classique: { nom: 'Classique', colonnes: 1, Composant: Classique },
  moderne: { nom: 'Moderne', colonnes: 2, Composant: Moderne },
}
