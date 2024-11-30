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



module.exports = app;
