import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/config/db"; // Adjust path as necessary

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const [rows] = await pool.query(
      "SELECT id, title, description, image_url FROM lessons"
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch lessons" });
  }
}
