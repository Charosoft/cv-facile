import type { TplProps } from '../../types'
import { Bloc, comps, contact, exp, form, infos, interets, langues, liens, photo, profil, stages } from './blocks'

export default function Sidebar({ d, c }: TplProps) {
  return (
    <div className="grid min-h-[297mm] grid-cols-[32%_68%]">
      <div className="px-4 py-6" style={{ background: `color-mix(in srgb, ${c} 10%, white)` }}>
        {photo(d, 'mx-auto mb-3 h-28 w-28 rounded-full object-cover')}
        <Bloc titre="Profil" c={c}>{profil(d)}</Bloc>
        <Bloc titre="Liens" c={c}>{liens(d)}</Bloc>
        <Bloc titre="Langues" c={c}>{langues(d)}</Bloc>
        <Bloc titre="Centres d'intérêt" c={c}>{interets(d)}</Bloc>
        <Bloc titre="Informations" c={c}>{infos(d)}</Bloc>
      </div>
      <div className="px-6 py-6">
        <h1 className="text-[28px] font-bold uppercase tracking-wide">{d.perso.nom}</h1>
        <div className="text-[15px] font-bold" style={{ color: c }}>{d.perso.titre}</div>
        <div className="text-gray-500">{contact(d)}</div>
        <Bloc titre="Expériences professionnelles" c={c}>{exp(d)}</Bloc>
        <Bloc titre="Éducation" c={c}>{form(d)}</Bloc>
        <Bloc titre="Compétences" c={c}>{comps(d, c)}</Bloc>
        <Bloc titre="Stages" c={c}>{stages(d)}</Bloc>
      </div>
    </div>
  )
}
