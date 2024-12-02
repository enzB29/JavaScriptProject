const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();



app.get("/", async (req, res) => {
    const editors = await prisma.editor.findMany();
    res.render("editors/index", {
        editors,
    });
});



app.get('/new', async (req, res) => { 
    res.render("editors/new");
});



app.post("/", async (req, res) => {
    const { name } = req.body;
    await prisma.editor.create({
        data: { name }
    });
    res.redirect("/editors");
});



app.post("/:id/delete", async (req, res) => {
    const { id } = req.params;
    await prisma.editor.delete({
        where: { id: parseInt(id) },
    });

    res.redirect('/editors');
});



module.exports = app;
