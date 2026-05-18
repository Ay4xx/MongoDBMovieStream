require("dotenv").config();

const { MongoClient } = require("mongodb");

async function testConnection() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();

    console.log("Conexión exitosa a MongoDB Atlas");

    const db = client.db(process.env.DB_NAME || "moviestream");
    const collections = await db.listCollections().toArray();

    console.log("Colecciones encontradas:");
    console.log(collections.map((collection) => collection.name));
  } catch (error) {
    console.error("Error de conexión:");
    console.error(error);
  } finally {
    await client.close();
  }
}

testConnection();