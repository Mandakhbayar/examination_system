import { NextApiRequest } from "next";

export interface User {
  id?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  phone_number?: string;
  password?: string;
  confirmPassword?: string;
  role?: Role;
  created_at: string;
  updated_at: string;
}

export type Role = "user" | "admin";

export type AlertType = "success" | "error" | "warning" | "info";

export interface CustomNextApiRequest extends NextApiRequest {
  user?: User;
  files?: {
    [key: string]: Express.Multer.File[]; 
  };
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  image_url?: string;
}

export type Answer = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type Question = {
  id: string;
  text?: string;
  lesson_id?: string;
  image?: string;
  video?: string;
  audio?: string;
  answers: Answer[];
};

export type PageStatusType = "start" | "pending" | "finished";

export interface SelectedAnswer {
  questionId: string;
  answerId: string;
}

export type DialogType = "info" | "warning" | "error" | "success";

export type DialogDetailType = {
  type: DialogType;
  message: string;
  onClose?: () => void;
  onComplete?: () => void;
};

export type ButtonType = "default" | "success" | "next" | "black" | "white" | "danger";
