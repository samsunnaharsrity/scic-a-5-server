import Groq from "groq-sdk";


const groq = new Groq({

apiKey:process.env.GROQ_API_KEY

});



export const generateAI = async(
prompt:string
)=>{


const completion =
await groq.chat.completions.create({

model:"llama-3.1-8b-instant",

messages:[

{
role:"system",
content:
"You are a helpful professional AI assistant."
},

{
role:"user",
content:prompt
}

]


});



return completion
.choices[0]
.message
.content;


};