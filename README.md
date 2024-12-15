# Vapeur

Vapeur est une application web dynamique permettant de gérer une collection de jeux vidéo. Ce projet utilise Express.js pour le backend, Prisma pour la gestion de la base de données SQLite, et Handlebars (hbs) comme moteur de templates.

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

4. **Navigation intuitive** :
   - Liens interconnectés permettant de naviguer entre jeux, genres et éditeurs.
   - Tri alphabétique des listes.

## Pré-requis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Installation

1. Clonez le dépôt Git :

   ```bash
   git clone <URL_DU_DEPOT>
   cd Vapeur
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Configurez la base de données avec Prisma :

   - Initialisez Prisma :

     ```bash
     npx prisma init
     ```

   - Modifiez le fichier `prisma/schema.prisma` si nécessaire (le fichier par défaut est configuré pour SQLite).

   - Appliquez les migrations :

     ```bash
     npx prisma migrate dev --name init
     ```

   - Seed la base de données avec les genres par défaut (Action, Aventure, RPG, etc.) :

     ```bash
     npx prisma db seed
     ```

4. Lancez le serveur de développement :

   ```bash
   npm start
   ```

5. Accédez à l'application dans votre navigateur à l'adresse :

   ```
   http://localhost:3000
   ```

## Structure du projet

```
Vapeur/
├── prisma/                 # Fichiers Prisma pour la base de données
│   ├── schema.prisma       # Définition du schéma de la base de données
│   └── migrations/         # Migrations Prisma
├── public/                 # Fichiers statiques (CSS, JS, images)
├── src/                    # Code source de l'application
│   ├── routes/             # Définition des routes Express.js
│   ├── views/              # Templates Handlebars (hbs)
│   ├── controllers/        # Logique des fonctionnalités
│   └── models/             # Gestion des données via Prisma
├── .env                    # Variables d'environnement
├── package.json            # Dépendances et scripts npm
└── README.md               # Documentation du projet
```

## Commandes utiles

- `npm start` : Lance le serveur en mode production.
- `npm run dev` : Lance le serveur en mode développement avec rechargement à chaud.
- `npx prisma studio` : Accède à Prisma Studio pour gérer visuellement les données.

## Fonctionnalités à implémenter

Pour répondre aux critères de notation :

- [x] Afficher la liste des jeux mis en avant sur la page d'accueil.
- [x] Afficher la liste de tous les jeux.
- [x] Création d'un jeu.
- [x] Afficher le détail d'un jeu (avec ses infos, son genre et son éditeur).
- [x] Modification d'un jeu (titre, description, date de sortie, genre, éditeur).
- [x] Suppression d'un jeu.
- [x] Possibilité d'afficher les jeux mis en avant sur la page d'accueil.
- [x] Afficher la liste des genres.
- [x] Afficher la liste des jeux d'un genre.
- [x] Création d'un éditeur.
- [x] Afficher la liste des éditeurs.
- [x] Afficher la liste des jeux d'un éditeur.
- [x] Modification d'un éditeur.
- [x] Suppression d'un éditeur.

## Contributions

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez ce dépôt.
2. Créez une branche pour vos modifications :

   ```bash
   git checkout -b feature/ma-nouvelle-fonctionnalite
   ```

3. Commitez vos changements :

   ```bash
   git commit -m "Ajout d'une nouvelle fonctionnalité"
   ```

4. Poussez vos modifications :

   ```bash
   git push origin feature/ma-nouvelle-fonctionnalite
   ```

5. Ouvrez une Pull Request.

## Licence

Ce projet est sous licence [MIT](LICENSE).

---

Merci d'utiliser Vapeur !
