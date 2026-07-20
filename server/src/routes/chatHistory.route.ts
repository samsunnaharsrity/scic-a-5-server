import express from "express";
import {
 getChatHistory,
 deleteChatHistory
} from "../controllers/chatHistory.controller";


const router = express.Router();



// GET USER CHAT HISTORY
router.get(
"/chat-history/:email",
getChatHistory
);



// DELETE SINGLE CHAT
router.delete(
"/chat-history/:id",
deleteChatHistory
);



export default router;