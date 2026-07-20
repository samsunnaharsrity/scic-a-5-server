"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadTrainingFile = exports.getTrainingData = void 0;
const mongodb_1 = require("../config/mongodb");
// ================= GET TRAINING DATA =================
const getTrainingData = async (req, res) => {
    try {
        const { email } = req.params;
        const collection = (0, mongodb_1.db)().collection("training");
        let training = await collection.findOne({
            userEmail: email
        });
        if (!training) {
            const newTraining = {
                userEmail: email,
                files: [],
                trainedAgents: 0,
                accuracy: 0,
                progress: 0,
                lastTraining: null,
                updatedAt: new Date()
            };
            await collection.insertOne(newTraining);
            training = {
                ...newTraining
            };
        }
        res.json(training);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
};
exports.getTrainingData = getTrainingData;
// ================= UPLOAD TRAINING FILE =================
const uploadTrainingFile = async (req, res) => {
    try {
        const fileReq = req;
        console.log("BODY:", req.body);
        console.log("FILE:", fileReq.file);
        const { email } = req.body;
        if (!fileReq.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }
        const uploadedFile = {
            name: fileReq.file.originalname,
            type: fileReq.file.mimetype,
            size: fileReq.file.size,
            path: fileReq.file.path,
            uploadedAt: new Date()
        };
        const collection = (0, mongodb_1.db)().collection("training");
        const existing = await collection.findOne({
            userEmail: email
        });
        if (!existing) {
            await collection.insertOne({
                userEmail: email,
                files: [uploadedFile],
                trainedAgents: 0,
                accuracy: 0,
                progress: 0,
                lastTraining: null,
                updatedAt: new Date()
            });
        }
        else {
            await collection.updateOne({
                userEmail: email
            }, {
                $push: {
                    files: uploadedFile
                },
                $set: {
                    updatedAt: new Date()
                }
            });
        }
        const updated = await collection.findOne({
            userEmail: email
        });
        console.log("UPDATED:", updated);
        res.json(updated);
    }
    catch (error) {
        console.log("UPLOAD ERROR:", error);
        res.status(500).json({
            message: error.message
        });
    }
};
exports.uploadTrainingFile = uploadTrainingFile;
