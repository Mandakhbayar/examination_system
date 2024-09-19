// pages/api/register.ts
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import pool from "@/config/db";
import { RowDataPacket } from "mysql2";
import { User } from "../../../utils/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const user = req.body as User;
    console.log("Database URL:", process.env.DATABASE_URL);

    if (!user.email || !user.password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    try {
      const [existingUser] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM users WHERE email = ?",
        [user.email]
      );
      if (existingUser.length > 0) {
        return res.status(409).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);
      const now = new Date();

      await pool.query(
        "INSERT INTO users (firstname, lastname, email, phone_number, password, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          user.firstname,
          user.lastname,
          user.email,
          user.phoneNumber,
          hashedPassword,
          "user",
          now,
          now,
        ]
      );

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server internal error", error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
