import express from "express";
import { getAIAnalytics } from "../controllers/aiAnalytics.controller";



const router=express.Router();



router.get(
"/:email",
getAIAnalytics
);



export default router;