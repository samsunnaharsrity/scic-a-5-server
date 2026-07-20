import dotenv from "dotenv";
import serverless from "serverless-http";
import app from "./app";
import { connectDB } from "./config/mongodb";

dotenv.config();

let connected = false;

const handler = serverless(app);

export default async function (req: any, res: any) {
  if (!connected) {
    await connectDB();
    connected = true;
  }

  return handler(req, res);
}