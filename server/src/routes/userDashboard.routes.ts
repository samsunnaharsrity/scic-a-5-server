import { Router } from "express";
import { getDashboard } from "../controllers/userDashboard.controller";

const router = Router();


router.get("/:email", getDashboard);


export default router;