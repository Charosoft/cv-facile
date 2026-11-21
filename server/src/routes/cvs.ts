import { Router } from 'express'
import { pool } from '../db'
import { requireAuth } from '../middleware/auth'
import { HttpError } from '../middleware/error'
import { cvSchema, idSchema } from '../schemas'

export const cvsRouter = Router()
cvsRouter.use(requireAuth) // toutes les routes ci-dessous exigent un token

// Chaque requête filtre sur user_id = $x : c'est ce qui empêche
// un utilisateur de voir les CV des autres.

cvsRouter.get('/', async (req, res) => {
  const { rows } = await pool.query(
    'select id, titre, updated_at from public.cvs where user_id = $1 order by updated_at desc',
    [req.userId],
  )
  res.json(rows)
})

cvsRouter.get('/:id', async (req, res) => {
  const id = idSchema.parse(req.params.id)
  const { rows } = await pool.query(
    'select id, titre, modele, couleur, data, updated_at from public.cvs where id = $1 and user_id = $2',
    [id, req.userId],
  )
  if (!rows[0]) throw new HttpError(404, 'CV introuvable')
  res.json(rows[0])
})

cvsRouter.post('/', async (req, res) => {
  const cv = cvSchema.parse(req.body)
  const { rows } = await pool.query(
    `insert into public.cvs (user_id, titre, modele, couleur, data)
     values ($1, $2, $3, $4, $5)
     returning id, titre, modele, couleur, data, updated_at`,
    [req.userId, cv.titre, cv.modele, cv.couleur, cv.data],
  )
  res.status(201).json(rows[0])
})

cvsRouter.put('/:id', async (req, res) => {
  const id = idSchema.parse(req.params.id)
  const cv = cvSchema.parse(req.body)
  const { rows } = await pool.query(
    `update public.cvs set titre = $1, modele = $2, couleur = $3, data = $4
     where id = $5 and user_id = $6
     returning id, titre, modele, couleur, data, updated_at`,
    [cv.titre, cv.modele, cv.couleur, cv.data, id, req.userId],
  )
  if (!rows[0]) throw new HttpError(404, 'CV introuvable')
  res.json(rows[0])
})

cvsRouter.delete('/:id', async (req, res) => {
  const id = idSchema.parse(req.params.id)
  const { rowCount } = await pool.query('delete from public.cvs where id = $1 and user_id = $2', [id, req.userId])
  if (!rowCount) throw new HttpError(404, 'CV introuvable')
  res.status(204).end()
})
