"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdminProfile = exports.updateAdminSettings = exports.getAdminSettings = void 0;
const mongodb_1 = require("../config/mongodb");
// GET ADMIN SETTINGS
const getAdminSettings = async (req, res) => {
    try {
        const { email } = req.params;
        const admin = await (0, mongodb_1.db)()
            .collection("admin_settings")
            .findOne({
            "profile.email": email
        });
        if (!admin) {
            const newAdmin = {
                profile: {
                    name: "Admin User",
                    email,
                    role: "Super Admin",
                    image: ""
                },
                settings: {
                    aiLogs: true,
                    maintenance: false,
                    email: true,
                    twoFactor: true
                },
                createdAt: new Date(),
                updatedAt: new Date()
            };
            await (0, mongodb_1.db)()
                .collection("admin_settings")
                .insertOne(newAdmin);
            return res.json(newAdmin);
        }
        res.json(admin);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to get settings"
        });
    }
};
exports.getAdminSettings = getAdminSettings;
// UPDATE SETTINGS
const updateAdminSettings = async (req, res) => {
    try {
        const { email } = req.params;
        const { settings } = req.body;
        await (0, mongodb_1.db)()
            .collection("admin_settings")
            .updateOne({
            "profile.email": email
        }, {
            $set: {
                settings,
                updatedAt: new Date()
            }
        });
        res.json({
            message: "Settings updated"
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Update failed"
        });
    }
};
exports.updateAdminSettings = updateAdminSettings;
// UPDATE PROFILE
const updateAdminProfile = async (req, res) => {
    try {
        const { email } = req.params;
        const profile = req.body;
        // admin_settings update
        await (0, mongodb_1.db)()
            .collection("admin_settings")
            .updateOne({
            "profile.email": email
        }, {
            $set: {
                "profile.name": profile.name,
                "profile.image": profile.image,
                updatedAt: new Date()
            }
        });
        // Better Auth user update
        await (0, mongodb_1.db)()
            .collection("user")
            .updateOne({
            email
        }, {
            $set: {
                name: profile.name,
                image: profile.image,
                updatedAt: new Date()
            }
        });
        res.json({
            message: "Profile updated"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Profile update failed"
        });
    }
};
exports.updateAdminProfile = updateAdminProfile;
