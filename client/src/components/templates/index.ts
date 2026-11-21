import type { ComponentType } from 'react'
import type { ModeleId, TplProps } from '../../types'
import Sidebar from './Sidebar'
import Classique from './Classique'
import Moderne from './Moderne'

export const MODELES: Record<ModeleId, { nom: string; Composant: ComponentType<TplProps> }> = {
  sidebar: { nom: 'Barre latérale', Composant: Sidebar },
  classique: { nom: 'Classique', Composant: Classique },
  moderne: { nom: 'Moderne', Composant: Moderne },
}
