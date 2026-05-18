// routes/movie.routes.js

const express = require("express");
const { ObjectId } = require("mongodb");
const { connectDB } = require("../config/db");

const router = express.Router();

router.get("/", async (req, res) => {
  const db = await connectDB();

  const search = req.query.search || "";

  const filter = search
    ? {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { "genres.name": { $regex: search, $options: "i" } },
          { "actors.name": { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const movies = await db
    .collection("movies")
    .find(filter)
    .sort({ title: 1 })
    .toArray();

  res.render("movies/index", { movies, search });
});

router.get("/new", async (req, res) => {
  const db = await connectDB();

  const genres = await db.collection("genres").find({}).sort({ name: 1 }).toArray();
  const actors = await db.collection("actors").find({}).sort({ name: 1 }).toArray();

  res.render("movies/new", { genres, actors });
});

router.post("/", async (req, res) => {
  const db = await connectDB();

  const {
    title,
    year,
    durationMinutes,
    description,
    ratingAverage,
    genres,
    actor1,
    role1,
    actor2,
    role2,
  } = req.body;

  const selectedGenreIds = Array.isArray(genres) ? genres : genres ? [genres] : [];

  const selectedGenres = await db
    .collection("genres")
    .find({
      _id: { $in: selectedGenreIds.map((id) => new ObjectId(id)) },
    })
    .toArray();

  const embeddedGenres = selectedGenres.map((genre) => ({
    _id: genre._id,
    name: genre.name,
  }));

  const actorIds = [actor1, actor2].filter(Boolean);

  const selectedActors = await db
    .collection("actors")
    .find({
      _id: { $in: actorIds.map((id) => new ObjectId(id)) },
    })
    .toArray();

  const embeddedActors = selectedActors.map((actor) => {
    let role = "";

    if (actor._id.toString() === actor1) role = role1;
    if (actor._id.toString() === actor2) role = role2;

    return {
      _id: actor._id,
      name: actor.name,
      role,
    };
  });

  await db.collection("movies").insertOne({
    title,
    year: Number(year),
    durationMinutes: Number(durationMinutes),
    description,
    genres: embeddedGenres,
    actors: embeddedActors,
    ratingAverage: Number(ratingAverage),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  res.redirect("/movies");
});

router.get("/:id/edit", async (req, res) => {
  const db = await connectDB();

  const movie = await db.collection("movies").findOne({
    _id: new ObjectId(req.params.id),
  });

  const genres = await db.collection("genres").find({}).sort({ name: 1 }).toArray();
  const actors = await db.collection("actors").find({}).sort({ name: 1 }).toArray();

  res.render("movies/edit", { movie, genres, actors });
});

router.put("/:id", async (req, res) => {
  const db = await connectDB();

  const {
    title,
    year,
    durationMinutes,
    description,
    ratingAverage,
    genres,
    actor1,
    role1,
    actor2,
    role2,
  } = req.body;

  const selectedGenreIds = Array.isArray(genres) ? genres : genres ? [genres] : [];

  const selectedGenres = await db
    .collection("genres")
    .find({
      _id: { $in: selectedGenreIds.map((id) => new ObjectId(id)) },
    })
    .toArray();

  const embeddedGenres = selectedGenres.map((genre) => ({
    _id: genre._id,
    name: genre.name,
  }));

  const actorIds = [actor1, actor2].filter(Boolean);

  const selectedActors = await db
    .collection("actors")
    .find({
      _id: { $in: actorIds.map((id) => new ObjectId(id)) },
    })
    .toArray();

  const embeddedActors = selectedActors.map((actor) => {
    let role = "";

    if (actor._id.toString() === actor1) role = role1;
    if (actor._id.toString() === actor2) role = role2;

    return {
      _id: actor._id,
      name: actor.name,
      role,
    };
  });

  await db.collection("movies").updateOne(
    { _id: new ObjectId(req.params.id) },
    {
      $set: {
        title,
        year: Number(year),
        durationMinutes: Number(durationMinutes),
        description,
        genres: embeddedGenres,
        actors: embeddedActors,
        ratingAverage: Number(ratingAverage),
        updatedAt: new Date(),
      },
    }
  );

  res.redirect("/movies");
});

router.delete("/:id", async (req, res) => {
  const db = await connectDB();

  await db.collection("movies").deleteOne({
    _id: new ObjectId(req.params.id),
  });

  res.redirect("/movies");
});

module.exports = router;