"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const ai_controller_1 = require("../controllers/ai.controller");
const router = (0, express_1.Router)();
const groq = new groq_sdk_1.default({
    apiKey: process.env.GROQ_API_KEY,
});
// AI CHAT ASSISTANT
router.post("/chat", ai_controller_1.chatAI);
// AI CONTENT GENERATOR
router.post("/content", async (req, res) => {
    try {
        const { type, prompt } = req.body;
        const completion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "system",
                    content: `
You are a professional AI Content Generator.

Generate high quality content.

Rules:
- Match user's language.
- Use proper formatting.
- Return only final content.
`
                },
                {
                    role: "user",
                    content: `
Content Type:
${type}

User Request:
${prompt}
`
                }
            ],
        });
        res.json({
            content: completion.choices[0].message.content
        });
    }
    catch (error) {
        console.error("Groq Error:", error.message);
        res.status(500).json({
            message: "Content Generation Failed",
            error: error.message
        });
    }
});
router.post("/content", ai_controller_1.generateContent);
router.get("/control-center", ai_controller_1.getControlCenter);
exports.default = router;
