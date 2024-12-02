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
    const games = await prisma.game.findMany();
    res.render("genres/list", {
        games,
    });
});




module.exports = app;
