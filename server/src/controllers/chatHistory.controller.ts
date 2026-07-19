import { Request, Response } from "express";
import { db } from "../config/mongodb";
import { ObjectId } from "mongodb";


// GET USER CHAT HISTORY
export const getChatHistory = async(
req:Request,
res:Response
)=>{


const email=req.params.email;


const chats = await db()
.collection("chat_history")
.find({
 userEmail:email
})
.sort({
 createdAt:-1
})
.toArray();



res.json({

success:true,
chats

});


};






// DELETE SINGLE CHAT

export const deleteChatHistory = async(
req:Request,
res:Response
)=>{

try{

const {email}=req.params;


if(!email){

return res.status(400).json({

success:false,
message:"Email required"

});

}



const result = await db()
.collection("chat_history")
.deleteMany({

userEmail:email

});



res.json({

success:true,

message:"All chats deleted",

deletedCount:result.deletedCount

});


}
catch(error:any){

console.log(error);

res.status(500).json({

success:false,

message:error.message

});

}


};