"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const template_controller_1 = require("../controllers/template.controller");
const router = express_1.default.Router();
router.get("/templates", template_controller_1.getTemplates);
exports.default = router;
