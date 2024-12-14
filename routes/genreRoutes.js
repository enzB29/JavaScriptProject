const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();


// genres route
// gets all the genres and displays them
app.get("/", async (req, res) => {
    const genres = await prisma.genre.findMany();
    res.render("genres/index", {
        genres,
    });
});

// genres/id/games route
// gets all the games of one genre and display them
app.get("/:id/games", async (req, res) => {
    const { id } = req.params;

    const genreId = parseInt(id);
    const genre = await prisma.genre.findUnique({
        where: { id: genreId },
        include: { games: true }
    });

    res.render("genres/games", { genre });
});



module.exports = app;
