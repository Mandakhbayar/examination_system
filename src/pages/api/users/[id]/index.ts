import type { NextApiRequest, NextApiResponse } from "next";
import pool from "@/config/db";
import { RowDataPacket } from "mysql2";
import { validateAdmin } from "../../../../config/api-middleware";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (typeof id !== "string")
    return res.status(400).json({ message: "Invalid user ID" });

  if (req.method === "GET") {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT id, firstname, lastname, email, phoneNumber FROM users WHERE id = ?",
        [id]
      );
      if (rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(rows[0]);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  } else if (req.method === "PUT") {
    const { firstname, lastname, email, phoneNumber, password } = req.body;

    if (!firstname || !lastname || !email || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const now = new Date();
      await pool.query(
        "UPDATE users SET firstname = ?, lastname = ?, email = ?, phoneNumber = ?, password = ?, updated_at = ? WHERE id = ?",
        [firstname, lastname, email, phoneNumber, password, now, id]
      );
      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default validateAdmin(handler);
