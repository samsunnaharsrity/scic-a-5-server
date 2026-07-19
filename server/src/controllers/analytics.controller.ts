// import { Request, Response } from "express";
// import { db } from "../config/mongodb";


// export const getUserAnalytics = async(
// req:Request,
// res:Response
// )=>{

// try{

// const {email}=req.params;


// const database=db();


// // total requests

// const totalRequests =
// await database
// .collection("ai_requests")
// .countDocuments({
//  userEmail:email
// });



// // chats

// const chats =
// await database
// .collection("ai_requests")
// .countDocuments({
//  userEmail:email,
//  type:"chat"
// });



// // agents

// const agents =
// await database
// .collection("agents")
// .countDocuments({
//  userEmail:email
// });




// // tokens

// const tokenData =
// await database
// .collection("ai_requests")
// .aggregate([

// {
// $match:{
// userEmail:email
// }
// },

// {
// $group:{
// _id:null,
// total:{
// $sum:"$tokens"
// }
// }
// }

// ])
// .toArray();



// const tokens =
// tokenData[0]?.total || 0;






// // weekly usage

// const weekly =
// await database
// .collection("ai_requests")
// .aggregate([

// {
// $match:{
// userEmail:email
// }
// },


// {
// $group:{
// _id:"$day",
// requests:{
// $sum:1
// }
// }
// }

// ])
// .toArray();






// // tool usage

// const tools =
// await database
// .collection("ai_requests")
// .aggregate([

// {
// $match:{
// userEmail:email
// }
// },

// {
// $group:{
// _id:"$tool",
// value:{
// $sum:1
// }
// }

// }

// ])
// .toArray();






// res.json({

// success:true,

// stats:{
// requests:totalRequests,
// chats,
// agents,
// tokens
// },


// weekly:weekly.map(item=>({

// day:item._id,
// requests:item.requests

// })),


// tools:tools.map(item=>({

// name:item._id,
// value:item.value

// }))


// });



// }catch(error){

// console.log(error);

// res.status(500).json({

// success:false,
// message:"Analytics error"

// });


// }


// }


import { Request, Response } from "express";
import { db } from "../config/mongodb";


export const getUserAnalytics = async(
req:Request,
res:Response
)=>{

try{

const {email}=req.params;


const database = db();


// AI REQUESTS

const requests =
await database
.collection("ai_usage_logs")
.countDocuments({
userEmail:email
});




// CHAT COUNT

const chats =
await database
.collection("ai_usage_logs")
.countDocuments({

userEmail:email,

type:"chat"

});




// AGENTS

const agents =
await database
.collection("agents")
.countDocuments({

userEmail:email

});




// TOKENS

const tokenData =
await database
.collection("ai_usage_logs")
.aggregate([

{
$match:{
userEmail:email
}
},

{
$group:{
_id:null,
total:{
$sum:"$tokens"
}
}
}

])
.toArray();



const tokens =
tokenData[0]?.total || 0;




res.json({

success:true,

stats:{


requests,


chats,


agents,


tokens


}


});


}
catch(error){

console.log(error);


res.status(500).json({

success:false,

message:"Analytics error"

});


}


};