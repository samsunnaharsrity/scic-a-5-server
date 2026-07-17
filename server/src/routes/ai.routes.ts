import { Router } from "express";
import OpenAI from "openai";

const router = Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// AI Chat
router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "AI Chat Failed",
    });
  }
});

// AI Content Generator
router.post("/content", async (req, res) => {
  try {
    const { type, prompt } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `
You are a professional AI Content Generator.

Generate high-quality content based on the user's request.

Rules:
- Match the language of the user's prompt.
- Return only the requested content.
- Use headings if appropriate.
- Make it engaging and well-structured.
          `,
        },
        {
          role: "user",
          content: `Content Type: ${type}

Prompt:
${prompt}`,
        },
      ],
    });

    res.json({
      content: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Content Generation Failed",
    });
  }
});

export default router;