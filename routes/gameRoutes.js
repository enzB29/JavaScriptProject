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