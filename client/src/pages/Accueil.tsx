import { useEffect } from 'react'
import Miniature from '../components/Miniature'
import { MODELES } from '../components/templates'
import { EXEMPLE_VITRINE } from '../data/vitrine'
import { Lien } from '../lib/route'
import type { ModeleId } from '../types'

const COULEUR = '#1e3a8a'

// Orange = fond de bouton uniquement, avec texte bleu nuit (le blanc sur orange n'est pas assez contrasté)
const bouton =
  'inline-flex items-center justify-center rounded-lg bg-mandarine font-semibold text-nuit transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mandarine'
const boutonM = `${bouton} px-6 py-3`
const boutonS = `${bouton} px-4 py-2 text-sm`

// Record<ModeleId, …> : le compilateur oblige à décrire chaque nouveau modèle
const DESCRIPTIONS: Record<ModeleId, string> = {
  executif: 'Colonne latérale sombre et frise chronologique. Pour un parcours avec plusieurs expériences.',
  sidebar: 'Colonne latérale claire, titres colorés. Sobre et facile à lire.',
  classique: 'Une seule colonne, en-tête centré. Le choix le plus sûr pour une candidature formelle.',
  moderne: 'Bandeau de couleur en tête, contenu sur deux colonnes. Pour les secteurs commerciaux ou créatifs.',
}

const ETAPES = [
  { titre: 'Choisissez un modèle', texte: 'Vous pouvez en changer à tout moment : vos informations restent en place.' },
  { titre: 'Remplissez les rubriques', texte: "Chaque rubrique s'ouvre à son tour et l'aperçu se met à jour en direct." },
  { titre: 'Téléchargez en PDF ou Word', texte: 'Un fichier au nom Prénom-Nom-CV, prêt à joindre à une candidature. Un compte est demandé à ce moment-là.' },
]

const ATOUTS = [
  {
    titre: 'Du vrai texte, pas une image',
    texte: 'Le PDF contient du texte sélectionnable. Les logiciels de recrutement peuvent le lire, et vous pouvez le copier-coller.',
  },
  {
    titre: 'Essayez sans compte',
    texte: "Remplissez votre CV et voyez l'aperçu sans rien ouvrir. Le compte est demandé pour télécharger, et il garde vos CV pour les retrouver sur un autre appareil.",
  },
  {
    titre: 'Une mise en page qui ne bouge pas',
    texte: "Marges, alignements, puces : le modèle s'en occupe. Vous n'écrivez que le contenu.",
  },
]

const FAQ = [
  {
    q: 'Mon CV sera-t-il bien lu par les logiciels de recrutement (ATS) ?',
    r: "Le PDF contient du texte réel que ces logiciels peuvent extraire. Les modèles à une colonne sont les plus fiables : en deux colonnes, l'ordre de lecture peut varier d'un logiciel à l'autre. Pour une candidature formelle ou un grand recruteur, préférez le modèle Classique.",
  },
  {
    q: 'Comment télécharger mon CV ?',
    r: "Cliquez sur « Télécharger », connectez-vous ou créez un compte, puis choisissez le format. Le PDF s'enregistre depuis la fenêtre d'impression de votre navigateur (« Enregistrer au format PDF »). Le Word (.docx) est une version modifiable sur une colonne, sans photo.",
  },
  {
    q: 'Faut-il mettre une photo ?',
    r: "Jamais obligatoire. Elle est courante dans beaucoup de pays francophones, mais déconseillée au Royaume-Uni et aux États-Unis. Vous pouvez l'ajouter ou la retirer dans la rubrique Informations.",
  },
  {
    q: 'Combien de pages doit faire un CV ?',
    r: "Une page suffit dans la plupart des cas, surtout avec moins de dix ans d'expérience. Deux pages restent normales pour un long parcours.",
  },
  {
    q: 'Mon CV est-il enregistré ?',
    r: "Votre brouillon s'enregistre automatiquement dans votre navigateur. Si vous videz les données du navigateur, il disparaît : avec un compte, vous retrouvez vos CV sur n'importe quel appareil.",
  },
]

