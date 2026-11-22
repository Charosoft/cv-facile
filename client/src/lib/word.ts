import {
  AlignmentType, BorderStyle, Document, HeadingLevel, LevelFormat, Packer, Paragraph, Tab, TabStopType, TextRun,
} from 'docx'
import type { CvState, Item } from '../types'
import { preparer } from './dates'
import { paragraphes, puces } from './texte'
import { contraste } from './utils'

// Version Word : une seule colonne, sans photo, titres standards (Profil, Expériences…).
// Volontairement simple : modifiable à la main et sans risque pour les logiciels de recrutement.
const POLICE = 'Calibri'
const LARGEUR_TEXTE = 9906 // A4 (11906) moins 2 x 1000 de marges, en twips
const GRIS = '64748B'

export async function construireWord(etat: CvState): Promise<Blob> {
  const d = preparer(etat.data)
  const p = d.perso
  // La couleur choisie sert aux titres ; si elle est trop claire pour du texte sur blanc, on met un gris foncé
  const couleur = contraste(etat.couleur) === '#ffffff' ? etat.couleur.slice(1) : '1F2937'

  const titreSection = (texte: string) =>
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'CBD5E1', space: 2 } },
      children: [new TextRun(texte)],
    })

  const texte = (t: string, extra: { bold?: boolean; color?: string; italics?: boolean } = {}) =>
    new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: t, ...extra })] })

  const lignesDesc = (desc?: string) => {
    const l = puces(desc)
    if (l.length === 1) return [texte(l[0])]
    return l.map((x) =>
      new Paragraph({ numbering: { reference: 'puces', level: 0 }, spacing: { after: 30 }, children: [new TextRun(x)] }),
    )
  }

  // Une entrée : titre en gras à gauche, dates à droite, puis le lieu et les puces
  const entree = (titre: string, dates: string, sous: string, desc?: string) => [
    new Paragraph({
      keepNext: true,
      spacing: { before: 100, after: 20 },
      tabStops: [{ type: TabStopType.RIGHT, position: LARGEUR_TEXTE }],
      children: [
        new TextRun({ text: titre, bold: true }),
        ...(dates ? [new TextRun({ children: [new Tab(), dates], color: GRIS })] : []),
      ],
    }),
    ...(sous ? [texte(sous, { color: GRIS, italics: true })] : []),
    ...lignesDesc(desc),
  ]

  const experiences = (liste: Item[], titreCle: string, sousCle: string) =>
    liste.filter((e) => e[titreCle]).flatMap((e) => entree(e[titreCle], e.periode, e[sousCle], e.desc))

  const section = (titre: string, contenu: Paragraph[]) => (contenu.length ? [titreSection(titre), ...contenu] : [])

  const contact = [p.ville, p.tel, p.email].filter(Boolean).join('   |   ')
  const liens = d.liens.filter((x) => x.url).map((x) => texte(x.label ? `${x.label} : ${x.url}` : x.url))
  const identite = [
    p.nationalite && `Nationalité : ${p.nationalite}`,
    p.naissance && `Date de naissance : ${p.naissance}`,
  ].filter((x): x is string => Boolean(x))

  const enTete = [
    new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun(p.nom)] }),
    ...(p.titre ? [new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: p.titre.toUpperCase(), bold: true, color: couleur })] })] : []),
    ...(contact ? [new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: contact, color: GRIS })] })] : []),
  ]

  const corps = [
    ...section('Profil', paragraphes(d.profil).map((x) => new Paragraph({ spacing: { after: 60 }, alignment: AlignmentType.JUSTIFIED, children: [new TextRun(x)] }))),
    ...section('Expériences professionnelles', experiences(d.experiences, 'poste', 'lieu')),
    ...section('Formation', d.formations.filter((e) => e.diplome).flatMap((e) => entree(e.diplome, e.periode, e.ecole))),
    ...section('Stages', experiences(d.stages, 'poste', 'lieu')),
    ...section('Compétences', d.competences.some((c) => c.nom) ? [texte(d.competences.map((c) => c.nom).filter(Boolean).join(', '))] : []),
    ...section('Langues', d.langues.some((l) => l.nom) ? [texte(d.langues.map((l) => l.nom).filter(Boolean).join(', '))] : []),
    ...section('Liens', liens),
    ...section("Centres d'intérêt", d.interets ? [texte(d.interets)] : []),
    ...section('Informations personnelles', identite.map((x) => texte(x))),
  ]

  const doc = new Document({
    title: `CV ${p.nom}`.trim(),
    creator: p.nom || 'CV Facile',
    styles: {
      default: {
        document: { run: { font: POLICE, size: 21 } },
        title: { run: { font: POLICE, size: 44, bold: true, color: '111827' }, paragraph: { spacing: { before: 0, after: 40 }, keepNext: true } },
        heading1: { run: { font: POLICE, size: 24, bold: true, color: couleur, allCaps: true }, paragraph: { spacing: { before: 240, after: 80 }, keepNext: true } },
      },
    },
    numbering: {
      config: [{
        reference: 'puces',
        levels: [{
          level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 360, hanging: 240 } } },
        }],
      }],
    },
    sections: [{
      properties: { page: { margin: { top: 850, bottom: 850, left: 1000, right: 1000 } } },
      children: [...enTete, ...corps],
    }],
  })

  return Packer.toBlob(doc)
}
