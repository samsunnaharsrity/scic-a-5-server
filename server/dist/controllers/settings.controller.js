"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSettings = exports.getSettings = void 0;
const mongodb_1 = require("../config/mongodb");
const getSettings = async (req, res) => {
    try {
        const settingsCollection = (0, mongodb_1.db)().collection("settings");
        const { userId } = req.params;
        let settings = await settingsCollection.findOne({
            userId
        });
        if (!settings) {
            const defaultSettings = {
                userId,
                notifications: {
                    email: true,
                    updates: false
                },
                appearance: {
                    darkMode: false
                },
                security: {
                    loginAlert: true
                },
                ai: {
                    memory: true,
                    defaultModel: "gemini"
                },
                createdAt: new Date(),
                updatedAt: new Date()
            };
            await settingsCollection.insertOne(defaultSettings);
            settings = defaultSettings;
        }
        res.status(200).json({
            success: true,
            data: settings
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to get settings"
        });
    }
};
exports.getSettings = getSettings;
// UPDATE SETTINGS
const updateSettings = async (req, res) => {
    try {
        const settingsCollection = (0, mongodb_1.db)().collection("settings");
        const { userId } = req.params;
        const updateData = req.body;
        // remove immutable field
        delete updateData._id;
        await settingsCollection.updateOne({
            userId
        }, {
            $set: {
                ...updateData,
                updatedAt: new Date()
            }
        }, {
            upsert: true
        });
        res.status(200).json({
            success: true,
            message: "Settings updated"
        });
    }
    catch (error) {
        console.error("UPDATE ERROR:", error);
        res.status(500).json({
            success: false,
            message: "Update failed"
        });
    }
};
exports.updateSettings = updateSettings;
