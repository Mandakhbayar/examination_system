import pool from "@/config/db";
import { validateToken } from "../../../config/api-middleware";
import { CustomNextApiRequest } from "../../../utils/types";
import { NextApiResponse } from "next";
import { DefaultStrings } from "../../../utils/strings";

const handler = async (req: CustomNextApiRequest, res: NextApiResponse) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, title, description, image_url FROM lessons"
    );
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: DefaultStrings.SERVER_INTERNAL_ERROR });
  }
  return res;
};

export default validateToken(handler);
