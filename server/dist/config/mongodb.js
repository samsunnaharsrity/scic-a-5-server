"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.connectDB = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
dotenv_1.default.config();
let client;
let database;
const connectDB = async () => {
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.AUTH_DB_NAME;
    if (!uri) {
        throw new Error("❌ MONGODB_URI is missing in .env");
    }
    if (!dbName) {
        throw new Error("❌ AUTH_DB_NAME is missing in .env");
    }
    try {
        client = new mongodb_1.MongoClient(uri, {
            serverApi: {
                version: mongodb_1.ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });
        await client.connect();
        database = client.db(dbName);
        await database.command({ ping: 1 });
        console.log("✅ MongoDB Connected Successfully");
        console.log(`📂 Database: ${dbName}`);
    }
    catch (error) {
        console.error("❌ MongoDB Connection Failed");
        console.error(error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
const db = () => {
    if (!database) {
        throw new Error("Database not connected. Call connectDB() first.");
    }
    return database;
};
exports.db = db;
exports.default = () => client;
