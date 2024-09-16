import { NextApiRequest } from "next";

export interface User {
  id: number;
  email: string;
  password: string;
}

export type AlertType = "success" | "error" | "warning" | "info";

export interface CustomNextApiRequest extends NextApiRequest {
  user?: {
    email: string;
    iat: number;
    exp: number;
  };
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  image_url: string;
}
