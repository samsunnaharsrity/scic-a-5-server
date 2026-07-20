import express from "express";
import { getAdminDashboard } from "../controllers/adminDashboard. controller";



const router=express.Router();


router.get(
"/dashboard",
getAdminDashboard
);


export default router;