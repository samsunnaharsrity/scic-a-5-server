import {Router} from "express";
import multer from "multer";

import {
    getTrainingData,
    uploadTrainingFile
} from "../controllers/training.controller";


const router = Router();
const storage = multer.memoryStorage()

const upload = multer({
    storage,
});



router.get(
    "/:email",
    getTrainingData
);



router.post(
    "/upload",
    upload.single("file"),
    uploadTrainingFile
);



export default router;