"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReview = void 0;
const mongodb_1 = require("../config/mongodb");
const createReview = async (req, res) => {
    try {
        const { toolId, user, comment, rating } = req.body;
        if (!toolId || !user || !comment || !rating) {
            return res.status(400).json({
                success: false,
                message: "All fields required"
            });
        }
        const result = await (0, mongodb_1.db)()
            .collection("reviews")
            .insertOne({
            toolId,
            user,
            comment,
            rating: Number(rating),
            createdAt: new Date()
        });
        res.status(201).json({
            success: true,
            message: "Review added",
            reviewId: result.insertedId
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to add review"
        });
    }
};
exports.createReview = createReview;
