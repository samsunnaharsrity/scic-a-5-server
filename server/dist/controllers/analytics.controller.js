"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAnalytics = void 0;
const mongodb_1 = require("../config/mongodb");
const getUserAnalytics = async (req, res) => {
    try {
        const email = req.params.email;
        const database = (0, mongodb_1.db)();
        // Agents count
        const agents = await database
            .collection("agents")
            .countDocuments({
            userEmail: email
        });
        // Chat count
        const chats = await database
            .collection("chat_history")
            .countDocuments({
            userEmail: email
        });
        // AI Requests
        const requests = await database
            .collection("ai_requests")
            .countDocuments({
            userEmail: email
        });
        // Tokens
        const tokenData = await database
            .collection("ai_requests")
            .aggregate([
            {
                $match: {
                    userEmail: email
                }
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: {
                            $ifNull: [
                                "$tokens",
                                0
                            ]
                        }
                    }
                }
            }
        ])
            .toArray();
        const tokens = tokenData[0]?.total || 0;
        // Agent Create Trend
        const agentsUsage = await database
            .collection("agents")
            .aggregate([
            {
                $match: {
                    userEmail: email
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%b %d",
                            date: {
                                $toDate: "$createdAt"
                            }
                        }
                    },
                    agents: {
                        $sum: 1
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    date: "$_id",
                    agents: 1
                }
            }
        ])
            .toArray();
        // Chat Usage Pie
        const chatUsage = await database
            .collection("chat_history")
            .aggregate([
            {
                $match: {
                    userEmail: email
                }
            },
            {
                $group: {
                    _id: {
                        $ifNull: [
                            "$tool",
                            "AI Chat"
                        ]
                    },
                    value: {
                        $sum: 1
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    name: "$_id",
                    value: 1
                }
            }
        ])
            .toArray();
        res.json({
            success: true,
            stats: {
                requests,
                chats,
                agents,
                tokens,
            },
            agentsUsage,
            chatUsage
        });
    }
    catch (error) {
        console.log("ANALYTICS ERROR:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.getUserAnalytics = getUserAnalytics;
