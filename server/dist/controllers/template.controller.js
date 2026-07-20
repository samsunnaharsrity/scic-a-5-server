"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplates = void 0;
const mongodb_1 = require("../config/mongodb");
const getTemplates = async (req, res) => {
    try {
        const templates = await (0, mongodb_1.db)()
            .collection("templates")
            .find({})
            .toArray();
        res.status(200).json({
            success: true,
            templates
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch templates"
        });
    }
};
exports.getTemplates = getTemplates;
