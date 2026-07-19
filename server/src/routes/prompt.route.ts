import express from "express";
import { createPrompt, deletePrompt, getPrompts, updatePrompt } from "../controllers/prompt.controller";




const router = express.Router();



router.get(
"/:email",
getPrompts
);



router.post(
"/",
createPrompt
);



router.put(
"/:id",
updatePrompt
);



router.delete(
"/:id",
deletePrompt
);



export default router;