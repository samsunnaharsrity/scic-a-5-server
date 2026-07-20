"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("../controllers/review.controller");
const exploreTools_controller_1 = require("../controllers/exploreTools.controller");
const router = express_1.default.Router();
router.post("/reviews", review_controller_1.createReview);
router.get("/reviews/:toolId", exploreTools_controller_1.getToolReviews);
exports.default = router;
