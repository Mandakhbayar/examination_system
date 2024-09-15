import { NextApiRequest } from "next";

export interface User {
  id: number;
  email: string;
  password: string;
}

export interface CustomNextApiRequest extends NextApiRequest {
  user?: {
    email: string;
    iat: number;
    exp: number;
  };
}
