import { Router } from "express";
import Groq from "groq-sdk";

const router = Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


// AI CHAT ASSISTANT

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",

      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI assistant. Answer clearly and professionally.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });


    res.json({
      reply:
        completion.choices[0].message.content,
    });


  } catch (error: any) {

    console.error(
      "Groq Error:",
      error.message
    );

    res.status(500).json({
      message:"AI Chat Failed",
      error:error.message,
    });
  }
});




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


export default router;