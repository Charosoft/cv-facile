# CV Facile

Créateur de CV (React + Vite + Tailwind) avec API Express et Postgres hébergé sur Supabase.

## Lancer en local
```bash
cd server && cp .env.example .env   # remplir DATABASE_URL et JWT_SECRET
npm install && npm run dev

cd client && cp .env.example .env
npm install && npm run dev   # installe aussi `docx` (export Word)
```

## Ajouter un modèle de CV
1. Créer `client/src/components/templates/MonModele.tsx` (reçoit `d` = données, `c` = couleur).
2. Ajouter son id dans `ModeleId` (`client/src/types.ts`).
3. Ajouter une ligne dans `client/src/components/templates/index.ts`.
La vignette du sélecteur se génère toute seule.

## Export
- **PDF** : fenêtre d'impression du navigateur (texte réel, mise en page du modèle).
- **Word (.docx)** : généré dans le navigateur par `client/src/lib/word.ts` (une colonne, sans photo). La librairie
  n'est chargée qu'au clic sur « Word ».
- Le téléchargement demande un compte, mais ce contrôle est côté interface. Pour le rendre infranchissable
  (offre payante), il faudra générer les fichiers côté serveur.
