import { Router } from "express";
import Groq from "groq-sdk";
import { chatAI, generateContent, getControlCenter } from "../controllers/ai.controller";

const router = Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


// AI CHAT ASSISTANT

router.post(
"/chat",
chatAI
);




// AI CONTENT GENERATOR


router.post("/content", async (req, res) => {

  try {

    const { type, prompt } = req.body;


    const completion =
      await groq.chat.completions.create({

        model:"llama-3.1-8b-instant",

        messages:[
          {
            role:"system",
            content:`
You are a professional AI Content Generator.

Generate high quality content.

Rules:
- Match user's language.
- Use proper formatting.
- Return only final content.
`
          },

          {
            role:"user",
            content:`
Content Type:
${type}

User Request:
${prompt}
`
          }

        ],

      });



    res.json({

      content:
      completion.choices[0].message.content

    });


  } catch(error:any){

    console.error(
      "Groq Error:",
      error.message
    );


    res.status(500).json({

      message:"Content Generation Failed",
      error:error.message

    });

  }

});

router.post(
"/content",
generateContent
);


router.get(
"/control-center",
getControlCenter
);


// AI PLAYGROUND

router.post("/playground", async (req, res) => {

  try {

    const { prompt, model } = req.body;


    const completion =
      await groq.chat.completions.create({

        model: model || "llama-3.1-8b-instant",

        messages: [

          {
            role: "system",
            content: `
You are an AI Playground assistant.

Help users experiment with AI prompts.
Give accurate and useful responses.
`
          },

          {
            role: "user",
            content: prompt
          }

        ]

      });


    res.json({

      result:
      completion.choices[0].message.content

    });


  } catch(error:any){


    console.error(
      "Playground Error:",
      error.message
    );


    res.status(500).json({

      message:"AI Playground Failed",
      error:error.message

    });

  }

});



export default router;