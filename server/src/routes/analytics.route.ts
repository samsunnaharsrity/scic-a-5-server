import express from "express";
import {
getUserAnalytics
} from "../controllers/analytics.controller";


const router=express.Router();


router.get(
"/user/:email",
getUserAnalytics
);


export default router;