"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminDashboard__controller_1 = require("../controllers/adminDashboard. controller");
const router = express_1.default.Router();
router.get("/dashboard", adminDashboard__controller_1.getAdminDashboard);
exports.default = router;
