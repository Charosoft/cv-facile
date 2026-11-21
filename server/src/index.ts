import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { config } from './config'
import { errorHandler } from './middleware/error'
import { authRouter } from './routes/auth'
import { cvsRouter } from './routes/cvs'

const app = express()

app.set('trust proxy', 1) // Render est derrière un proxy
app.use(helmet())
app.use(cors({ origin: config.CORS_ORIGIN.split(',') }))
app.use(express.json({ limit: '1mb' }))

// Sert au "réveil" de l'instance Render
app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.use('/api/auth', authRouter)
app.use('/api/cvs', cvsRouter)

app.use((_req, res) => {
  res.status(404).json({ error: 'Route introuvable' })
})
app.use(errorHandler) // toujours en dernier

app.listen(config.PORT, () => console.log(`API prête sur le port ${config.PORT}`))
