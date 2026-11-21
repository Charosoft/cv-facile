import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import jwt from 'jsonwebtoken'
import { config } from '../config'
import { pool } from '../db'
import { HttpError } from '../middleware/error'
import { requireAuth } from '../middleware/auth'
import { hashPassword, verifyPassword } from '../password'
import { authSchema } from '../schemas'

export const authRouter = Router()

// Anti force brute : 20 essais / 15 min par IP
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20 })

const creerToken = (userId: string) =>
  jwt.sign({ sub: userId }, config.JWT_SECRET, { algorithm: 'HS256', expiresIn: '7d' })

authRouter.post('/register', limiter, async (req, res) => {
  const { email, password } = authSchema.parse(req.body)
  const hash = await hashPassword(password)
  try {
    const { rows } = await pool.query(
      'insert into public.users (email, password_hash) values ($1, $2) returning id, email',
      [email, hash],
    )
    res.status(201).json({ token: creerToken(rows[0].id), user: rows[0] })
  } catch (e) {
    if ((e as { code?: string }).code === '23505') throw new HttpError(409, 'Cet email est déjà utilisé')
    throw e
  }
})

authRouter.post('/login', limiter, async (req, res) => {
  const { email, password } = authSchema.parse(req.body)
  const { rows } = await pool.query(
    'select id, email, password_hash from public.users where email = $1',
    [email],
  )
  const u = rows[0]
  // Même message dans les 2 cas : on ne révèle pas si l'email existe
  if (!u || !(await verifyPassword(password, u.password_hash))) {
    throw new HttpError(401, 'Email ou mot de passe incorrect')
  }
  res.json({ token: creerToken(u.id), user: { id: u.id, email: u.email } })
})

// Sert à retrouver l'utilisateur quand la page se recharge
authRouter.get('/me', requireAuth, async (req, res) => {
  const { rows } = await pool.query('select id, email from public.users where id = $1', [req.userId])
  if (!rows[0]) throw new HttpError(401, 'Compte introuvable')
  res.json(rows[0])
})
