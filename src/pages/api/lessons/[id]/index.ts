import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/config/db";
import { Question } from "@/utils/types";
import { RowDataPacket } from "mysql2";

interface QueryRow {
  question_id: number;
  question_text: string;
  answer_id: number;
  answer_text: string;
  is_correct: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const lessonId = req.query.id as string;

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
      SELECT question.id AS question_id, question.question_text AS question_text,
          answer.id AS answer_id, answer.text AS answer_text, answer.is_correct
          FROM (
              SELECT q.id as id, q.text as question_text
              FROM questions AS q
              WHERE q.lesson_id = ?
              ORDER BY RAND()
              LIMIT 10
          ) AS question
          JOIN answers AS answer ON answer.question_id = question.id
          ORDER BY RAND();
      `,
      [lessonId]
    );

    const questionsMap: { [key: number]: Question } = {};
    if (!Array.isArray(rows) || rows.length === 0) {
      res.status(404).json({ error: "Question not found" });
      return;
    }

    (rows as QueryRow[]).forEach((row: QueryRow) => {
      if (!questionsMap[row.question_id]) {
        questionsMap[row.question_id] = {
          id: row.question_id,
          text: row.question_text,
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
  return res;
}
