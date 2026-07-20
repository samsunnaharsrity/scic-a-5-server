"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exploreTools_controller_1 = require("../controllers/exploreTools.controller");
const router = (0, express_1.Router)();
router.get("/", exploreTools_controller_1.getAllTools);
router.get("/:id", exploreTools_controller_1.getSingleTool);
router.get("/reviews/:toolId", exploreTools_controller_1.getToolReviews);
exports.default = router;
