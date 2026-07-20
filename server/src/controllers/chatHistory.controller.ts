import { Request, Response } from "express";
import { db } from "../config/mongodb";
import { ObjectId } from "mongodb";


// GET USER CHAT HISTORY
export const getChatHistory = async(
req: Request,
res: Response
)=>{

try{

const email = req.params.email;


const chats = await db()
.collection("chat_history")
.find({
  userEmail: email
})
.sort({
  createdAt:-1
})
.toArray();


res.json({

success:true,
chats

});


}
catch(error:any){

res.status(500).json({

success:false,
message:error.message

});

}

};





// DELETE SINGLE CHAT
export const deleteChatHistory = async (
  req: Request<{ id: string }>,
  res: Response
) => {

try{


const { id } = req.params;


if(!id){

return res.status(400).json({

success:false,
message:"Chat id required"

});

}



const result = await db()
.collection("chat_history")
.deleteOne({

_id: new ObjectId(id)

});



res.json({

success:true,

message:"Chat deleted successfully",

deletedCount: result.deletedCount

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