// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import pool from "@/config/db";
import { User } from "../../../utils/types";
import { RowDataPacket } from "mysql2";
import { Constants } from "../../../utils/constants";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      const user = rows[0] as User;

      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const token = jwt.sign({ email }, Constants.ACCESS_TOKEN_KEY);
        res
          .status(200)
          .json({ message: "Login successful", user: user, token: token });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server internal error", error });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
