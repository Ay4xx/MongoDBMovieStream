require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
dns.setDefaultResultOrder("ipv4first");

const { MongoClient, ObjectId } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const dbName = process.env.DB_NAME || "moviestream";

const client = new MongoClient(uri);

async function seed() {
  try {
    await client.connect();

    const db = client.db(dbName);

    const genresCollection = db.collection("genres");
    const actorsCollection = db.collection("actors");
    const moviesCollection = db.collection("movies");
    const usersCollection = db.collection("users");

    console.log("Connected to MongoDB");

    await genresCollection.deleteMany({});
    await actorsCollection.deleteMany({});
    await moviesCollection.deleteMany({});
    await usersCollection.deleteMany({});

    console.log("Previous data deleted");

    const now = new Date();

    const genres = [
      {
        _id: new ObjectId(),
        name: "Action",
        description: "Movies with intense sequences, fights, and chases.",
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        name: "Drama",
        description: "Stories focused on conflict, emotion, and character development.",
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        name: "Comedy",
        description: "Movies designed to entertain and make the audience laugh.",
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        name: "Sci-Fi",
        description: "Stories involving futuristic technology, space, or science.",
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        name: "Thriller",
        description: "Movies focused on suspense, tension, and mystery.",
        createdAt: now,
        updatedAt: now,
      },
    ];

    const actors = [
      {
        _id: new ObjectId(),
        name: "Luna Reyes",
        birthYear: 1992,
        nationality: "Mexico",
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        name: "Marco Stone",
        birthYear: 1985,
        nationality: "United States",
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        name: "Sofia Blake",
        birthYear: 1990,
        nationality: "Spain",
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        name: "Daniel Cruz",
        birthYear: 1988,
        nationality: "Mexico",
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        name: "Emma Hart",
        birthYear: 1995,
        nationality: "Canada",
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        name: "Noah Silva",
        birthYear: 1982,
        nationality: "Brazil",
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        name: "Valeria Torres",
        birthYear: 1998,
        nationality: "Argentina",
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        name: "Hugo Bennett",
        birthYear: 1979,
        nationality: "United Kingdom",
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        name: "Mia Chen",
        birthYear: 1993,
        nationality: "China",
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        name: "Leo Vargas",
        birthYear: 1987,
        nationality: "Colombia",
        createdAt: now,
        updatedAt: now,
      },
    ];

    await genresCollection.insertMany(genres);
    await actorsCollection.insertMany(actors);

    const genreByName = Object.fromEntries(genres.map((genre) => [genre.name, genre]));
    const actorByName = Object.fromEntries(actors.map((actor) => [actor.name, actor]));

    function genreRefs(names) {
      return names.map((name) => ({
        _id: genreByName[name]._id,
        name: genreByName[name].name,
      }));
    }

    function actorRefs(items) {
      return items.map((item) => ({
        _id: actorByName[item.name]._id,
        name: actorByName[item.name].name,
        role: item.role,
      }));
    }

    const movies = [
      {
        _id: new ObjectId(),
        title: "Neon City",
        year: 2021,
        durationMinutes: 118,
        description: "A detective investigates a digital conspiracy in a futuristic city.",
        genres: genreRefs(["Sci-Fi", "Thriller"]),
        actors: actorRefs([
          { name: "Luna Reyes", role: "Detective Vega" },
          { name: "Marco Stone", role: "Dr. Hale" },
        ]),
        ratingAverage: 4.5,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        title: "The Last Harbor",
        year: 2020,
        durationMinutes: 104,
        description: "A family drama set in a coastal town facing economic collapse.",
        genres: genreRefs(["Drama"]),
        actors: actorRefs([
          { name: "Sofia Blake", role: "Elena" },
          { name: "Daniel Cruz", role: "Mateo" },
        ]),
        ratingAverage: 4.1,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        title: "Laughing at Midnight",
        year: 2019,
        durationMinutes: 95,
        description: "Three friends accidentally become involved in a late-night comedy show.",
        genres: genreRefs(["Comedy"]),
        actors: actorRefs([
          { name: "Emma Hart", role: "Julie" },
          { name: "Leo Vargas", role: "Nico" },
        ]),
        ratingAverage: 3.9,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        title: "Red Circuit",
        year: 2022,
        durationMinutes: 121,
        description: "An ex-agent must stop a global cyberattack.",
        genres: genreRefs(["Action", "Thriller"]),
        actors: actorRefs([
          { name: "Noah Silva", role: "Agent Ramos" },
          { name: "Mia Chen", role: "Iris" },
        ]),
        ratingAverage: 4.3,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        title: "Stars Beyond Mars",
        year: 2023,
        durationMinutes: 130,
        description: "A crew searches for signs of life beyond Mars.",
        genres: genreRefs(["Sci-Fi", "Drama"]),
        actors: actorRefs([
          { name: "Valeria Torres", role: "Captain Sol" },
          { name: "Hugo Bennett", role: "Commander Wells" },
        ]),
        ratingAverage: 4.6,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        title: "Broken Glass",
        year: 2018,
        durationMinutes: 110,
        description: "A journalist uncovers corruption in her own city.",
        genres: genreRefs(["Drama", "Thriller"]),
        actors: actorRefs([
          { name: "Luna Reyes", role: "Andrea" },
          { name: "Daniel Cruz", role: "Officer Ruiz" },
        ]),
        ratingAverage: 4.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        title: "Coffee and Chaos",
        year: 2021,
        durationMinutes: 89,
        description: "A small coffee shop becomes the center of neighborhood chaos.",
        genres: genreRefs(["Comedy"]),
        actors: actorRefs([
          { name: "Emma Hart", role: "Molly" },
          { name: "Marco Stone", role: "Ben" },
        ]),
        ratingAverage: 3.7,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        title: "Shadow Protocol",
        year: 2024,
        durationMinutes: 124,
        description: "A secret organization tries to control world governments.",
        genres: genreRefs(["Action", "Thriller"]),
        actors: actorRefs([
          { name: "Noah Silva", role: "Victor Kane" },
          { name: "Sofia Blake", role: "Agent Lara" },
        ]),
        ratingAverage: 4.4,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        title: "Memory Lane",
        year: 2017,
        durationMinutes: 102,
        description: "An old man revisits the memories that shaped his life.",
        genres: genreRefs(["Drama"]),
        actors: actorRefs([
          { name: "Hugo Bennett", role: "Arthur" },
          { name: "Valeria Torres", role: "Clara" },
        ]),
        ratingAverage: 4.2,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        title: "Galaxy Diner",
        year: 2020,
        durationMinutes: 97,
        description: "A diner in space becomes a meeting point for strange travelers.",
        genres: genreRefs(["Sci-Fi", "Comedy"]),
        actors: actorRefs([
          { name: "Mia Chen", role: "Nova" },
          { name: "Leo Vargas", role: "Kai" },
        ]),
        ratingAverage: 4.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        title: "Final Signal",
        year: 2022,
        durationMinutes: 116,
        description: "A lost radio signal reveals a dangerous secret.",
        genres: genreRefs(["Thriller", "Sci-Fi"]),
        actors: actorRefs([
          { name: "Marco Stone", role: "Ethan" },
          { name: "Mia Chen", role: "Dr. Lin" },
        ]),
        ratingAverage: 4.1,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        title: "The City Runs",
        year: 2019,
        durationMinutes: 108,
        description: "A courier gets involved in a criminal chase across the city.",
        genres: genreRefs(["Action"]),
        actors: actorRefs([
          { name: "Daniel Cruz", role: "Alex" },
          { name: "Luna Reyes", role: "Mara" },
        ]),
        ratingAverage: 3.8,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        title: "Almost Famous Again",
        year: 2023,
        durationMinutes: 93,
        description: "A retired actor tries to recover his career through social media.",
        genres: genreRefs(["Comedy", "Drama"]),
        actors: actorRefs([
          { name: "Hugo Bennett", role: "Richard" },
          { name: "Emma Hart", role: "Sophie" },
        ]),
        ratingAverage: 3.9,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        title: "Cold Evidence",
        year: 2021,
        durationMinutes: 112,
        description: "A detective reopens a case everyone else wanted forgotten.",
        genres: genreRefs(["Thriller", "Drama"]),
        actors: actorRefs([
          { name: "Sofia Blake", role: "Detective Mora" },
          { name: "Noah Silva", role: "Julian" },
        ]),
        ratingAverage: 4.2,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        title: "Solar Hearts",
        year: 2024,
        durationMinutes: 119,
        description: "Two scientists fall in love during a mission near the sun.",
        genres: genreRefs(["Sci-Fi", "Drama"]),
        actors: actorRefs([
          { name: "Valeria Torres", role: "Lucia" },
          { name: "Marco Stone", role: "Adam" },
        ]),
        ratingAverage: 4.3,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        title: "Fast Weekend",
        year: 2018,
        durationMinutes: 91,
        description: "A group of friends turn a weekend trip into a ridiculous adventure.",
        genres: genreRefs(["Comedy", "Action"]),
        actors: actorRefs([
          { name: "Leo Vargas", role: "Tom" },
          { name: "Emma Hart", role: "Rachel" },
        ]),
        ratingAverage: 3.6,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        title: "Invisible Enemy",
        year: 2020,
        durationMinutes: 123,
        description: "A team must fight an enemy they cannot see.",
        genres: genreRefs(["Action", "Sci-Fi"]),
        actors: actorRefs([
          { name: "Noah Silva", role: "Major Cruz" },
          { name: "Mia Chen", role: "Dr. Mei" },
        ]),
        ratingAverage: 4.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        title: "Paper Planes",
        year: 2016,
        durationMinutes: 100,
        description: "A young girl dreams of reconnecting with her father.",
        genres: genreRefs(["Drama"]),
        actors: actorRefs([
          { name: "Sofia Blake", role: "Laura" },
          { name: "Valeria Torres", role: "Isabel" },
        ]),
        ratingAverage: 4.4,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        title: "Night Market",
        year: 2022,
        durationMinutes: 107,
        description: "A tourist discovers that a night market hides a criminal network.",
        genres: genreRefs(["Thriller", "Action"]),
        actors: actorRefs([
          { name: "Luna Reyes", role: "Camila" },
          { name: "Leo Vargas", role: "Rafa" },
        ]),
        ratingAverage: 4.1,
        createdAt: now,
        updatedAt: now,
      },
      {
        _id: new ObjectId(),
        title: "Robot Roommate",
        year: 2023,
        durationMinutes: 88,
        description: "A student receives a robot roommate that changes his life.",
        genres: genreRefs(["Comedy", "Sci-Fi"]),
        actors: actorRefs([
          { name: "Daniel Cruz", role: "Max" },
          { name: "Mia Chen", role: "R-17" },
        ]),
        ratingAverage: 3.8,
        createdAt: now,
        updatedAt: now,
      },
    ];

    await moviesCollection.insertMany(movies);

    function movieRef(index) {
      return {
        movieId: movies[index]._id,
        movieTitle: movies[index].title,
      };
    }

    const userNames = [
      "Ana Torres",
      "Carlos Gómez",
      "Mariana López",
      "Luis Herrera",
      "Paola Méndez",
      "Jorge Salinas",
      "Regina Flores",
      "Andrés Ruiz",
      "Fernanda Soto",
      "Miguel Navarro",
      "Valeria Campos",
      "Diego Ortega",
      "Camila Ríos",
      "Sebastián Molina",
      "Lucía Vargas",
    ];

    const users = userNames.map((name, index) => {
      const firstMovie = movieRef(index % movies.length);
      const secondMovie = movieRef((index + 4) % movies.length);
      const thirdMovie = movieRef((index + 9) % movies.length);

      return {
        _id: new ObjectId(),
        name,
        email: `${name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(" ", ".")}@example.com`,
        watchHistory: [
          {
            ...firstMovie,
            watchedAt: new Date(2026, 4, 1 + index),
          },
          {
            ...secondMovie,
            watchedAt: new Date(2026, 4, 3 + index),
          },
          {
            ...thirdMovie,
            watchedAt: new Date(2026, 4, 5 + index),
          },
        ],
        ratings: [
          {
            ...firstMovie,
            score: 3 + (index % 3),
            ratedAt: new Date(2026, 4, 2 + index),
          },
          {
            ...secondMovie,
            score: 4,
            ratedAt: new Date(2026, 4, 4 + index),
          },
        ],
        createdAt: now,
        updatedAt: now,
      };
    });

    await usersCollection.insertMany(users);

    console.log("Seed completed successfully");
    console.log(`Genres: ${genres.length}`);
    console.log(`Actors: ${actors.length}`);
    console.log(`Movies: ${movies.length}`);
    console.log(`Users: ${users.length}`);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seed();