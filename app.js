// app.js

require("dotenv").config();

const express = require("express");
const methodOverride = require("method-override");
const path = require("path");

const movieRoutes = require("./routes/movie.routes");
const genreRoutes = require("./routes/genre.routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/movies", movieRoutes);
app.use("/genres", genreRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`MovieStream app running on http://localhost:${PORT}`);
});