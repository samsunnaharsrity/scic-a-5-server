"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongodb_1 = require("../config/mongodb");
const mongodb_2 = require("mongodb");
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    try {
        const user = req.body;
        console.log(user);
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
// update profile by email
router.patch("/:email", async (req, res) => {
    try {
        const email = decodeURIComponent(req.params.email);
        const { name, image } = req.body;
        const result = await (0, mongodb_1.db)()
            .collection("user")
            .updateOne({
            email,
        }, {
            $set: {
                name,
                image,
                updatedAt: new Date(),
            },
        });
        if (result.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.json({
            success: true,
            message: "Profile updated successfully"
        });
    }
    catch (error) {
        console.log("UPDATE PROFILE ERROR:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
// GET ALL USERS
router.get("/", async (req, res) => {
    try {
        const users = await (0, mongodb_1.db)()
            .collection("user")
            .find({})
            .sort({
            createdAt: -1
        })
            .toArray();
        const formattedUsers = users.map(user => ({
            _id: user._id,
            name: user.name || "Unknown",
            email: user.email,
            image: user.image || null,
            role: user.role || "user",
            status: user.banned
                ?
                    "Blocked"
                :
                    "Active",
            plan: user.plan || "free",
            createdAt: user.createdAt
        }));
        res.json({
            success: true,
            data: formattedUsers
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
// UPDATE USER ROLE
router.patch("/role/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        const result = await (0, mongodb_1.db)()
            .collection("user")
            .updateOne({
            _id: new mongodb_2.ObjectId(id)
        }, {
            $set: {
                role,
                updatedAt: new Date()
            }
        });
        res.json({
            success: true,
            message: "Role updated",
            result
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
// BLOCK / UNBLOCK USER
router.patch("/ban/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { banned } = req.body;
        const result = await (0, mongodb_1.db)()
            .collection("user")
            .updateOne({
            _id: new mongodb_2.ObjectId(id)
        }, {
            $set: {
                banned,
                updatedAt: new Date()
            }
        });
        if (result.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.json({
            success: true,
            message: banned
                ?
                    "User blocked"
                :
                    "User unblocked"
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.default = router;
