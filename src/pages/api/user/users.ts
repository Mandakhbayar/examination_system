import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/config/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const [rows] = await pool.query("SELECT * FROM users");
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
