"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChatHistory = exports.getChatHistory = void 0;
const mongodb_1 = require("../config/mongodb");
const mongodb_2 = require("mongodb");
// GET USER CHAT HISTORY
const getChatHistory = async (req, res) => {
    try {
        const email = req.params.email;
        const chats = await (0, mongodb_1.db)()
            .collection("chat_history")
            .find({
            userEmail: email
        })
            .sort({
            createdAt: -1
        })
            .toArray();
        res.json({
            success: true,
            chats
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.getChatHistory = getChatHistory;
// DELETE SINGLE CHAT
const deleteChatHistory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Chat id required"
            });
        }
        const result = await (0, mongodb_1.db)()
            .collection("chat_history")
            .deleteOne({
            _id: new mongodb_2.ObjectId(id)
        });
        res.json({
            success: true,
            message: "Chat deleted successfully",
            deletedCount: result.deletedCount
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.deleteChatHistory = deleteChatHistory;
