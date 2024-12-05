const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();



// games route
app.get("/", async (req, res) => {
    const games = await prisma.game.findMany();
    res.render("games/index", {
        games,
    });
});//gives us all the game

app.post("/", async (req, res) => {
    const { name, description, releaseDate, genreId, editorId } = req.body;
    await prisma.game.create({
        data: {
            name,
            description,
            releaseDate,
            genre: {
                connect: { id: parseInt(genreId) }
            },
            editor: {
                connect: { id: parseInt(editorId) }
            }
        }
    });
    res.redirect("/games");
});//post all the game in the database


// games/new route
app.get('/new', async (req, res) => {
    // to fetch genres and editors (useful for the form)
    const genres = await prisma.genre.findMany();
    const editors = await prisma.editor.findMany();

    res.render("games/new", {
        genres: genres,
        editors: editors
    });
});//get all the genres and all the editors to put them on the pagee "games/new"


// games/id/details route
app.get("/:id/details", async (req, res) => {
    const { id } = req.params;
    const gameId = parseInt(id);

    const game = await prisma.game.findUnique({
        where: { id: gameId },
        include: {
            genre: true,
            editor: true
        }
    });
    res.render("games/details", { game });
});//get all the details of one game


// games/id/edit route
app.get("/:id/edit", async (req, res) => {
    const { id } = req.params;
    const gameId = parseInt(id);

    const game = await prisma.game.findUnique({
        where: { id: gameId },
        include: {
            genre: true,
            editor: true
        }
    });

    const genres = await prisma.genre.findMany();
    const editors = await prisma.editor.findMany();

    // add selected flags for each genre and editor
    const genresWithSelectedFlag = genres.map(genre => ({
        ...genre,
        isSelected: genre.id === game.genreId
    }));
    const editorsWithSelectedFlag = editors.map(editor => ({
        ...editor,
        isSelected: editor.id === game.editorId
    }));

    res.render("games/edit", {
        game,
        genres: genresWithSelectedFlag,
        editors: editorsWithSelectedFlag
    });
});//get all the editable games and goes to the page to edit them

app.post("/:id/edit", async (req, res) => {
    const { id } = req.params;
    const { name, description, releaseDate, genreId, editorId } = req.body;

    const gameId = parseInt(id);

    const updatedGame = await prisma.game.update({
        where: { id: gameId },
        data: {
            name,
            description,
            releaseDate,
            genre: {
                connect: { id: parseInt(genreId) }
            },
            editor: {
                connect: { id: parseInt(editorId) }
            }
        }
    });

    res.redirect(`/games/${gameId}/details`);
});//post the edit in the database and goes back to the detail of the game


// games/id/updateFeatured route
app.post("/:id/updateFeatured", async (req, res) => {
    const { id } = req.params;
    const gameId = parseInt(id);

    const game = await prisma.game.findUnique({
        where: { id: gameId }
    });

    const updatedGame = await prisma.game.update({
        where: { id: gameId },
        data: { featured: !game.featured }
    });

    res.redirect("/games");
});//post if the game is feature or not in the datebase


// games/id/delete route
app.post("/:id/delete", async (req, res) => {
    const { id } = req.params;
    await prisma.game.delete({
        where: { id: parseInt(id) },
    });
    res.redirect('/games');
});//delete one game 



module.exports = app;