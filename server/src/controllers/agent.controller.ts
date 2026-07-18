import { Request, Response } from "express";
import { db } from "../config/mongodb";



// Create Agent

export const createAgent = async(
req:Request,
res:Response
)=>{

try{

const {
name,
description,
category,
model,
prompt,
userEmail
}=req.body;



const database = db();


// Create Agent

const result = await database
.collection("agents")
.insertOne({

name,
description,
category,
model,
prompt,
userEmail,

createdAt:new Date()

});




// Save Activity Log

await database
.collection("activities")
.insertOne({

userEmail,

action:"Created AI Agent",

description:`Created ${name} AI agent`,

createdAt:new Date()

});




res.status(201).json({

success:true,

message:"Agent created successfully",

agentId:result.insertedId

});


}
catch(error:any){

console.log(error);

res.status(500).json({

success:false,

message:error.message

});

}

};





// Get My Agents

export const getMyAgents = async(
req: Request,
res: Response
)=>{


try{


const email = decodeURIComponent(
  req.params.email as string
);



const agents = await db()
.collection("agents")
.find({
 userEmail: email
})
.sort({
 createdAt:-1
})
.toArray();



res.json({

success:true,

agents

});


}
catch(error:any){

console.log(error);

res.status(500).json({

success:false,

message:error.message

});

}


};