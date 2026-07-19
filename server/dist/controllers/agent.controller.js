"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAgent = exports.updateAgent = exports.getAllAgents = exports.getMyAgents = exports.createAgent = void 0;
const mongodb_1 = require("../config/mongodb");
const mongodb_2 = require("mongodb");
// Create Agent
const createAgent = async (req, res) => {
    try {
        const { name, description, category, model, prompt, userEmail } = req.body;
        const database = (0, mongodb_1.db)();
        // Create Agent
        const result = await database
            .collection("agents")
            .insertOne({
            name,
            description,
            category,
            model,
            prompt,
            userEmail,
            createdAt: new Date()
        });
        // Save Activity Log
        await database
            .collection("activities")
            .insertOne({
            userEmail,
            action: "Created AI Agent",
            description: `Created ${name} AI agent`,
            createdAt: new Date()
        });
        res.status(201).json({
            success: true,
            message: "Agent created successfully",
            agentId: result.insertedId
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
exports.createAgent = createAgent;
// Get User Agents
const getMyAgents = async (req, res) => {
    try {
        const email = decodeURIComponent(req.params.email);
        const agents = await (0, mongodb_1.db)()
            .collection("agents")
            .find({
            userEmail: email
        })
            .sort({
            createdAt: -1
        })
            .toArray();
        res.json({
            success: true,
            agents
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
exports.getMyAgents = getMyAgents;
// Get All Agents
const getAllAgents = async (req, res) => {
    try {
        const agents = await (0, mongodb_1.db)()
            .collection("agents")
            .find({})
            .toArray();
        res.json(agents);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to load agents"
        });
    }
};
exports.getAllAgents = getAllAgents;
// UPDATE AGENT
const updateAgent = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("UPDATE ID:", id);
        if (!mongodb_2.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid MongoDB ID"
            });
        }
        const result = await (0, mongodb_1.db)()
            .collection("agents")
            .updateOne({
            _id: new mongodb_2.ObjectId(id)
        }, {
            $set: {
                name: req.body.name,
                model: req.body.model,
                status: req.body.status,
                tasks: req.body.tasks,
                icon: req.body.icon,
                updatedAt: new Date()
            }
        });
        res.json({
            success: true,
            result
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
exports.updateAgent = updateAgent;
// DELETE AGENT
const deleteAgent = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("DELETE ID:", id);
        if (!mongodb_2.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid MongoDB ID"
            });
        }
        const result = await (0, mongodb_1.db)()
            .collection("agents")
            .deleteOne({
            _id: new mongodb_2.ObjectId(id)
        });
        res.json({
            success: true,
            result
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
exports.deleteAgent = deleteAgent;
