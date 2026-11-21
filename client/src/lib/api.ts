const API = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'
const CLE_TOKEN = 'cv-token'

export const getToken = () => localStorage.getItem(CLE_TOKEN)
export const setToken = (t: string | null) =>
  t ? localStorage.setItem(CLE_TOKEN, t) : localStorage.removeItem(CLE_TOKEN)

// Une seule fonction pour parler à l'API : ajoute le token et gère les erreurs
export async function api<T>(chemin: string, options: { method?: string; body?: unknown } = {}): Promise<T> {
  const token = getToken()
  const res = await fetch(`${API}${chemin}`, {
    method: options.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  })
  if (res.status === 204) return undefined as T
  const json = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(json.error ?? 'Erreur réseau')
  return json as T
}

// Réveille l'instance Render (gratuite) dès l'ouverture du site
export const reveillerServeur = () => {
  fetch(`${API}/health`).catch(() => {})
}
