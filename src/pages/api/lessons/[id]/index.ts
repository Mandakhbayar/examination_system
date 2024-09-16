import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/config/db"; // Adjust path as necessary

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    const [lessonRows] = await pool.query(
      "SELECT id, title, description FROM lessons WHERE id = ?",
      [id]
    );

    if (!Array.isArray(lessonRows) || (lessonRows && lessonRows.length === 0)) {
      res.status(404).json({ error: "Lesson not found" });
      return;
    }

    const lesson = lessonRows[0];

    const [questionRows] = await pool.query(
      "SELECT id, text, answer FROM questions WHERE lesson_id = ?",
      [id]
    );

    res.status(200).json({ lesson, questions: questionRows });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch lesson details" });
  }
}
