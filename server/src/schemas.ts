import { z } from 'zod'

export const authSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(8, '8 caractères minimum').max(100),
})

const liste = z.array(z.record(z.string(), z.string())).max(30)

export const cvSchema = z.object({
  titre: z.string().trim().min(1).max(120),
  modele: z.enum(['sidebar', 'classique', 'moderne']),
  couleur: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  data: z.object({
    perso: z.record(z.string(), z.string()),
    profil: z.string(),
    interets: z.string(),
    liens: liste,
    langues: liste,
    experiences: liste,
    formations: liste,
    competences: liste,
    stages: liste,
  }),
})

export const idSchema = z.string().uuid()
