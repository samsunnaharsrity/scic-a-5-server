import {Request,Response} from "express";
import {db} from "../config/mongodb";
import { ObjectId } from "mongodb";

// get all agents

export const getAgents = async(
req:Request,
res:Response
)=>{


try{


const agents =
await db()
.collection("agents")
.find({})
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




// single agent

export const getAgentById = async(
req:Request,
res:Response
)=>{


try{


const {id}=req.params;


const agent =
await db()
.collection("agents")
.findOne({
  _id: new ObjectId(id)
});



res.json({
success:true,
agent
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