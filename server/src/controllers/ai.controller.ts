import {Request,Response} from "express";
import {GoogleGenerativeAI} from "@google/generative-ai";
import { generateAI } from "../services/groq.service";


const genAI =
new GoogleGenerativeAI(
process.env.OPENAI_API_KEY!
);



export const chatAI = async (req: Request, res: Response) => {
  try {
    console.log("Body:", req.body);
    console.log("API KEY:", process.env.GEMINI_API_KEY);

    const { message } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const result = await model.generateContent(message);

    const reply = result.response.text();

    res.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("Gemini Error:", error);

    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
};


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
