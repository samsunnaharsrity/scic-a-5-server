"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const settings_controller_1 = require("../controllers/settings.controller");
const router = express_1.default.Router();
// get settings
router.get("/:userId", settings_controller_1.getSettings);
// update settings
router.patch("/:userId", settings_controller_1.updateSettings);
exports.default = router;
