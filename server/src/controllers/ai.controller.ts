import {Request,Response} from "express";
import {GoogleGenerativeAI} from "@google/generative-ai";
import { generateAI } from "../services/groq.service";
import { db } from "../config/mongodb";


const genAI =
new GoogleGenerativeAI(
process.env.OPENAI_API_KEY!
);



export const chatAI = async (
req:Request,
res:Response
)=>{

try{


const {
message,
email
}=req.body;



console.log(
"EMAIL FROM FRONTEND:",
email
);



const model = genAI.getGenerativeModel({

model:"gemini-2.0-flash"

});



const result =
await model.generateContent(message);



const reply =
result.response.text();


console.log("BEFORE SAVE");



const saveResult = await db()
.collection("chat_history")
.insertOne({

email,

title: message.substring(0,50),

message: reply,

tool:"AI Chat Assistant",

createdAt:new Date()

});



console.log(
"CHAT SAVED ID:",
saveResult.insertedId
);



res.json({

success:true,

reply

});



}
catch(error){

console.log(error);


res.status(500).json({

success:false

});

}

}


// CONTENT GENERATOR


export const generateContent =
async(
req:Request,
res:Response
)=>{


try{


const {
type,
prompt
}=req.body;



const content =
await generateAI(`

Create ${type} content.

Requirement:

${prompt}

`);




res.json({

success:true,

content

});



}catch(error:any){


res.status(500).json({

success:false,

message:error.message

});


}


};





// AI CONTROL CENTER


export const getControlCenter =
async(
req:Request,
res:Response
)=>{


res.json({


status:"Online",

uptime:"99.9%",



models:[

{
name:"Groq Llama 3.1",
performance:96
},

{
name:"Gemini Flash",
performance:91
}

],



agents:{

running:5,

tasksToday:128

},



activities:[

"AI Chat Assistant processed 42 requests",

"Content Generator created 18 documents",

"Agent workflow completed successfully",

"AI model health check passed"

]


});


};



