"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getControlCenter = exports.generateContent = exports.chatAI = void 0;
const generative_ai_1 = require("@google/generative-ai");
const groq_service_1 = require("../services/groq.service");
const mongodb_1 = require("../config/mongodb");
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.OPENAI_API_KEY);
const chatAI = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        const { message, email } = req.body;
        console.log("EMAIL:", email);
        const reply = await (0, groq_service_1.generateAI)(message);
        console.log("AI REPLY GENERATED");
        const saved = await (0, mongodb_1.db)()
            .collection("chat_history")
            .insertOne({
            userEmail: email,
            title: message.slice(0, 40),
            message: reply,
            tool: "AI Chat Assistant",
            createdAt: new Date()
        });
        console.log("SAVED:", saved);
        res.json({
            success: true,
            reply
        });
    }
    catch (error) {
        console.log("ERROR:", error);
        res.status(500).json({
            success: false
        });
    }
};
exports.chatAI = chatAI;
// CONTENT GENERATOR
const generateContent = async (req, res) => {
    try {
        const { type, prompt } = req.body;
        const content = await (0, groq_service_1.generateAI)(`

Create ${type} content.

Requirement:

${prompt}

`);
        res.json({
            success: true,
            content
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.generateContent = generateContent;
// AI CONTROL CENTER
const getControlCenter = async (req, res) => {
    res.json({
        status: "Online",
        uptime: "99.9%",
        models: [
            {
                name: "Groq Llama 3.1",
                performance: 96
            },
            {
                name: "Gemini Flash",
                performance: 91
            }
        ],
        agents: {
            running: 5,
            tasksToday: 128
        },
        activities: [
            "AI Chat Assistant processed 42 requests",
            "Content Generator created 18 documents",
            "Agent workflow completed successfully",
            "AI model health check passed"
        ]
    });
};
exports.getControlCenter = getControlCenter;
