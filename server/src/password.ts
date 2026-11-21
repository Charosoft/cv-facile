import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'

const scryptAsync = promisify(scrypt) as unknown as (
  mdp: string,
  salt: Buffer,
  longueur: number,
) => Promise<Buffer>

// On stocke "sel:hash". Jamais le mot de passe en clair.
export async function hashPassword(mdp: string) {
  const salt = randomBytes(16)
  const hash = await scryptAsync(mdp, salt, 64)
  return `${salt.toString('hex')}:${hash.toString('hex')}`
}

export async function verifyPassword(mdp: string, stocke: string) {
  const [saltHex, hashHex] = stocke.split(':')
  const hash = Buffer.from(hashHex, 'hex')
  const test = await scryptAsync(mdp, Buffer.from(saltHex, 'hex'), hash.length)
  return timingSafeEqual(hash, test)
}
