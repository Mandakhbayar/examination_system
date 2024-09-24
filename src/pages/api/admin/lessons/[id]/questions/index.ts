import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/config/db"; // Assuming you have set up a DB pool
import { Answer } from "@/utils/types";
import multer from "multer";
import fs from "fs";
import path from "path";

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

// Initialize multer
const upload = multer({ storage });

// Helper to run multer in the API route
const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: any) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

// API handler
export default async function handler(
  req: NextApiRequest & { files: any },
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const lessonId = req.query.id as string;
    await runMiddleware(
      req,
      res,
      upload.fields([{ name: "image" }, { name: "video" }, { name: "audio" }])
    );

    const { id, text, answers } = req.body;

    // Validating the required fields
    if (!text || !answers) {
      return res
        .status(400)
        .json({ message: "Question text and answers are required." });
    }

    // Collecting file paths for media
    const imageFile = req.files?.image
      ? `/uploads/${req.files.image[0].filename}`
      : null;
    const videoFile = req.files?.video
      ? `/uploads/${req.files.video[0].filename}`
      : null;
    const audioFile = req.files?.audio
      ? `/uploads/${req.files.audio[0].filename}`
      : null;

    try {
      if (id) {
        await pool.query(
          "UPDATE questions SET text = ?, image = ?, video = ?, audio = ? WHERE id = ?",
          [text, imageFile, videoFile, audioFile, id]
        );

        let parsedAnswers: Answer[];

        if (typeof answers === "string") {
          try {
            parsedAnswers = JSON.parse(answers);
          } catch (error) {
            console.error("Error parsing answers:", error);
            throw new Error("Invalid JSON format for answers");
          }
        } else {
          parsedAnswers = answers;
        }

        for (const answer of parsedAnswers) {
          let isCorrect: number;

          if (typeof answer.isCorrect === "boolean") {
            isCorrect = answer.isCorrect ? 1 : 0;
          } else if (typeof answer.isCorrect === "string") {
            isCorrect =
              answer.isCorrect === "1" ||
              answer.isCorrect === "true"
                ? 1
                : 0;
          } else {
            isCorrect = answer.isCorrect ? 1 : 0;
          }

          await pool.query(
            "UPDATE answers SET text = ?, is_correct = ? WHERE id = ?",
            [answer.text, isCorrect, answer.id]
          );
        }

        res.status(200).json({ message: "Question saved successfully!" });
      } else {
        const [result] = await pool.query(
          "INSERT INTO questions (lesson_id, text, image, video, audio) VALUES (?, ?, ?, ?,?)",
          [lessonId, text, imageFile, videoFile, audioFile]
        );

        const questionId = (result as any).insertId;

        
        let parsedAnswers: Answer[];

        if (typeof answers === "string") {
          try {
            parsedAnswers = JSON.parse(answers);
          } catch (error) {
            console.error("Error parsing answers:", error);
            throw new Error("Invalid JSON format for answers");
          }
        } else {
          parsedAnswers = answers;
        }

        for (const answer of parsedAnswers) {
          let isCorrect: number;

          if (typeof answer.isCorrect === "boolean") {
            isCorrect = answer.isCorrect ? 1 : 0;
          } else if (typeof answer.isCorrect === "string") {
            isCorrect =
              answer.isCorrect === "1" ||
              answer.isCorrect === "true"
                ? 1
                : 0;
          } else {
            isCorrect = answer.isCorrect ? 1 : 0;
          }
          await pool.query(
            "INSERT INTO answers (question_id, text, is_correct) VALUES (?, ?, ?)",
            [questionId, answer.text, isCorrect]
          );
        }
        res.status(201).json({ message: "Question added successfully!" });
      }
    } catch (error) {
      console.error("Error inserting question", error);
      res.status(500).json({ message: "Error inserting question", error });
    }
  } else if (req.method === "DELETE") {
    const questionId = req.query.questionId;
    if (!questionId) {
      return res.status(400).json({ message: "Question ID is required." });
    }
    try {
      await pool.query("DELETE FROM questions WHERE id = ?", [questionId]);
      res.status(200).json({ message: "Question deleted successfully!" });
    } catch (error) {
      console.error("Error deleting question", error);
      res.status(500).json({ message: "Error deleting question", error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
