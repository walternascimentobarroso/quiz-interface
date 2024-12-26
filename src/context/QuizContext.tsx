import { createContext, useContext, useEffect, useState } from "react";

import { getQuestions } from "../services/api";
import { Questions, QuizContextType, ProviderProps } from "../types/question";

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: ProviderProps) => {
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const fetchedQuestions = await getQuestions();
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Erro ao carregar perguntas:", error);
      }
    })();
  }, []);

  return (
    <QuizContext.Provider
      value={{ questions, currentQuestion, setCurrentQuestion }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuizContext deve ser usado dentro do QuizProvider");
  }
  return context;
};
