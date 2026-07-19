import { Request, Response } from "express";
import { db } from "../config/mongodb";


export const getTemplates = async(
req:Request,
res:Response
)=>{

try{


const templates = await db()
.collection("templates")
.find({})
.toArray();



res.status(200).json({

success:true,
templates

});


}
catch(error){


console.log(error);


res.status(500).json({

success:false,
message:"Failed to fetch templates"

});


}

};