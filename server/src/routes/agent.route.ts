import { Router } from "express";
import { createAgent, getMyAgents } from "../controllers/agent.controller";

const router = Router();


console.log("Agent route loaded");


router.post("/", createAgent);


router.get(
"/my/:email",
getMyAgents
);

export default router;