import express from "express";
import {
 getAgents,
 getAgentById
} from "../controllers/agent.controller";


const router = express.Router();


router.get("/", getAgents);

router.get("/:id", getAgentById);


export default router;