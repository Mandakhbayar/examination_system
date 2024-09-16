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
    // Query to get 10 random questions and 4 random answers for each
    const [rows] = await pool.query<RowDataPacket[]>(
      `
      SELECT q.id AS question_id, q.text AS question_text,
             a.id AS answer_id, a.text AS answer_text, a.is_correct
      FROM (
          SELECT id
          FROM questions
          ORDER BY RAND()
          LIMIT 10
      ) q
      JOIN (
          SELECT a.id, a.question_id, a.text, a.is_correct
          FROM answers a
          JOIN (
              SELECT id AS question_id
              FROM questions
              ORDER BY RAND()
              LIMIT 10
          ) AS temp
          ON a.question_id = temp.question_id
          ORDER BY a.question_id, RAND()
      ) a ON q.id = a.question_id
      GROUP BY q.id, a.id
      HAVING COUNT(a.id) <= 4
      ORDER BY q.id, a.id;
      `
    );

    const questionsMap: { [key: number]: Question } = {};
    if (!Array.isArray(rows) || rows.length === 0) {
      res.status(404).json({ error: "Lesson not found" });
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
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions and answers:", error);
    res.status(500).json({ message: "Server error", error });
  }
  return res;
}
