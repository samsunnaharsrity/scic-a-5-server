import { Router } from "express";
import { createAgent, deleteAgent, getAllAgents, getMyAgents, updateAgent } from "../controllers/agent.controller";

const router = Router();


console.log("Agent route loaded");


router.post("/", createAgent);

router.get(
"/",
getAllAgents
);


router.get(
"/my/:email",
getMyAgents
);


router.put("/:id",updateAgent);

router.delete("/:id",deleteAgent);

export default router;