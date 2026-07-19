"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminSettings_controller_1 = require("../controllers/adminSettings.controller");
const router = (0, express_1.Router)();
router.get("/settings/:email", adminSettings_controller_1.getAdminSettings);
router.put("/settings/:email", adminSettings_controller_1.updateAdminSettings);
router.put("/profile/:email", adminSettings_controller_1.updateAdminProfile);
exports.default = router;
