import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config'

// On ajoute req.userId au type Request
declare module 'express-serve-static-core' {
  interface Request {
    userId?: string
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const h = req.headers.authorization
  let sub: string | undefined

  if (h?.startsWith('Bearer ')) {
    try {
      const p = jwt.verify(h.slice(7), config.JWT_SECRET, { algorithms: ['HS256'] })
      sub = typeof p === 'string' ? undefined : p.sub
    } catch {
      sub = undefined
    }
  }

  if (!sub) {
    res.status(401).json({ error: 'Non connecté ou session expirée' })
    return
  }
  req.userId = sub
  next()
}
