import type { TplProps } from '../../types'
import { Bloc, comps, contact, exp, form, infos, langues, liens, photo, profil, stages } from './blocks'

export default function Moderne({ d, c }: TplProps) {
  return (
    <div className="min-h-[297mm]">
      <div className="flex items-center gap-5 px-8 py-6 text-white" style={{ background: c }}>
        {photo(d, 'h-24 w-24 rounded-full object-cover')}
        <div>
          <h1 className="text-[28px] font-bold uppercase tracking-wide">{d.perso.nom}</h1>
          <div className="text-[15px] font-bold text-white/90">{d.perso.titre}</div>
          <div className="text-white/80">{contact(d)}</div>
        </div>
      </div>
      <div className="grid grid-cols-[65%_35%] gap-6 px-8 pb-8 pt-2">
        <div>
          <Bloc titre="Profil" c={c}>{profil(d)}</Bloc>
          <Bloc titre="Expériences professionnelles" c={c}>{exp(d)}</Bloc>
          <Bloc titre="Stages" c={c}>{stages(d)}</Bloc>
        </div>
        <div>
          <Bloc titre="Compétences" c={c}>{comps(d, c)}</Bloc>
          <Bloc titre="Formation" c={c}>{form(d)}</Bloc>
          <Bloc titre="Langues" c={c}>{langues(d)}</Bloc>
          <Bloc titre="Liens" c={c}>{liens(d)}</Bloc>
          <Bloc titre="Informations" c={c}>{infos(d)}</Bloc>
        </div>
      </div>
    </div>
  )
}
