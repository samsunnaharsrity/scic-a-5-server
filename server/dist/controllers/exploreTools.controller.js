"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToolReviews = exports.getSingleTool = exports.getAllTools = void 0;
const mongodb_1 = require("../config/mongodb");
const mongodb_2 = require("mongodb");
const getAllTools = async (req, res) => {
    try {
        const database = await (0, mongodb_1.connectDB)();
        const tools = await (0, mongodb_1.db)()
            .collection("tools")
            .find({})
            .toArray();
        res.status(200).json({
            success: true,
            tools,
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
        if (!id || !mongodb_2.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid tool id"
            });
        }
        const database = (0, mongodb_1.db)();
        const tool = await database
            .collection("tools")
            .findOne({
            _id: new mongodb_2.ObjectId(id)
        });
        if (!tool) {
            return res.status(404).json({
                success: false,
                message: "Tool not found"
            });
        }
        const reviews = await database
            .collection("reviews")
            .find({
            toolId: id
        })
            .toArray();
        return res.status(200).json({
            success: true,
            data: {
                ...tool,
                reviews
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch tool"
        });
    }
};
exports.getSingleTool = getSingleTool;
const getToolReviews = async (req, res) => {
    try {
        const { toolId } = req.params;
        console.log("Searching reviews for:", toolId);
        const reviews = await (0, mongodb_1.db)()
            .collection("reviews")
            .find({
            toolId: toolId
        })
            .toArray();
        console.log("Reviews found:", reviews);
        res.status(200).json({
            success: true,
            reviews
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Review fetch failed"
        });
    }
};
exports.getToolReviews = getToolReviews;
