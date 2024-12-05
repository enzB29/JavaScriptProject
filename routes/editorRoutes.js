const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();



// editors route
app.get("/", async (req, res) => {
    const editors = await prisma.editor.findMany();
    res.render("editors/index", {
        editors,
    }); // this route give us all the editors in the "/" page
});

app.post("/", async (req, res) => {
    const { name } = req.body;
    await prisma.editor.create({
        data: { name }
    });
    res.redirect("/editors");
});// this route is to post a new editor in the database


// editors/new route
app.get('/new', async (req, res) => {
    res.render("editors/new");
});//this will show the form


// editors/id/games route
app.get("/:id/games", async (req, res) => {
    const { id } = req.params;
    const editorId = parseInt(id);

    const editor = await prisma.editor.findUnique({
        where: { id: editorId },
        include: { games: true }
    });

    res.render("editors/games", { editor });
});// the route to have all information on on editor


// editors/id/edit route
app.get("/:id/edit", async (req, res) => {
    const { id } = req.params;
    const editorId = parseInt(id);
    const editor = await prisma.editor.findUnique({
        where: { id: editorId },
    });

    res.render("editors/edit", { editor });
});//the route to edit one editor

app.post("/:id/edit", async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const editorId = parseInt(id);

    await prisma.editor.update({
        where: { id: editorId },
        data: { name },
    });

    res.redirect("/editors");

});//this route is to write the editing on the database


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
});// this route is to delete one editor one the database.



module.exports = app;