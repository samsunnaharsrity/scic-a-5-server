import { Request, Response } from "express";
import { db } from "../config/mongodb";


export const getDashboard = async(
 req:Request,
 res:Response
)=>{

try{

const database = db();

const email=req.params.email;



const user = await database
.collection("user")
.findOne({
 email
});



const agents = await database
.collection("agents")
.countDocuments();



const requests = await database
.collection("ai_requests")
.countDocuments({
 userEmail:email
});



const recentAgents = await database
.collection("agents")
.find({})
.sort({createdAt:-1})
.limit(5)
.toArray();


console.log("RECENT AGENTS:", recentAgents);

const activities = recentAgents.map((agent) => ({
  _id: agent._id,
  title: agent.name,
  action: "Created AI Agent",
  icon: "bot",
  createdAt: agent.createdAt,
}));

res.json({
  user: {
    name: user?.name || "User",
  },
  stats: {
    agents,
    requests,
    usage: "78%",
    plan: user?.plan || "Free",
  },
  activities,
});


}
catch(error:any){

console.log("Dashboard Error:",error.message);


res.status(500).json({
message:error.message
});

}


}