export default function Accueil() {
  useEffect(() => {
    document.title = 'CV Facile – Modèles de CV à remplir et télécharger en PDF'
  }, [])

  const ids = Object.keys(MODELES) as ModeleId[]

  return (
    <div className="bg-white font-texte text-slate-700">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Lien vers="/" className="font-titre text-lg font-extrabold text-nuit">CV Facile</Lien>
          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 sm:flex">
            <a href="#modeles" className="hover:text-nuit">Modèles</a>
            <a href="#etapes" className="hover:text-nuit">Comment ça marche</a>
            <a href="#faq" className="hover:text-nuit">Questions</a>
          </nav>
          <Lien vers="/creer" className={boutonS}>Créer mon CV</Lien>
        </div>
      </header>

      <main>
        {/* Accroche */}
        <section>
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 lg:grid-cols-[1.05fr_1fr] lg:py-20">
            <div>
              <h1 className="font-titre text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-nuit sm:text-5xl lg:text-[3.4rem]">
                Un CV professionnel, prêt à envoyer en 10&nbsp;minutes.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
                Choisissez un modèle, remplissez vos informations, téléchargez le PDF. La mise en page se règle toute
                seule et le texte reste lisible par les logiciels de recrutement.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <Lien vers="/creer" className={boutonM}>Créer mon CV</Lien>
                <a
                  href="#modeles"
                  className="font-semibold text-nuit underline decoration-mandarine decoration-2 underline-offset-4"
                >
                  Voir les modèles
                </a>
              </div>
              <p className="mt-4 text-sm text-slate-500">Créez et modifiez sans compte. Un compte est demandé pour télécharger.</p>
            </div>

            <div className="relative h-[360px] overflow-hidden rounded-2xl bg-mandarine-pale sm:h-[430px]">
              <div className="absolute left-1/2 top-6 -translate-x-1/2 sm:hidden">
                <Miniature id="executif" data={EXEMPLE_VITRINE} couleur={COULEUR} largeur={230} className="shadow-xl" />
              </div>
              <div className="absolute left-6 top-12 hidden sm:block">
                <Miniature id="classique" data={EXEMPLE_VITRINE} couleur={COULEUR} largeur={200} className="shadow-lg" />
              </div>
              <div className="absolute right-10 top-6 hidden sm:block">
                <Miniature id="executif" data={EXEMPLE_VITRINE} couleur={COULEUR} largeur={290} className="shadow-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Galerie : les aperçus sont les vrais modèles */}
        <section id="modeles" className="scroll-mt-4 bg-fond py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="font-titre text-3xl font-extrabold tracking-tight text-nuit">Les modèles</h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Chaque aperçu est le vrai rendu du modèle, avec des données d'exemple. Couleur et contenu se changent
              ensuite dans l'éditeur.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {ids.map((id) => (
                <article key={id} className="flex flex-col rounded-xl border border-slate-200 bg-white p-4">
                  <Lien vers={`/creer?modele=${id}`} className="mx-auto block">
                    <Miniature id={id} data={EXEMPLE_VITRINE} couleur={COULEUR} largeur={220} />
                  </Lien>
                  <h3 className="mt-4 font-titre text-lg font-bold text-nuit">{MODELES[id].nom}</h3>
                  <p className="mt-1 flex-1 text-sm leading-relaxed text-slate-600">{DESCRIPTIONS[id]}</p>
                  <p className="mt-3 text-xs font-semibold text-slate-500">
                    {MODELES[id].colonnes === 1 ? '1 colonne · lecture la plus sûre pour les logiciels de tri' : '2 colonnes'}
                  </p>
                  <Lien
                    vers={`/creer?modele=${id}`}
                    className="mt-4 inline-flex items-center justify-center rounded-lg border border-nuit px-4 py-2 text-sm font-semibold text-nuit hover:bg-nuit hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mandarine"
                  >
                    Utiliser ce modèle
                  </Lien>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Étapes */}
        <section id="etapes" className="scroll-mt-4 py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="font-titre text-3xl font-extrabold tracking-tight text-nuit">Comment ça marche</h2>
            <ol className="mt-10 grid gap-10 md:grid-cols-3">
              {ETAPES.map((e, i) => (
                <li key={e.titre}>
                  <span className="font-titre text-4xl font-extrabold text-nuit">{i + 1}</span>
                  <span className="mt-2 block h-1 w-8 bg-mandarine" aria-hidden="true" />
                  <h3 className="mt-4 font-titre text-lg font-bold text-nuit">{e.titre}</h3>
                  <p className="mt-1 text-slate-600">{e.texte}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Ce qui est vrai de l'outil */}
        <section className="bg-fond py-16 lg:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-3">
            {ATOUTS.map((a) => (
              <div key={a.titre} className="border-l-4 border-mandarine pl-5">
                <h3 className="font-titre text-lg font-bold text-nuit">{a.titre}</h3>
                <p className="mt-2 text-slate-600">{a.texte}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Questions */}
        <section id="faq" className="scroll-mt-4 py-16 lg:py-20">
          <div className="mx-auto max-w-3xl px-5">
            <h2 className="font-titre text-3xl font-extrabold tracking-tight text-nuit">Questions fréquentes</h2>
            <div className="mt-8 border-t border-slate-200">
              {FAQ.map((f) => (
                <details key={f.q} className="group border-b border-slate-200 py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-nuit [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span
                      className="text-2xl leading-none text-mandarine transition-transform group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-slate-600">{f.r}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Appel final */}
        <section className="bg-nuit py-16 text-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-titre text-3xl font-extrabold tracking-tight">Commencez votre CV maintenant.</h2>
              <p className="mt-2 text-slate-300">Vous pouvez essayer sans compte.</p>
            </div>
            <a href="#modeles" className={boutonM}>Choisir mon modèle</a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-nuit py-8 text-sm text-slate-400">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} CV Facile · Conçu par{' '}
            <a
              href="https://charosoft.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-200 underline underline-offset-2"
            >
              Charosoft
            </a>
          </p>
          <nav className="flex gap-6">
            <Lien vers="/creer" className="hover:text-white">Créer mon CV</Lien>
            <a href="#modeles" className="hover:text-white">Modèles</a>
            <a href="#faq" className="hover:text-white">Questions</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
