import { Router } from "express";
import { getAllTools, getSingleTool } from "../controllers/exploreTools.controller";


const router = Router();

router.get("/", getAllTools);
router.get("/:id", getSingleTool);

export default router;