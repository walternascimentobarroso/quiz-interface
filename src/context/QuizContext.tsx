import { createContext, useContext, useEffect, useState } from "react";

import { getQuestionsByCategory } from "../services/api";
import { ProviderProps, Questions, QuizContextType } from "../types/question";

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: ProviderProps) => {
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [category, setCategory] = useState<string>(""); // Categoria dinâmica

  const fetchQuestions = async (selectedCategory: string) => {
    try {
      const fetchedQuestions = await getQuestionsByCategory(selectedCategory);
      setQuestions(fetchedQuestions);
    } catch (error) {
      console.error("Erro ao carregar perguntas:", error);
    }
  };

  useEffect(() => {
    if (category) {
      fetchQuestions(category);
    }
  }, [category]);

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentQuestion,
        setCurrentQuestion,
        setCategory,
      }}
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
