import express from "express";
import { createReview } from "../controllers/review.controller";
import { getToolReviews } from "../controllers/exploreTools.controller";



const router = express.Router();



router.post(
"/reviews",
createReview
);



router.get(
"/reviews/:toolId",
getToolReviews
);



export default router;