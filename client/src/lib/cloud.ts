import type { CvData, CvRow, ModeleId } from '../types'
import { api } from './api'

export type CvResume = Pick<CvRow, 'id' | 'titre' | 'updated_at'>

interface CvAEnregistrer {
  id?: string // absent = nouveau CV, présent = mise à jour
  titre: string
  modele: ModeleId
  couleur: string
  data: CvData
}

export const listerCv = () => api<CvResume[]>('/api/cvs')
export const chargerCv = (id: string) => api<CvRow>(`/api/cvs/${id}`)
export const supprimerCv = (id: string) => api<void>(`/api/cvs/${id}`, { method: 'DELETE' })

export const sauverCv = ({ id, ...cv }: CvAEnregistrer) =>
  id
    ? api<CvRow>(`/api/cvs/${id}`, { method: 'PUT', body: cv })
    : api<CvRow>('/api/cvs', { method: 'POST', body: cv })
