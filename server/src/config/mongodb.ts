import dotenv from "dotenv";
import { MongoClient, Db, ServerApiVersion } from "mongodb";

dotenv.config();

let client: MongoClient;
let database: Db;

export const connectDB = async (): Promise<void> => {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.AUTH_DB_NAME;

  if (!uri) {
    throw new Error("❌ MONGODB_URI is missing in .env");
  }

  if (!dbName) {
    throw new Error("❌ AUTH_DB_NAME is missing in .env");
  }

  try {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();

    database = client.db(dbName);

    await database.command({ ping: 1 });

    console.log("✅ MongoDB Connected Successfully");
    console.log(`📂 Database: ${dbName}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error);
    process.exit(1);
  }
};

export const db = (): Db => {
  if (!database) {
    throw new Error("Database not connected. Call connectDB() first.");
  }

  return database;
};

export default () => client;