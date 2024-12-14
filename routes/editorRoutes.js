const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();



// editors route
// this route gives us all the editors in the "/" page
app.get("/", async (req, res) => {
    const editors = await prisma.editor.findMany();
    res.render("editors/index", {
        editors,
    });
});

// this route is to post a new editor in the database
app.post("/", async (req, res) => {
    const { name } = req.body;
    await prisma.editor.create({
        data: { name }
    });
    res.redirect("/editors");
});


// editors/new route
// this will display the form
app.get('/new', async (req, res) => {
    res.render("editors/new");
});


// editors/id/games route
// the route to have all information on an editor
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
// the route to edit an editor
app.get("/:id/edit", async (req, res) => {
    const { id } = req.params;
    const editorId = parseInt(id);
    const editor = await prisma.editor.findUnique({
        where: { id: editorId },
    });

    res.render("editors/edit", { editor });
});

// this route is to post the edit in the database
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
// this route is to delete an editor on the database
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