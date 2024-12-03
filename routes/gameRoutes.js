const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();



app.get("/", async (req, res) => {
    const games = await prisma.game.findMany();
    res.render("games/index", {
        games,
    });
});



app.get("/:id/details", async (req, res) => {
    const { id } = req.params;
    const gameId = parseInt(id);

    const game = await prisma.game.findUnique({ where: { id: gameId } });

    res.render("games/details", { game });
});


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

    if (!game) {
        return res.status(404).send("Game not found");
    }

    // Add selected flags for each genre and editor
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
});


app.post("/:id/edit", async (req, res) => {
    const { id } = req.params;
    const { name, description, releaseDate, genreId, editorId } = req.body;

    const gameId = parseInt(id);

    const updatedGame = await prisma.game.update({
        where: { id: gameId },
        data: {
            name,
            description,
            releaseDate: new Date(releaseDate),
            genre: {
                connect: { id: parseInt(genreId) }
            },
            editor: {
                connect: { id: parseInt(editorId) }
            }
        }
    });

    res.redirect(`/games/${gameId}/details`);
});




app.get('/new', async (req, res) => {
    // to fetch genres and editors (useful for the form)
    const genres = await prisma.genre.findMany();
    const editors = await prisma.editor.findMany();

    res.render("games/new", {
        genres: genres,
        editors: editors
    });
});



app.post("/", async (req, res) => {
    const { name, description, releaseDate, genreId, editorId } = req.body;
    await prisma.game.create({
        data: {
            name,
            description,
            releaseDate: new Date(releaseDate),
            genre: {
                connect: { id: parseInt(genreId) }
            },
            editor: {
                connect: { id: parseInt(editorId) }
            }
        }
    });
    res.redirect("/games");
});



app.post("/:id/delete", async (req, res) => {
    const { id } = req.params;
    await prisma.game.delete({
        where: { id: parseInt(id) },
    });
    res.redirect('/games');
});



module.exports = app;