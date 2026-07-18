import express from "express";

import {
getSettings,
updateSettings
}
from "../controllers/settings.controller";


const router=express.Router();



// get settings

router.get(
"/:userId",
getSettings
);



// update settings

router.patch(
"/:userId",
updateSettings
);



export default router;