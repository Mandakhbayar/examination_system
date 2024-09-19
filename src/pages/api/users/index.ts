import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/config/db";
import { RowDataPacket } from "mysql2";
import { validateAdmin } from "../../../config/api-middleware";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page as string, 10) ?? 1;
    const limitNumber = parseInt(limit as string, 10) ?? 10;

    try {
      const offset = (pageNumber - 1) * limitNumber;

      // Fetch users with pagination
      const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT id, firstname, lastname, email, phone_number FROM users LIMIT ? OFFSET ?",
        [limitNumber, offset]
      );

      const [[{ count }]] = await pool.query<RowDataPacket[]>(
        "SELECT COUNT(*) AS count FROM users"
      );

      res.status(200).json({ users: rows, total: count });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default validateAdmin(handler);
