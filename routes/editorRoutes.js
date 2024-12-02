const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();



// editors route
app.get("/", async (req, res) => {
    const editors = await prisma.editor.findMany();
    res.render("editors/index", {
        editors,
    });
});

app.post("/", async (req, res) => {
    const { name } = req.body;
    await prisma.editor.create({
        data: { name }
    });
    res.redirect("/editors");
});


// editors/new route
app.get('/new', async (req, res) => {
    res.render("editors/new");
});


// editors/id/games route
app.get("/:id/games", async (req, res) => {
    const { id } = req.params;
    const editorId = parseInt(id);

    const editor = await prisma.editor.findUnique({
        where: { id: editorId },
        include: { games: true }
    });

    res.render("editors/games", { editor });
});


// editors/id/edit route
app.get("/:id/edit", async (req, res) => {
    const { id } = req.params;
    const editorId = parseInt(id);
    const editor = await prisma.editor.findUnique({
        where: { id: editorId },
    });

    res.render("editors/edit", { editor });
});

app.post("/:id/edit", async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const editorId = parseInt(id);

    await prisma.editor.update({
        where: { id: editorId },
        data: { name },
    });

    res.redirect("/editors");

});


// editors/id/delete route
app.post("/:id/delete", async (req, res) => {
    const { id } = req.params;
    const editorId = parseInt(id);

    await prisma.game.deleteMany({
        where: { editorId: editorId },
    });

    await prisma.editor.delete({
        where: { id: editorId },
    });

    res.redirect('/editors');
});



module.exports = app;