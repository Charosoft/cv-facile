import type { TplProps } from '../../types'
import { Bloc, comps, contact, exp, form, interets, langues, liens, photo, profil, stages } from './blocks'

export default function Classique({ d, c }: TplProps) {
  return (
    <div className="min-h-[297mm]">
      <div className="border-b-[3px] px-8 pb-3 pt-7 text-center" style={{ borderColor: c }}>
        {photo(d, 'mx-auto mb-2 h-24 w-24 rounded-full object-cover')}
        <h1 className="text-[28px] font-bold uppercase tracking-wide">{d.perso.nom}</h1>
        <div className="text-[15px] font-bold" style={{ color: c }}>{d.perso.titre}</div>
        <div className="text-gray-500">{contact(d)}</div>
      </div>
      <div className="px-8 pb-8 pt-2">
        <Bloc titre="Profil" c={c}>{profil(d)}</Bloc>
        <Bloc titre="Expériences professionnelles" c={c}>{exp(d)}</Bloc>
        <Bloc titre="Formation" c={c}>{form(d)}</Bloc>
        <Bloc titre="Stages" c={c}>{stages(d)}</Bloc>
        <Bloc titre="Compétences" c={c}>{comps(d, c)}</Bloc>
        <Bloc titre="Langues" c={c}>{langues(d)}</Bloc>
        <Bloc titre="Liens" c={c}>{liens(d)}</Bloc>
        <Bloc titre="Centres d'intérêt" c={c}>{interets(d)}</Bloc>
      </div>
    </div>
  )
}
