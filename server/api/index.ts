import dotenv from "dotenv";
dotenv.config();

import serverless from "serverless-http";

import app from "../src/app";
import { connectDB } from "../src/config/mongodb";


let connected = false;


const handler = serverless(app);


export default async function(
req:any,
res:any
){

try{


if(!connected){

await connectDB();

connected=true;

console.log(
"MongoDB Connected"
);

}


return handler(req,res);


}catch(error){


console.error(
"Function Error:",
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