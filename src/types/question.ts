export interface Option {
  option_text: string;
  is_correct: boolean;
}

export interface Question {
  uuid: string;
  description: string;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  categories: string[];
  allow_multiple: boolean;
  options: Option[];
}
