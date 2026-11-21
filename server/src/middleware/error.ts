import type { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'

export class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message)
  }
}

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Données invalides',
      details: err.issues.map((i) => ({ champ: i.path.join('.'), message: i.message })),
    })
    return
  }
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message })
    return
  }
  const status = (err as { status?: number }).status
  if (status && status >= 400 && status < 500) {
    res.status(status).json({ error: 'Requête invalide' }) // ex : JSON cassé, corps trop gros
    return
  }
  console.error(err)
  res.status(500).json({ error: 'Erreur serveur' })
}
