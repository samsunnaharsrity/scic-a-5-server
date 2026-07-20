"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboard = void 0;
const mongodb_1 = require("../config/mongodb");
const getDashboard = async (req, res) => {
    try {
        const database = (0, mongodb_1.db)();
        const email = req.params.email;
        const user = await database
            .collection("user")
            .findOne({
            email
        });
        const agents = await database
            .collection("agents")
            .countDocuments();
        const requests = await database
            .collection("ai_requests")
            .countDocuments({
            userEmail: email
        });
        const recentAgents = await database
            .collection("agents")
            .find({})
            .sort({ createdAt: -1 })
            .limit(5)
            .toArray();
        console.log("RECENT AGENTS:", recentAgents);
        const activities = recentAgents.map((agent) => ({
            _id: agent._id,
            title: agent.name,
            action: "Created AI Agent",
            icon: "bot",
            createdAt: agent.createdAt,
        }));
        res.json({
            user: {
                name: user?.name || "User",
            },
            stats: {
                agents,
                requests,
                usage: "78%",
                plan: user?.plan || "Free",
            },
            activities,
        });
    }
    catch (error) {
        console.log("Dashboard Error:", error.message);
        res.status(500).json({
            message: error.message
        });
    }
};
exports.getDashboard = getDashboard;
