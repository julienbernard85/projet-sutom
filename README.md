# projet-sutom
Création d'un Sutom en typescript


## Installation des dépendances

```bash
npm install
```

## Démarrage des tests

```bash
npm run test
```

## Jouer au Sutom (CLI)

```bash
npm run cli
```

## Explication des règles

Lors du lancement du CLI, le jeu va démarrer en laissant à l'utilisateur la possibilité d'écrire dans la console jusqu'à 6 tentatives.
Il peut aller écrire des propositions de mots, pour l'instant les mots du dictionnaire limité sont indiqué dans le fichier words.ts.

Une lettre non présent dans le mot attendu est indiqué par un carré noir ⬛, une lettre présente mais n'ayant pas la bonne position par un carré orange 🟨 et enfin la bonne lettre à la bonne position est indiqué par un carré vert 🟩. 

En cas d'échec, le mot attendu sera affiché dans la console et la partie se terminera.