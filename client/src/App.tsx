import { useChemin } from './lib/route'
import Accueil from './pages/Accueil'
import Editeur from './pages/Editeur'

export default function App() {
  const chemin = useChemin()
  return chemin.startsWith('/creer') ? <Editeur /> : <Accueil />
}
