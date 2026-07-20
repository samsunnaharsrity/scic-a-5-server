// import { Router } from "express";
// import { createAgent, deleteAgent, getAllAgents, getMyAgents, updateAgent } from "../controllers/agent.controller";

// const router = Router();


// console.log("Agent route loaded");


// router.post("/", createAgent);

// router.get(
// "/",
// getAllAgents
// );


// router.get(
// "/my/:email",
// getMyAgents
// );


// router.put("/:id",updateAgent);

// router.delete("/:id",deleteAgent);

// export default router;


import {Router} from "express";

import {
 createAgent,
 getMyAgents,
 getAllAgents,
 updateAgent,
 deleteAgent
} from "../controllers/agent.controller";


const router = Router();


router.post(
 "/",
 createAgent
);


router.get(
 "/:email",
 getMyAgents
);


router.get(
 "/all",
 getAllAgents
);


router.put(
 "/:id",
 updateAgent
);


router.delete(
 "/:id",
 deleteAgent
);



export default router;