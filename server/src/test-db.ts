import { pool } from './db'

pool
  .query('select count(*) from public.users')
  .then((r) => {
    console.log('OK, connexion et table users trouvées :', r.rows)
    return pool.end()
  })
  .catch((e) => {
    console.error('ERREUR :', e.message)
    process.exit(1)
  })
