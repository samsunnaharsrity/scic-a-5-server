"use strict";
// import {Request, Response} from "express";
// import {db} from "../config/mongodb";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAIAnalytics = void 0;
const mongodb_1 = require("../config/mongodb");
const getAIAnalytics = async (req, res) => {
    try {
        const email = req.params.email;
        const database = (0, mongodb_1.db)();
        // AI Logs
        const logs = await database
            .collection("ai_usage_logs")
            .find({
            userEmail: email
        })
            .toArray();
        // Agents count
        const agents = await database
            .collection("agents")
            .countDocuments({
            userEmail: email
        });
        // Total Tokens
        const totalTokens = logs.reduce((sum, item) => sum + (item.tokens || 0), 0);
        // Total Requests
        const totalRequests = logs.length;
        // Cost
        const totalCost = logs.reduce((sum, item) => sum + (item.cost || 0), 0);
        // Success
        const success = logs.filter((item) => item.status === "success").length;
        const failed = logs.filter((item) => item.status === "failed").length;
        const successRate = totalRequests
            ?
                Math.round((success / totalRequests) * 100)
            :
                0;
        // Average response
        const avgResponseTime = totalRequests
            ?
                Number((logs.reduce((sum, item) => sum + (item.responseTime || 0), 0)
                    / totalRequests).toFixed(2))
            :
                0;
        // Last 7 days usage
        const usageMap = {};
        logs.forEach(item => {
            const day = new Date(item.createdAt)
                .toLocaleDateString("en-US", {
                weekday: "short"
            });
            if (!usageMap[day]) {
                usageMap[day] = 0;
            }
            usageMap[day]++;
        });
        const usage = [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"
        ].map(day => ({
            day,
            value: usageMap[day] || 0
        }));
        res.json({
            success: true,
            data: {
                totalTokens,
                totalRequests,
                totalCost: Number(totalCost.toFixed(2)),
                totalAgents: agents,
                performance: {
                    avgResponseTime,
                    successRate,
                    failedRequests: failed
                },
                growth: {
                    tokens: "+15%",
                    requests: "+22%",
                    cost: "+8%"
                },
                usage
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Analytics error"
        });
    }
};
exports.getAIAnalytics = getAIAnalytics;
