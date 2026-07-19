"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePrompt = exports.updatePrompt = exports.createPrompt = exports.getPrompts = void 0;
const mongodb_1 = require("../config/mongodb");
const mongodb_2 = require("mongodb");
// GET ALL PROMPTS
const getPrompts = async (req, res) => {
    try {
        const { email } = req.params;
        const prompts = await (0, mongodb_1.db)()
            .collection("prompts")
            .find({
            userEmail: email
        })
            .sort({
            createdAt: -1
        })
            .toArray();
        res.json({
            success: true,
            data: prompts
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to load prompts"
        });
    }
};
exports.getPrompts = getPrompts;
// CREATE PROMPT
const createPrompt = async (req, res) => {
    try {
        const { userEmail, title, content, category } = req.body;
        const newPrompt = {
            userEmail,
            title,
            content,
            category: category || "General",
            favorite: false,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        const result = await (0, mongodb_1.db)()
            .collection("prompts")
            .insertOne(newPrompt);
        res.status(201).json({
            success: true,
            message: "Prompt saved",
            data: {
                _id: result.insertedId,
                ...newPrompt
            }
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Prompt create failed"
        });
    }
};
exports.createPrompt = createPrompt;
// UPDATE PROMPT
const updatePrompt = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, category } = req.body;
        await (0, mongodb_1.db)()
            .collection("prompts")
            .updateOne({
            _id: new mongodb_2.ObjectId(id)
        }, {
            $set: {
                title,
                content,
                category,
                updatedAt: new Date()
            }
        });
        res.json({
            success: true,
            message: "Prompt updated"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Update failed"
        });
    }
};
exports.updatePrompt = updatePrompt;
// DELETE PROMPT
const deletePrompt = async (req, res) => {
    try {
        const { id } = req.params;
        await (0, mongodb_1.db)()
            .collection("prompts")
            .deleteOne({
            _id: new mongodb_2.ObjectId(id)
        });
        res.json({
            success: true,
            message: "Prompt deleted"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Delete failed"
        });
    }
};
exports.deletePrompt = deletePrompt;
