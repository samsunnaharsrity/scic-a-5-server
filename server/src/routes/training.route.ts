import {Router} from "express";
import {getTrainingData} from "../controllers/training.controller";


const router=Router();



router.get(
"/:email",
getTrainingData
);



export default router;