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


export default router;