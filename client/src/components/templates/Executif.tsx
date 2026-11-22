import type { ComponentType, ReactNode } from 'react'
import { JUSTIFIE, paragraphes, puces } from '../../lib/texte'
import { contraste, urlSure } from '../../lib/utils'
import type { Item, TplProps } from '../../types'
import { photo } from './blocks'
import { IconCode, IconLink, IconLinkedin, IconMail, IconPhone, IconPin } from './icons'

interface Ligne { gauche: ReactNode; titre: string; sous?: string; desc?: string }

function Puces({ texte }: { texte?: string }) {
  const l = puces(texte)
  if (!l.length) return null
  if (l.length === 1) return <p className={`mt-1 text-gray-600 ${JUSTIFIE}`}>{l[0]}</p>
  return (
    <ul className={`mt-1 list-disc space-y-1 pl-4 text-gray-600 marker:text-gray-400 ${JUSTIFIE}`}>
      {l.map((x, i) => <li key={i}>{x}</li>)}
    </ul>
  )
}

// Frise : date à gauche, point + trait au milieu, contenu à droite
function Chrono({ lignes, c }: { lignes: Ligne[]; c: string }) {
  return (
    <div>
      {lignes.map((l, i) => (
        <div key={i} className="grid grid-cols-[25%_20px_1fr] break-inside-avoid">
          <div className="pr-3 pt-px text-gray-500">{l.gauche}</div>
          <div className="relative" aria-hidden="true">
            <span className="absolute left-1/2 top-[5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full" style={{ background: c }} />
            <span className="absolute bottom-0 left-1/2 top-[8px] w-0.5 -translate-x-1/2" style={{ background: c }} />
          </div>
          <div className="pb-3 pl-2.5">
            <div className="font-bold text-gray-900">{l.titre}</div>
            {l.sous && <div className="text-gray-500">{l.sous}</div>}
            <Puces texte={l.desc} />
          </div>
        </div>
      ))}
    </div>
  )
}

function Principal({ titre, children }: { titre: string; children: ReactNode }) {
  return (
    <section className="mt-5">
      <h2 className="mb-3 break-after-avoid border-b-2 border-gray-800 pb-1 text-[16px] font-bold uppercase text-gray-900">{titre}</h2>
      {children}
    </section>
  )
}

function Lateral({ titre, children }: { titre: string; children: ReactNode }) {
  return (
    <section className="mt-5 border-t border-current/25 pt-4 first:mt-0 first:border-0 first:pt-0">
      <h2 className="mb-2.5 break-after-avoid text-[14px] font-bold uppercase">{titre}</h2>
      {children}
    </section>
  )
}

const iconeLien = (x: Item): ComponentType => {
  const s = `${x.label} ${x.url}`.toLowerCase()
  if (s.includes('linkedin')) return IconLinkedin
  if (s.includes('github') || s.includes('gitlab')) return IconCode
  return IconLink
}

export default function Executif({ d, c }: TplProps) {
  const txt = contraste(c)
  const p = d.perso

  const contacts: [ComponentType, string][] = [[IconPin, p.ville], [IconPhone, p.tel], [IconMail, p.email]]
  const exp: Ligne[] = d.experiences.filter((e) => e.poste)
    .map((e) => ({ gauche: e.periode, titre: e.poste, sous: e.lieu, desc: e.desc }))
  const form: Ligne[] = d.formations.filter((e) => e.diplome)
    .map((e) => ({ gauche: <><span className="uppercase">{e.ecole}</span><br />{e.periode}</>, titre: e.diplome }))
  const stg: Ligne[] = d.stages.filter((e) => e.poste)
    .map((e) => ({ gauche: <>{e.lieu}<br />{e.periode}</>, titre: e.poste, desc: e.desc }))
  const comps = d.competences.filter((x) => x.nom)
  const liens = d.liens.filter((x) => x.url)
  const langues = d.langues.filter((x) => x.nom)

  return (
    // Le fond est sur la racine : la colonne colorée continue sur la page 2.
    <div
      className="grid min-h-[297mm] grid-cols-[30%_70%] text-[11.5px] leading-[1.35]"
      style={{ background: `linear-gradient(to right, ${c} 30%, #ffffff 30%)` }}
    >
      {/* ATS : le contenu principal est AVANT la barre latérale dans le code,
          donc lu en premier (nom, contact, expériences), même si elle s'affiche à gauche. */}
      <div className="col-start-2 row-start-1 px-7 py-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h1 className="break-words text-[28px] font-extrabold uppercase leading-[1.05] text-gray-900">{p.nom}</h1>
            <div className="mt-2 text-[12.5px] font-bold uppercase" style={{ color: c }}>{p.titre}</div>
          </div>
          <ul className="max-w-[44%] space-y-2 text-[11px] text-gray-800">
            {contacts.filter(([, v]) => v).map(([Icone, v], i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ background: c, color: txt }}>
                  <Icone />
                </span>
                <span className="break-words">{v}</span>
              </li>
            ))}
          </ul>
        </div>

        {exp.length > 0 && <Principal titre="Expériences professionnelles"><Chrono lignes={exp} c={c} /></Principal>}
        {form.length > 0 && <Principal titre="Éducation"><Chrono lignes={form} c={c} /></Principal>}
        {comps.length > 0 && (
          <Principal titre="Compétences">
            <div className="flex flex-wrap gap-1.5">
              {comps.map((x, i) => (
                <span key={i} className="border border-gray-700 px-2.5 py-[3px] text-[11px] text-gray-800">{x.nom}</span>
              ))}
            </div>
          </Principal>
        )}
        {stg.length > 0 && <Principal titre="Stages"><Chrono lignes={stg} c={c} /></Principal>}
      </div>

      <div className="col-start-1 row-start-1 px-5 py-6" style={{ color: txt }}>
        {photo(d, 'mx-auto mb-4 h-28 w-28 rounded-full object-cover')}
        {d.profil && <Lateral titre="Profil"><div className={`space-y-2 opacity-90 ${JUSTIFIE}`}>{paragraphes(d.profil).map((x, i) => <p key={i}>{x}</p>)}</div></Lateral>}
        {liens.length > 0 && (
          <Lateral titre="Liens">
            {liens.map((x, i) => {
              const Ico = iconeLien(x)
              return (
                <div key={i} className="mb-2 flex gap-2">
                  <span className="mt-0.5 shrink-0"><Ico /></span>
                  <div className="min-w-0 break-words">
                    {x.label && <b className="block">{x.label}</b>}
                    <a href={urlSure(x.url)} target="_blank" rel="noopener noreferrer" className="opacity-90">{x.url}</a>
                  </div>
                </div>
              )
            })}
          </Lateral>
        )}
        {langues.length > 0 && (
          <Lateral titre="Langues">{langues.map((x, i) => <div key={i} className="opacity-90">{x.nom}</div>)}</Lateral>
        )}
        {d.interets && <Lateral titre="Centres d'intérêt"><p className="opacity-90">{d.interets}</p></Lateral>}
        {(p.nationalite || p.naissance) && (
          <Lateral titre="Informations personnelles">
            {p.nationalite && <div className="mb-2"><b className="block">Nationalité</b><span className="opacity-90">{p.nationalite}</span></div>}
            {p.naissance && <div><b className="block">Date de naissance</b><span className="opacity-90">{p.naissance}</span></div>}
          </Lateral>
        )}
      </div>
    </div>
  )
}
