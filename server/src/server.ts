import dotenv from "dotenv";
import serverless from "serverless-http";

import app from "./app";
import { connectDB } from "./config/mongodb";


dotenv.config();


let connected = false;


const handler = serverless(app);


export default async function (
  req: any,
  res: any
) {

  try {

    if (!connected) {

      await connectDB();

      connected = true;

      console.log("✅ MongoDB Connected");

    }


    return handler(req, res);


  } catch (error) {


    console.error(
      "❌ Serverless Error:",
      error
    );


    return res.status(500).json({

      success:false,

      message:"Server Error",

      error:
      error instanceof Error
      ? error.message
      : error

    });

  }

}