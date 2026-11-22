import type { ReactNode } from 'react'
import type { CvData, Item } from '../../types'
import { JUSTIFIE, paragraphes, puces } from '../../lib/texte'
import { urlSure } from '../../lib/utils'

// Titre de section : ne s'affiche que s'il y a du contenu
export function Bloc({ titre, c, children }: { titre: string; c: string; children: ReactNode }) {
  if (!children) return null
  return (
    <section className="mt-4">
      <h2
        className="mb-2 border-b-2 pb-0.5 text-[13px] font-bold uppercase"
        style={{ color: c, borderColor: c }}
      >
        {titre}
      </h2>
      {children}
    </section>
  )
}

// Description d'un poste : vraies puces, retours à la ligne parasites supprimés, texte justifié
function Desc({ texte }: { texte?: string }) {
  const l = puces(texte)
  if (!l.length) return null
  if (l.length === 1) return <p className={`mt-0.5 ${JUSTIFIE}`}>{l[0]}</p>
  return (
    <ul className={`mt-0.5 list-disc space-y-0.5 pl-4 ${JUSTIFIE}`}>
      {l.map((x, i) => <li key={i}>{x}</li>)}
    </ul>
  )
}

// Les fonctions ci-dessous renvoient du JSX, ou null si la section est vide
export const entrees = (liste: Item[], titreKey: string, sousKey: string) => {
  const l = liste.filter((e) => e[titreKey])
  if (!l.length) return null
  return l.map((e, i) => (
    <div key={i} className="mb-2.5 break-inside-avoid">
      <div className="flex justify-between gap-2 font-bold">
        <span>{e[titreKey]}</span>
        <span className="whitespace-nowrap font-normal text-gray-500">{e.periode}</span>
      </div>
      <div className="text-gray-500">{e[sousKey]}</div>
      <Desc texte={e.desc} />
    </div>
  ))
}

export const exp = (d: CvData) => entrees(d.experiences, 'poste', 'lieu')
export const form = (d: CvData) => entrees(d.formations, 'diplome', 'ecole')
export const stages = (d: CvData) => entrees(d.stages, 'poste', 'lieu')

export const profil = (d: CvData) => {
  const p = paragraphes(d.profil)
  return p.length ? (
    <div className={`space-y-2 ${JUSTIFIE}`}>{p.map((x, i) => <p key={i}>{x}</p>)}</div>
  ) : null
}

export const interets = (d: CvData) =>
  d.interets ? <p>{d.interets}</p> : null

export const langues = (d: CvData) => {
  const l = d.langues.filter((x) => x.nom)
  return l.length ? (
    <ul className="list-disc pl-4">
      {l.map((x, i) => <li key={i}>{x.nom}</li>)}
    </ul>
  ) : null
}

export const liens = (d: CvData) => {
  const l = d.liens.filter((x) => x.url)
  return l.length
    ? l.map((x, i) => (
        <div key={i} className="break-words">
          <b>{x.label}</b>{' '}
          <a href={urlSure(x.url)} target="_blank" rel="noopener noreferrer">{x.url}</a>
        </div>
      ))
    : null
}

export const infos = (d: CvData) => {
  const { nationalite, naissance } = d.perso
  if (!nationalite && !naissance) return null
  return (
    <>
      {nationalite && <div><b>Nationalité</b><br />{nationalite}</div>}
      {naissance && <div className="mt-1"><b>Naissance</b><br />{naissance}</div>}
    </>
  )
}

export const comps = (d: CvData, c: string) => {
  const l = d.competences.filter((x) => x.nom)
  return l.length
    ? l.map((x, i) => (
        <span key={i} className="mb-1 mr-1 inline-block rounded-full px-2.5 py-0.5 text-[11.5px] text-white" style={{ background: c }}>
          {x.nom}
        </span>
      ))
    : null
}

export const contact = (d: CvData) =>
  [d.perso.email, d.perso.tel, d.perso.ville].filter(Boolean).join(' • ')

export const photo = (d: CvData, className: string) =>
  d.perso.photo ? <img src={d.perso.photo} alt="" className={className} /> : null
