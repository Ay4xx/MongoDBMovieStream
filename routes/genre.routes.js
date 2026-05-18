// routes/genre.routes.js

const express = require("express");
const { ObjectId } = require("mongodb");
const { connectDB } = require("../config/db");

const router = express.Router();

router.get("/", async (req, res) => {
  const db = await connectDB();

  const search = req.query.search || "";

  const filter = search
    ? {
        name: { $regex: search, $options: "i" },
      }
    : {};

  const genres = await db
    .collection("genres")
    .find(filter)
    .sort({ name: 1 })
    .toArray();

  res.render("genres/index", { genres, search });
});

router.get("/new", (req, res) => {
  res.render("genres/new");
});

router.post("/", async (req, res) => {
  const db = await connectDB();

  const { name, description } = req.body;

  await db.collection("genres").insertOne({
    name,
    description,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  res.redirect("/genres");
});

router.get("/:id/edit", async (req, res) => {
  const db = await connectDB();

  const genre = await db.collection("genres").findOne({
    _id: new ObjectId(req.params.id),
  });

  res.render("genres/edit", { genre });
});

router.put("/:id", async (req, res) => {
  const db = await connectDB();

  const { name, description } = req.body;

  const genreId = new ObjectId(req.params.id);

  await db.collection("genres").updateOne(
    { _id: genreId },
    {
      $set: {
        name,
        description,
        updatedAt: new Date(),
      },
    }
  );

  await db.collection("movies").updateMany(
    { "genres._id": genreId },
    {
      $set: {
        "genres.$.name": name,
        updatedAt: new Date(),
      },
    }
  );

  res.redirect("/genres");
});

router.delete("/:id", async (req, res) => {
  const db = await connectDB();

  const genreId = new ObjectId(req.params.id);

  const moviesUsingGenre = await db.collection("movies").countDocuments({
    "genres._id": genreId,
  });

  if (moviesUsingGenre > 0) {
    return res.send(`
      <h1>No se puede eliminar este género</h1>
      <p>Este género está siendo usado por ${moviesUsingGenre} película(s).</p>
      <p>Primero edita o elimina esas películas.</p>
      <a href="/genres">Volver a géneros</a>
    `);
  }

  await db.collection("genres").deleteOne({
    _id: genreId,
  });

  res.redirect("/genres");
});

module.exports = router;