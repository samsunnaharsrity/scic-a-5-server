"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userDashboard_controller_1 = require("../controllers/userDashboard.controller");
const router = (0, express_1.Router)();
router.get("/:email", userDashboard_controller_1.getDashboard);
exports.default = router;
