import { Request, Response } from "express";
import { db } from "../config/mongodb";


export const createReview = async(
 req:Request,
 res:Response
)=>{

try{

const {
 toolId,
 user,
 comment,
 rating
}=req.body;



if(!toolId || !user || !comment || !rating){

return res.status(400).json({
success:false,
message:"All fields required"
});

}



const result = await db()
.collection("reviews")
.insertOne({

toolId,

user,

comment,

rating:Number(rating),

createdAt:new Date()

});



res.status(201).json({

success:true,

message:"Review added",

reviewId:result.insertedId

});


}
catch(error){

console.log(error);


res.status(500).json({

success:false,

message:"Failed to add review"

});

}

};