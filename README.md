# Vapeur

Vapeur est une application web dynamique permettant de gérer une collection de jeux vidéo. Ce projet utilise Express.js pour le backend, Prisma pour la gestion de la base de données SQLite, et Handlebars comme moteur de templates.

## Fonctionnalités principales

L'application Vapeur permet :

1. **Gestion des jeux** :
   - Création, modification et suppression de jeux.
   - Affichage des détails d'un jeu, incluant son titre, description, date de sortie, genre et éditeur.
   - Possibilité de mettre en avant certains jeux sur la page d'accueil.

2. **Gestion des genres de jeux** :
   - Affichage de la liste des genres.
   - Visualisation des jeux associés à un genre.

3. **Gestion des éditeurs de jeux** :
   - Création, modification et suppression d'éditeurs.
   - Affichage de la liste des éditeurs.
   - Visualisation des jeux associés à un éditeur.

## Pré-requis

Avant de commencer, assurez-vous d'avoir les éléments suivants de pré-installés :

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Installation

1. **Clonez le dépôt Git** :

   ```bash
   git clone <URL_DU_DEPOT>
   cd Vapeur_Detournay_Bordet
   ```

2. **Installez les dépendances** :

   ```bash
   npm install
   ```

3. **Créez un fichier `.env`** à la racine du projet pour configurer vos variables d'environnement :

   ```env
   DATABASE_URL="file:./prisma/database.db"
   ```

4. **Configurez Prisma** :

   - Initialisez la base de données et appliquez les migrations :
     
     ```bash
     npx prisma migrate dev --name init
     ```

   - Ajoutez des genres et éditeurs par défaut dans la base de données à l'aide d'une seed :
     
     ```bash
     npm run seed
     ```

5. **Lancez le serveur** :

   ```bash
   npm start
   ```

6. **Accédez à l'application** dans votre navigateur :

   ```
   http://localhost:3000
   ```

## Structure du projet

```
Vapeur_Detournay_Bordet/
├── prisma/                 # Fichiers Prisma
│   ├── schema.prisma          # Définition du schéma de la base de données
│   └── seed.js                # Fichier pour initialiser les données de base
├── public/                 # Fichiers statiques
│   └── css/
│       └── global.css            # Fichier CSS
├── routes/                 # Définition des routes
│   ├── editorRoutes.js        # Routes pour les éditeurs
│   ├── gameRoutes.js          # Routes pour les jeux
│   └── genreRoutes.js         # Routes pour les genres
├── views/                  # Templates hbs
│   ├── editors/               # Templates pour les éditeurs
│   │   ├── edit.hbs              # Formulaire d'édition
│   │   ├── games.hbs             # Liste des jeux d'un éditeur
│   │   ├── index.hbs             # Liste des éditeurs
│   │   └── new.hbs               # Formulaire de création
│   ├── games/                 # Templates pour les jeux
│   │   ├── details.hbs           # Détails d'un jeu
│   │   ├── edit.hbs              # Formulaire d'édition
│   │   ├── index.hbs             # Liste des jeux
│   │   └── new.hbs               # Formulaire de création
│   ├── genres/                # Templates pour les genres
│   │   ├── games.hbs             # Liste des jeux d'un genre
│   │   └── index.hbs             # Liste des genres
│   └── partials/              # Templates partials
│       ├── header.hbs            
│       ├── index.hbs             
│       └── layout.hbs            # Layout principal
├── .gitignore              # Fichiers à ignorer dans Git
├── package-lock.json       
├── package.json            # Dépendances et scripts npm
├── README.md               # Documentation du projet
└── server.js               # Serveur Express
```


---

Merci d'utiliser Vapeur !
