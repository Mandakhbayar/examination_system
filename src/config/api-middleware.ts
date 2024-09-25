// lib/middleware.ts
import { NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import { CustomNextApiRequest, User } from "../utils/types";
import { Constants } from "../utils/constants";
import { RowDataPacket } from "mysql2";
import pool from "./db";

export const validateToken = (
  handler: (req: CustomNextApiRequest, res: NextApiResponse) => void
) => {
  return async (req: CustomNextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    try {
      const decoded = verify(token, Constants.SECRET_KEY) as {
        email: string;
        iat: number;
        exp: number;
      };
      const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT id, email, role FROM users WHERE email = ?",
        [decoded.email]
      );
      if (!rows || rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      req.user = rows[0] as User;
      return handler(req, res);
    } catch (err) {
      console.log("ERROR>>", err);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

export const validateAdmin = (
  handler: (
    req: CustomNextApiRequest,
    res: NextApiResponse
  ) => void
) => {
  return async (
    req: CustomNextApiRequest,
    res: NextApiResponse
  ) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    try {
      const decoded = verify(token, Constants.SECRET_KEY) as {
        email: string;
        iat: number;
        exp: number;
      };
      const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT id, email, role FROM users WHERE email = ?",
        [decoded.email]
      );
      if (!rows || rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      if (!rows[0].role || rows[0].role != "admin") {
        return res.status(403).json({ message: "Permission denied" });
      }
      req.user = rows[0] as User;
      return handler(req, res);
    } catch (err) {
      console.log("ERROR>>", err);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};
