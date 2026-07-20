import { Request, Response } from "express";
import { db } from "../config/mongodb";


export const getAdminDashboard = async(
req:Request,
res:Response
)=>{

try{

const database=db();


// collections

const users =
database.collection("user");

const agents =
database.collection("agents");

const chats =
database.collection("chat_history");

const accounts =
database.collection("account");

const sessions =
database.collection("session");


// counts

const totalUsers =
await users.countDocuments();


const totalAgents =
await agents.countDocuments();


const totalRequests =
await chats.countDocuments();


const activeSessions =
await sessions.countDocuments({
 active:true
});


// revenue

const revenueData =
await accounts.aggregate([
{
 $group:{
  _id:null,
  total:{
   $sum:"$amount"
  }
 }
}
]).toArray();


const revenue =
revenueData[0]?.total || 0;



// response

res.json({

success:true,

stats:{

totalUsers,

totalAgents,

totalRequests,

revenue

},


overview:{

uptime:"99.8%",

activeSessions,

aiCostToday:842

}


});


}
catch(error){

console.log(error);

res.status(500).json({
message:"Dashboard error"
});


}


}