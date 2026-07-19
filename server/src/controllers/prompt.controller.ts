import {Request, Response} from "express";
import {db} from "../config/mongodb";
import { ObjectId } from "mongodb";



// GET ALL PROMPTS

export const getPrompts = async(
req:Request,
res:Response
)=>{

try{


const {email}=req.params;


const prompts =
await db()
.collection("prompts")
.find({
userEmail:email
})
.sort({
createdAt:-1
})
.toArray();



res.json({

success:true,

data:prompts

});


}
catch(error){


res.status(500).json({

message:"Failed to load prompts"

});


}


}






// CREATE PROMPT


export const createPrompt = async(
req:Request,
res:Response
)=>{


try{


const {

userEmail,

title,

content,

category


}=req.body;




const newPrompt={


userEmail,

title,

content,

category:category || "General",

favorite:false,


createdAt:new Date(),

updatedAt:new Date()


};



const result =
await db()
.collection("prompts")
.insertOne(newPrompt);



res.status(201).json({

success:true,

message:"Prompt saved",

data:{
_id:result.insertedId,
...newPrompt
}

});


}
catch(error){


res.status(500).json({

message:"Prompt create failed"

});


}


}







// UPDATE PROMPT


export const updatePrompt = async(
req:Request,
res:Response
)=>{


try{


const {
id
}=req.params;



const {
title,
content,
category
}=req.body;




await db()
.collection("prompts")
.updateOne(

{
_id:new ObjectId(id)
},

{
$set:{

title,

content,

category,

updatedAt:new Date()

}

}

);



res.json({

success:true,

message:"Prompt updated"

});



}
catch(error){


res.status(500).json({

message:"Update failed"

});


}


}







// DELETE PROMPT


export const deletePrompt = async(
req:Request,
res:Response
)=>{


try{


const {id}=req.params;



await db()
.collection("prompts")
.deleteOne({

_id:new ObjectId(id)

});



res.json({

success:true,

message:"Prompt deleted"

});


}
catch(error){


res.status(500).json({

message:"Delete failed"

});


}


}