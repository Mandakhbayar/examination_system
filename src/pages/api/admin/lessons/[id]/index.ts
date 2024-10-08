import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/config/db";
import { Question } from "@/utils/types";
import { RowDataPacket } from "mysql2";
import { validateAdmin } from "@/config/api-middleware";

interface QueryRow {
  question_id: number;
  question_text?: string;
  question_image?: string;
  question_video?: string;
  question_audio?: string;
  answer_id: string;
  answer_text: string;
  is_correct: boolean;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const lessonId = req.query.id as string;
  if (req.method === "GET") {
    try {
      const [lessonRows] = await pool.query(
        "SELECT id, title, description, image_url FROM lessons WHERE id = ?",
        [lessonId]
      );

      if (
        !Array.isArray(lessonRows) ||
        lessonRows.length === 0 ||
        !lessonRows[0]
      ) {
        res.status(404).json({ error: "Lesson not found" });
        return;
      }

      const lesson = lessonRows[0];

      const [rows] = await pool.query<RowDataPacket[]>(
        `
      SELECT question.id AS question_id, question.text AS question_text, question.image AS question_image, 
          question.video AS question_video, question.audio AS question_audio,
          answer.id AS answer_id, answer.text AS answer_text, answer.is_correct
          FROM (
              SELECT q.id as id, q.text, q.image, q.video, q.audio
              FROM questions AS q
              WHERE q.lesson_id = ?
          ) AS question
          JOIN answers AS answer ON answer.question_id = question.id;
      `,
        [lessonId]
      );

      const questionsMap: { [key: number]: Question } = {};

      (rows as QueryRow[]).forEach((row: QueryRow) => {
        if (!questionsMap[row.question_id]) {
          questionsMap[row.question_id] = {
            id: row.question_id.toString(),
            text: row.question_text,
            image: row.question_image,
            video: row.question_video,
            audio: row.question_audio,
            answers: [],
          };
        }
        questionsMap[row.question_id].answers.push({
          id: row.answer_id,
          text: row.answer_text,
          isCorrect: row.is_correct,
        });
      });

      const questions = Object.values(questionsMap);
      res.status(200).json({ lesson: lesson, questions: questions });
    } catch (error) {
      console.error("Error fetching questions and answers:", error);
      res.status(500).json({ message: "Server error", error });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default validateAdmin(handler);
