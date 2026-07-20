import { Request, Response } from "express";
import { db } from "../config/mongodb";
import { ObjectId } from "mongodb";



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
userEmail,
status,
tasks,
icon
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

status,
tasks,
icon,

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





// Get User Agents

export const getMyAgents = async(
req: Request<{email:string}>,
res: Response
)=>{

try{

const {email}=req.params;


console.log("REQUEST EMAIL:", email);


const database = db();


const agents = await database
.collection("agents")
.find({
 userEmail: email
})
.sort({
 createdAt:-1
})
.toArray();


console.log("FOUND AGENTS:", agents);



res.json({

success:true,

agents

});


}catch(error:any){

console.log("GET MY AGENTS ERROR:",error);


res.status(500).json({

success:false,

message:error.message

});

}

};



// Get All Agents
export const getAllAgents = async(
req:Request,
res:Response
)=>{

try{


const agents =
await db()
.collection("agents")
.find({})
.toArray();



res.json(agents);



}catch(error:any){

console.log(error);


res.status(500).json({

message:"Failed to load agents"

});


}

};


// UPDATE AGENT



export const updateAgent = async(
req:Request,
res:Response
)=>{

try{

const id = req.params.id as string;

console.log("UPDATE ID:", id);


if(!ObjectId.isValid(id)){

return res.status(400).json({

success:false,
message:"Invalid MongoDB ID"

});

}



const result = await db()
.collection("agents")
.updateOne(

{
_id:new ObjectId(id)
},

{

$set:{

name:req.body.name,
model:req.body.model,
status:req.body.status,
tasks:req.body.tasks,
icon:req.body.icon,
updatedAt:new Date()

}

}

);



res.json({

success:true,
result

});


}catch(error:any){

console.log(error);

res.status(500).json({

success:false,
message:error.message

});

}

};






// DELETE AGENT


export const deleteAgent = async(
req:Request,
res:Response
)=>{

try{

const id = String(req.params.id);

console.log("DELETE ID:",id);


if(!ObjectId.isValid(id)){

return res.status(400).json({

success:false,
message:"Invalid MongoDB ID"

});

}



const result = await db()
.collection("agents")
.deleteOne({

_id:new ObjectId(id)

});



res.json({

success:true,
result

});


}catch(error:any){

console.log(error);

res.status(500).json({

success:false,
message:error.message

});

}

};