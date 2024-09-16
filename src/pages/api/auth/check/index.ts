import { NextApiResponse } from "next";
import { validateToken } from "@/config/api-middleware";
import { CustomNextApiRequest } from "@/utils/types";

const handler = (req: CustomNextApiRequest, res: NextApiResponse) => {
  const user = req.user;
  if (user) {
    res.status(200).json({ user: user });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default validateToken(handler);
