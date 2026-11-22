import type { CvData, Item, ListKey, PersoKey } from '../types'

// Décrit chaque section "liste". Le formulaire est généré depuis cette config.
// dates : si présent, le formulaire affiche des sélecteurs de dates (mois + année, ou année seule)
interface ListeCfg {
  titre: string
  champs: Record<string, string>
  longs?: string[]
  dates?: { precision: 'mois' | 'annee'; enCours: string }
}

export const LISTES: Record<ListKey, ListeCfg> = {
  liens:       { titre: 'Liens', champs: { label: 'Libellé (ex : GitHub)', url: 'Adresse' } },
  langues:     { titre: 'Langues', champs: { nom: 'Langue' } },
  experiences: { titre: 'Expériences', champs: { poste: 'Poste', lieu: 'Entreprise', desc: 'Description' }, longs: ['desc'], dates: { precision: 'mois', enCours: "J'occupe ce poste actuellement" } },
  formations:  { titre: 'Formations', champs: { diplome: 'Diplôme', ecole: 'École' }, dates: { precision: 'annee', enCours: 'Formation en cours' } },
  competences: { titre: 'Compétences', champs: { nom: 'Compétence' } },
  stages:      { titre: 'Stages', champs: { poste: 'Poste', lieu: 'Lieu', desc: 'Description' }, longs: ['desc'], dates: { precision: 'mois', enCours: 'Stage en cours' } },
}

export const PERSO_CHAMPS: Record<Exclude<PersoKey, 'photo'>, string> = {
  nom: 'Nom complet',
  titre: 'Titre du poste',
  email: 'Email',
  tel: 'Téléphone',
  ville: 'Ville',
  nationalite: 'Nationalité',
  naissance: 'Date de naissance',
}

export const EXEMPLE: CvData = {
  perso: {
    nom: 'Prénom NOM', titre: 'Titre du poste', email: 'email@exemple.com', tel: '+243 000 000 000',
    ville: 'Kinshasa, RD Congo', nationalite: 'Congolaise', naissance: '01 janv. 2000', photo: '',
  },
  profil: 'Décris-toi en 3 ou 4 lignes : ton métier, tes forces, ce que tu proposes.',
  interets: 'Veille technologique, création digitale',
  liens: [{ label: 'GitHub', url: 'github.com/ton-compte' }],
  langues: [{ nom: 'Français' }, { nom: 'Lingala' }],
  experiences: [{ poste: 'Développeur web', lieu: 'Freelance', debut: '2024-01', fin: '', enCours: '1', desc: '• Réalisé 5 applications web.\n• Utilisé React et Node.js.' }],
  formations: [{ diplome: 'Licence en Informatique', ecole: 'Université', debut: '2022', fin: '2025', enCours: '' }],
  competences: [{ nom: 'React' }, { nom: 'TypeScript' }, { nom: 'PostgreSQL' }],
  stages: [{ poste: 'Stagiaire', lieu: 'Entreprise', debut: '2025-05', fin: '2025-06', enCours: '', desc: '' }],
}

// Crée un élément vide pour une section (ex : une expérience vide)
export const vide = (l: ListKey): Item => ({
  ...Object.fromEntries(Object.keys(LISTES[l].champs).map((k) => [k, ''])),
  ...(LISTES[l].dates ? { debut: '', fin: '', enCours: '' } : {}),
})
