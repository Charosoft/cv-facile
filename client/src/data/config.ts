import type { CvData, Item, ListKey, PersoKey } from '../types'

// Décrit chaque section "liste". Le formulaire est généré depuis cette config.
export const LISTES: Record<ListKey, { titre: string; champs: Record<string, string>; longs?: string[] }> = {
  liens:       { titre: 'Liens', champs: { label: 'Libellé (ex : GitHub)', url: 'Adresse' } },
  langues:     { titre: 'Langues', champs: { nom: 'Langue' } },
  experiences: { titre: 'Expériences', champs: { poste: 'Poste', lieu: 'Entreprise', periode: 'Période', desc: 'Description' }, longs: ['desc'] },
  formations:  { titre: 'Formations', champs: { diplome: 'Diplôme', ecole: 'École', periode: 'Année / période' } },
  competences: { titre: 'Compétences', champs: { nom: 'Compétence' } },
  stages:      { titre: 'Stages', champs: { poste: 'Poste', lieu: 'Lieu', periode: 'Période', desc: 'Description' }, longs: ['desc'] },
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
  experiences: [{ poste: 'Développeur web', lieu: 'Freelance', periode: '2024 - Présent', desc: '• Réalisé 5 applications web.\n• Utilisé React et Node.js.' }],
  formations: [{ diplome: 'Licence en Informatique', ecole: 'Université', periode: '2025' }],
  competences: [{ nom: 'React' }, { nom: 'TypeScript' }, { nom: 'PostgreSQL' }],
  stages: [{ poste: 'Stagiaire', lieu: 'Entreprise', periode: 'mai 2025 - juin 2025', desc: '' }],
}

// Crée un élément vide pour une section (ex : une expérience vide)
export const vide = (l: ListKey): Item =>
  Object.fromEntries(Object.keys(LISTES[l].champs).map((k) => [k, '']))
