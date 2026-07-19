"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadTrainingFile = exports.getTrainingData = void 0;
const mongodb_1 = require("../config/mongodb");
// GET TRAINING DATA
const getTrainingData = async (req, res) => {
    try {
        const { email } = req.params;
        let training = await (0, mongodb_1.db)()
            .collection("training")
            .findOne({
            userEmail: email
        });
        if (!training) {
            training = {
                userEmail: email,
                files: [],
                trainedAgents: 0,
                accuracy: 0,
                progress: 0,
                lastTraining: null
            };
            await (0, mongodb_1.db)()
                .collection("training")
                .insertOne(training);
        }
        res.json(training);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
exports.getTrainingData = getTrainingData;
// Upload Training File
const uploadTrainingFile = async (req, res) => {
    try {
        const { email } = req.body;
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }
        const file = {
            name: req.file.originalname,
            type: req.file.mimetype,
            size: req.file.size,
            path: req.file.path,
            uploadedAt: new Date()
        };
        await (0, mongodb_1.db)()
            .collection("training")
            .updateOne({
            userEmail: email
        }, {
            $push: {
                files: file
            },
            $set: {
                updatedAt: new Date()
            }
        }, {
            upsert: true
        });
        res.json({
            success: true,
            message: "File uploaded",
            file
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
exports.uploadTrainingFile = uploadTrainingFile;
