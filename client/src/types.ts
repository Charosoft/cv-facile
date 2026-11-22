export type ModeleId = 'executif' | 'sidebar' | 'classique' | 'moderne'
export type Item = Record<string, string>
export type ListKey = 'liens' | 'langues' | 'experiences' | 'formations' | 'competences' | 'stages'
export type PersoKey = 'nom' | 'titre' | 'email' | 'tel' | 'ville' | 'nationalite' | 'naissance' | 'photo'

export interface CvData {
  perso: Record<PersoKey, string>
  profil: string
  interets: string
  liens: Item[]
  langues: Item[]
  experiences: Item[]
  formations: Item[]
  competences: Item[]
  stages: Item[]
}

export interface CvState {
  data: CvData
  modele: ModeleId
  couleur: string
}

// Ce que reçoit chaque modèle : les données + la couleur
export interface TplProps {
  d: CvData
  c: string
}

export interface CvRow {
  id: string
  titre: string
  modele: ModeleId
  couleur: string
  data: CvData
  updated_at: string
}
