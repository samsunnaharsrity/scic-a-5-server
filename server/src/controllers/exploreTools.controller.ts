import { Request, Response } from "express";
import { connectDB, db } from "../config/mongodb";
import { ObjectId } from "mongodb";


export const getAllTools = async(
req:Request<{id:string}>,
res:Response
)=>{
  try {


const database = await connectDB();

    const tools = await db()
      .collection("tools")
      .find({})
      .toArray();

    res.status(200).json({
      success: true,
      tools,
    });
  } catch (error) {
    console.error("Get Tools Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch tools",
    });
  }
};


// import { ObjectId } from "mongodb";


// Get Single Tool




export const getSingleTool = async(
req:Request<{id:string}>,
res:Response
)=>{

  try {

    const { id } = req.params;


    // id validation
    if (!id || !ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid tool id",
      });
    }


    const tool = await db()
      .collection("tools")
      .findOne({
        _id: new ObjectId(id),
      });


    if (!tool) {

      return res.status(404).json({
        success: false,
        message: "Tool not found",
      });

    }


return res.status(200).json({
  success: true,
  data: {
    ...tool,
    reviews: tool.reviews || []
  },
});


  } catch (error) {

    console.error("Single Tool Error:", error);


    return res.status(500).json({
      success: false,
      message: "Failed to fetch tool",
    });

  }

};