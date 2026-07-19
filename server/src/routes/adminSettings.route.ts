import {Router} from "express";


import {

getAdminSettings,
updateAdminSettings,
updateAdminProfile

} from "../controllers/adminSettings.controller";



const router=Router();





router.get(
"/settings/:email",
getAdminSettings
);



router.put(
"/settings/:email",
updateAdminSettings
);



router.put(
"/profile/:email",
updateAdminProfile
);




export default router;