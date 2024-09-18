// lib/middleware.ts
import { NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import { CustomNextApiRequest } from "../utils/types";
import { Constants } from "../utils/constants";

export const validateToken = (
  handler: (req: CustomNextApiRequest, res: NextApiResponse) => void
) => {
  return async (req: CustomNextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      console.log("TOKEN>>>S", token);
      return res.status(401).json({ message: "No token provided" });
    }

    console.log("TOKEN>>>END", token);
    try {
      const decoded = verify(token, Constants.SECRET_KEY) as {
        email: string;
        iat: number;
        exp: number;
      };
      req.user = decoded;
      return handler(req, res);
    } catch (err) {
      console.log("ERROR>>", err);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};
