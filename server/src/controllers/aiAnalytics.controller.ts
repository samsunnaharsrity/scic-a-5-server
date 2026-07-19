import {Request, Response} from "express";
import {db} from "../config/mongodb";



// GET AI ANALYTICS

export const getAIAnalytics = async(
req:Request,
res:Response
)=>{

try{


const {email}=req.params;



const logs =
await db()
.collection("ai_usage_logs")
.find({
userEmail:email
})
.toArray();




// Total Tokens

const totalTokens =
logs.reduce(
(sum,item)=>sum+(item.tokens || 0),
0
);



// Requests

const totalRequests =
logs.length;



// Cost

const totalCost =
logs.reduce(
(sum,item)=>sum+(item.cost || 0),
0
);




// Agents

const agents =
await db()
.collection("agents")
.find({
userEmail:email
})
.toArray();





// Chart Data

const usage =
await db()
.collection("ai_usage_logs")
.aggregate([

{
$match:{
userEmail:email
}
},


{
$group:{


_id:{
$dayOfWeek:"$createdAt"
},


value:{
$sum:1
}


}

}


])
.toArray();





const days=[
"",
"Sun",
"Mon",
"Tue",
"Wed",
"Thu",
"Fri",
"Sat"
];




const chartData =
usage.map(item=>({

day:days[item._id],

value:item.value*10

}));







res.json({

success:true,

data:{


totalTokens,

totalRequests,


totalCost:Number(
totalCost.toFixed(2)
),


totalAgents:agents.length,

growth:{
tokens:"+12%",
requests:"+24%",
cost:"-8%"
},

agents:agents.map(agent=>({

name:agent.name,

model:agent.model,

status:agent.status

})),


usage:chartData



}


});



}
catch(error){

console.log(error);

res.status(500).json({

message:"Analytics error"

});


}


}