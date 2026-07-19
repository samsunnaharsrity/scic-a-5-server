import { Request, Response } from "express";
import { db } from "../config/mongodb";
import { ObjectId } from "mongodb";


// GET USER CHAT HISTORY

export const getChatHistory = async(
req:Request,
res:Response
)=>{

try{


const {email}=req.params;


const chats = await db()
.collection("chat_history")
.find({
 userEmail:email
})
.sort({
 createdAt:-1
})
.toArray();



const formattedChats = chats.map(chat=>({

...chat,

_id: chat._id.toString()

}));



res.json({

success:true,
chats:formattedChats

});


}
catch(error){

console.log(error);


res.status(500).json({

success:false,
message:"Failed to fetch chat history"

});


}


};






// DELETE CHAT

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



return res.status(200).json({

success:true,
message:"All chat history deleted",
deletedCount:result.deletedCount

});


}
catch(error:any){


console.log("DELETE ERROR:",error.message);


return res.status(500).json({

success:false,
message:error.message

});


}


};