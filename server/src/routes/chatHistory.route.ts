import express from "express";
import {
 getChatHistory,
 deleteChatHistory
} from "../controllers/chatHistory.controller";


const router = express.Router();



router.get(
"/chat-history/:email",
getChatHistory
);



router.delete(
"/chat-history/:email",
deleteChatHistory
);



export default router;