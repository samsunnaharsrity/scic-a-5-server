"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const aiAnalytics_controller_1 = require("../controllers/aiAnalytics.controller");
const router = express_1.default.Router();
router.get("/:email", aiAnalytics_controller_1.getAIAnalytics);
exports.default = router;
