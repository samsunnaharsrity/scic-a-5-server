import { Router } from "express";
import { getAllTools } from "../controllers/exploreTools.controller";

const router = Router();

router.get("/", getAllTools);

export default router;