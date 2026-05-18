// config/db.js

require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
dns.setDefaultResultOrder("ipv4first");

const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME || "moviestream";

let db;

async function connectDB() {
  if (db) return db;

  const client = new MongoClient(uri);
  await client.connect();

  db = client.db(dbName);

  console.log(`Connected to MongoDB database: ${dbName}`);

  return db;
}

module.exports = { connectDB };