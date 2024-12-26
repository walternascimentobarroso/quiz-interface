import { ReactNode } from "react";

export interface Option {
  option_text: string;
  is_correct: boolean;
}

export interface Question {
  description: string;
  explanation: string;
  difficulty: string;
  categories: string[];
  allow_multiple: boolean;
  options: Option[];
}

export interface Questions {
  _id: string;
  question: Question;
}

export interface Categories {
  _id: string;
  name: string;
}

export interface QuizContextType {
  questions: Questions[];
  currentQuestion: number;
  setCurrentQuestion: (index: number) => void;
}

export interface TimerProps {
  time: number;
}
export interface ProviderProps {
  children: ReactNode;
}
