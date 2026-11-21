import 'dotenv/config'
import { z } from 'zod'

// Si une variable manque, le serveur refuse de démarrer (c'est voulu)
export const config = z
  .object({
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.string().min(1),
    JWT_SECRET: z.string().min(32),
    CORS_ORIGIN: z.string().default('http://localhost:5173'),
  })
  .parse(process.env)
