import { Request, Response } from "express";
import { db } from "../config/mongodb";

interface UploadedFile {
  name: string;
  type: string;
  size: number;
  path: string;
  uploadedAt: Date;
}

interface TrainingDocument {
  userEmail: string;
  files: UploadedFile[];
  trainedAgents: number;
  accuracy: number;
  progress: number;
  lastTraining: Date | null;
  updatedAt?: Date;
}



// ================= GET TRAINING DATA =================

export const getTrainingData = async (
  req: Request<{ email: string }>,
  res: Response
) => {
  try {
    const { email } = req.params;

    const collection = db().collection<TrainingDocument>("training");

    let training = await collection.findOne({
      userEmail: email,
    });

    if (!training) {
      const newTraining: TrainingDocument = {
        userEmail: email,
        files: [],
        trainedAgents: 0,
        accuracy: 0,
        progress: 0,
        lastTraining: null,
      };

      await collection.insertOne(newTraining);

  training = await collection.findOne({
    userEmail: email,
  });
    }

    res.json(training);
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= UPLOAD TRAINING FILE =================

export const uploadTrainingFile = async (
  req: Request,
  res: Response
) => {
  try {
    const fileReq = req as Request & {
      file?: {
        originalname: string;
        mimetype: string;
        size: number;
        path: string;
      };
    };

    const { email } = req.body;

    if (!fileReq.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const file: UploadedFile = {
      name: fileReq.file.originalname,
      type: fileReq.file.mimetype,
      size: fileReq.file.size,
      path: fileReq.file.path,
      uploadedAt: new Date(),
    };

    // ...
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};