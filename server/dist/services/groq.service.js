"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAI = void 0;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const groq = new groq_sdk_1.default({
    apiKey: process.env.GROQ_API_KEY
});
const generateAI = async (prompt) => {
    const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
            {
                role: "system",
                content: "You are a helpful professional AI assistant."
            },
            {
                role: "user",
                content: prompt
            }
        ]
    });
    return completion
        .choices[0]
        .message
        .content;
};
exports.generateAI = generateAI;
