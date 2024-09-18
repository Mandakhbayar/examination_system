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

export type Answer = {
  id: number;
  text: string;
  isCorrect: boolean;
};

export type Question = {
  id: number;
  text: string;
  answers: Answer[];
};

export type PageStatusType = "start" | "pending" | "finished";

export interface SelectedAnswer {
  questionId: number;
  answerId: number;
}

export type DialogType = "info" | "warning" | "error" | "success";

export type DialogDetailType = {
  type: DialogType;
  message: string;
  onClose: () => void;
  onComplete?: () => void;
};
