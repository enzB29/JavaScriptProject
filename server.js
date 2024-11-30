const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const hbs = require("hbs");

const app = express();
const PORT = 3000;

// we'll use different routes so 'server.js' remains short
const gameRoutes = require("./routes/gameRoutes");
const editorRoutes = require("./routes/editorRoutes");
const genreRoutes = require("./routes/genreRoutes");

app.use(bodyParser.urlencoded({ extended: true }));

// Handlebars config for Express
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views/partials"));

// routes use
app.use("/games", gameRoutes);
app.use("/editors", editorRoutes);
app.use("/genres", genreRoutes);


// homepage
app.get("/", async (req, res) => {
    res.render("index");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
