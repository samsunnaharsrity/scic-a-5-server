import { Router } from "express";
import { db } from "../config/mongodb";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const user = req.body;

    console.log(user);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});



// update profile by email

router.patch("/:email", async(req,res)=>{

try{


const email = decodeURIComponent(
  req.params.email
);



const { name, image } = req.body;

const result = await db()
  .collection("user")
  .updateOne(
    {
      email,
    },
    {
      $set: {
        name,
        image,
        updatedAt: new Date(),
      },
    }
  );



if(result.matchedCount===0){

return res.status(404).json({

success:false,
message:"User not found"

});

}



res.json({

success:true,
message:"Profile updated successfully"

});



}
catch(error:any){

console.log("UPDATE PROFILE ERROR:",error);


res.status(500).json({

success:false,
message:error.message

});


}


});


export default router;