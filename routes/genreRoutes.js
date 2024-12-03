const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();



app.get("/", async (req, res) => {
    const genres = await prisma.genre.findMany();
    res.render("genres/index", {
        genres,
    });
});


app.get("/list", async (req, res) => {
    try {
        const genreId = parseInt(req.query.genreId, 10); // Ensure it's coming from the query string
        if (isNaN(genreId)) {
            return res.status(400).send("Invalid genreId");
        }

        const games = await prisma.game.findMany({
            where: { genreId },
        });

        // Render with the games array even if it's empty
        res.render("genres/list", { games });
    } catch (error) {
        console.error("Error fetching games:", error);
        res.status(500).send("Internal Server Error");
    }
});






module.exports = app;
