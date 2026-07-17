import { Request, Response } from "express";
import toolsModel from "../models/tools.model";

export const getAllTools = async (req: Request, res: Response) => {
  try {
    const tools = await toolsModel.find();

    res.status(200).json({
      success: true,
      data: tools,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch tools",
    });
  }
};