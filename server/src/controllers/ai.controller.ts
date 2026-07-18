import {Request,Response} from "express";
import {GoogleGenerativeAI} from "@google/generative-ai";


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