"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const training_controller_1 = require("../controllers/training.controller");
const router = (0, express_1.Router)();
router.get("/:email", training_controller_1.getTrainingData);
exports.default = router;
