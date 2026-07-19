import { Router } from "express";
import { getAllTools, getSingleTool, getToolReviews } from "../controllers/exploreTools.controller";


const router = Router();

router.get("/", getAllTools);
router.get("/:id", getSingleTool);

router.get(
"/reviews/:toolId",
getToolReviews
);

export default router;