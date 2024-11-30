const express = require("express");
const {PrismaClient} = require("@prisma/client");
const bodyParser = require("body-parser");
const path = require("path");
const hbs = require("hbs");

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;


app.use(bodyParser.urlencoded({ extended: true }));

// Configuration de Handlebars pour Express
app.set("view engine", "hbs"); // On définit le moteur de template que Express va utiliser
app.set("views", path.join(__dirname, "views")); // On définit le dossier des vues (dans lequel se trouvent les fichiers .hbs)
hbs.registerPartials(path.join(__dirname, "views/partials")); // On définit le dossier des partials (composants e.g. header, footer, menu...)



app.get("/", async (req, res) => {
    res.render("index");
});

app.get("/games", async (req, res) => {
    const games = await prisma.game.findMany();
    res.render("games/index", {
        games,
    });
});

app.get("/editors", async (req, res) => {
    const editors = await prisma.editor.findMany();
    res.render("editors/index", {
        editors,
    });
});

app.get("/genres", async (req, res) => {
    const genres = await prisma.genre.findMany();
    res.render("genres/index", {
        genres,
    });
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
