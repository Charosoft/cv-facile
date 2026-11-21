import { Pool } from 'pg'
import { config } from './config'

export const pool = new Pool({
  connectionString: config.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Supabase exige SSL
  max: 5,
})
