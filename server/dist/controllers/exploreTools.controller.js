"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleTool = exports.getAllTools = void 0;
const mongodb_1 = require("../config/mongodb");
const mongodb_2 = require("mongodb");
const getAllTools = async (req, res) => {
    try {
        const tools = await (0, mongodb_1.db)()
            .collection("tools")
            .find({})
            .toArray();
        res.status(200).json({
            success: true,
            data: tools,
        });
    }
    catch (error) {
        console.error("Get Tools Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch tools",
        });
    }
};
exports.getAllTools = getAllTools;
// import { ObjectId } from "mongodb";
// Get Single Tool
const getSingleTool = async (req, res) => {
    try {
        const { id } = req.params;
        // id validation
        if (!id || !mongodb_2.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid tool id",
            });
        }
        const tool = await (0, mongodb_1.db)()
            .collection("tools")
            .findOne({
            _id: new mongodb_2.ObjectId(id),
        });
        if (!tool) {
            return res.status(404).json({
                success: false,
                message: "Tool not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: {
                ...tool,
                reviews: tool.reviews || []
            },
        });
    }
    catch (error) {
        console.error("Single Tool Error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch tool",
        });
    }
};
exports.getSingleTool = getSingleTool;
