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
.countDocuments({
 userEmail:email
});



const requests = await database
.collection("ai_requests")
.countDocuments({
 userEmail:email
});



const activities = await database
.collection("activities")
.find({
 userEmail:email
})
.sort({
 createdAt:-1
})
.limit(5)
.toArray();



res.json({

user:{
 name:user?.name || "User"
},


stats:{
 agents,
 requests,
 usage:"78%",
 plan:user?.plan || "Free"
},


activities

});


}
catch(error:any){

console.log("Dashboard Error:",error.message);


res.status(500).json({
message:error.message
});

}


}