import { useEffect, useState } from 'react'
import { api, getToken, setToken } from '../lib/api'

export interface User {
  id: string
  email: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)

  // Au chargement : si un token existe, on vérifie qu'il est encore valide
  useEffect(() => {
    if (!getToken()) return
    api<User>('/api/auth/me').then(setUser).catch(() => setToken(null))
  }, [])

  const entrer = async (chemin: string, email: string, password: string) => {
    const r = await api<{ token: string; user: User }>(chemin, { method: 'POST', body: { email, password } })
    setToken(r.token)
    setUser(r.user)
  }

  return {
    user,
    login: (email: string, password: string) => entrer('/api/auth/login', email, password),
    register: (email: string, password: string) => entrer('/api/auth/register', email, password),
    logout: () => {
      setToken(null)
      setUser(null)
    },
  }
}

export type Auth = ReturnType<typeof useAuth>
