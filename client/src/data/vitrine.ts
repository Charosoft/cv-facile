import type { CvData } from '../types'

// CV fictif utilisé pour les aperçus de la page d'accueil (aucune donnée réelle).
export const EXEMPLE_VITRINE: CvData = {
  perso: {
    nom: 'Awa MBALA', titre: 'Comptable', email: 'awa.mbala@exemple.com', tel: '+243 81 000 00 00',
    ville: 'Kinshasa, RD Congo', nationalite: 'Congolaise', naissance: '12 mars 1994', photo: '',
  },
  profil: "Comptable avec 6 ans d'expérience en PME : tenue de la comptabilité, clôtures mensuelles et déclarations fiscales. Rigoureuse, à l'aise avec Excel et les logiciels comptables, je vise un poste de responsable comptable.",
  interets: 'Lecture, bénévolat, football',
  liens: [{ label: 'LinkedIn', url: 'linkedin.com/in/prenom-nom' }],
  langues: [{ nom: 'Français' }, { nom: 'Lingala' }, { nom: 'Anglais (notions)' }],
  experiences: [
    {
      poste: 'Comptable', lieu: 'Kivu Distribution, Kinshasa', debut: '2021-03', fin: '', enCours: '1',
      desc: '• Tenue de la comptabilité générale et clôture mensuelle.\n• Préparation des déclarations fiscales et suivi des relances clients.\n• Rapprochement bancaire hebdomadaire pour réduire les écarts de caisse.',
    },
    {
      poste: 'Assistante comptable', lieu: 'Cabinet Mbuyi & Associés', debut: '2018-02', fin: '2021-02', enCours: '',
      desc: '• Saisie des écritures et rapprochements bancaires.\n• Classement et archivage des pièces justificatives.',
    },
  ],
  formations: [
    { diplome: 'Licence en Sciences commerciales et financières', ecole: 'Université de Kinshasa', debut: '2015', fin: '2018', enCours: '' },
    { diplome: "Diplôme d'État en Commerce et Gestion", ecole: 'Institut de la Gombe', debut: '2012', fin: '2015', enCours: '' },
  ],
  competences: [
    { nom: 'Comptabilité générale' }, { nom: 'Fiscalité' }, { nom: 'Excel avancé' },
    { nom: 'Rapprochement bancaire' }, { nom: 'Reporting' },
  ],
  stages: [
    { poste: 'Stagiaire comptable', lieu: 'Banque commerciale', debut: '2017-06', fin: '2017-08', enCours: '', desc: 'Participation aux contrôles de fin de mois.' },
  ],
}
