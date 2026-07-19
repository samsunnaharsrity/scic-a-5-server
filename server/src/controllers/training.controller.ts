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

// Multer Request
interface MulterRequest extends Request {
  file?: Express.Multer.File;
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
  req: MulterRequest,
  res: Response
) => {
  try {
    const { email } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const file: UploadedFile = {
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      uploadedAt: new Date(),
    };

    const collection = db().collection<TrainingDocument>("training");

    await collection.updateOne(
      {
        userEmail: email,
      },
      {
        $push: {
          files: file,
        },
        $set: {
          updatedAt: new Date(),
        },
      },
      {
        upsert: true,
      }
    );

    res.json({
      success: true,
      message: "File uploaded",
      file,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};