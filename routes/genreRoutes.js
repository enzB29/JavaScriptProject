const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();


// genres route
app.get("/", async (req, res) => {
    const genres = await prisma.genre.findMany();
    res.render("genres/index", {
        genres,
    });
});//get all the genres and render them

// genres/id/games route
app.get("/:id/games", async (req, res) => {
    const { id } = req.params;

    const genreId = parseInt(id);
    const genre = await prisma.genre.findUnique({
        where: { id: genreId },
        include: { games: true }
    });

    res.render("genres/games", { genre });
});//get all the game of one genres end render them



module.exports = app;
