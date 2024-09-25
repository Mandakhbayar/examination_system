import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/config/db";
import multer from "multer";
import fs from "fs";
import path from "path";
import { validateAdmin } from "@/config/api-middleware";
import { CustomNextApiRequest } from "@/utils/types";

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

const handler = async (
  req: CustomNextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "POST") {
    await runMiddleware(req, res, upload.fields([{ name: "image" }]));

    const { id, title, description, image_url } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Lesson title and description are required." });
    }

    const imageFile = req.files?.image
      ? `/uploads/${req.files.image[0].filename}`
      : image_url ?? null;

    try {
      if (id) {
        await pool.query(
          "UPDATE lessons SET title = ?, description = ?, image_url = ? WHERE id = ?",
          [title, description, imageFile, id]
        );

        res.status(200).json({ message: "Question saved successfully!" });
      } else {
        await pool.query(
          "INSERT INTO lessons (title, description, image_url) VALUES (?, ?, ?)",
          [title, description, imageFile]
        );

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
    res.setHeader("Allow", ["POST, DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default validateAdmin(handler);
