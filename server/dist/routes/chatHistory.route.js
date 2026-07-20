"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatHistory_controller_1 = require("../controllers/chatHistory.controller");
const router = express_1.default.Router();
// GET USER CHAT HISTORY
router.get("/chat-history/:email", chatHistory_controller_1.getChatHistory);
// DELETE SINGLE CHAT
router.delete("/chat-history/:id", chatHistory_controller_1.deleteChatHistory);
exports.default = router;
