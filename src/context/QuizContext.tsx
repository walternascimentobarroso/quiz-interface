import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { getQuestions } from "../services/api";

// Definindo os tipos para a estrutura das perguntas e respostas


interface Option {
  option_text: string;
  is_correct: boolean;
}

interface Question {
  description: string;
  explanation: string;
  difficulty: string;
  categories: string[];
  allow_multiple: boolean;
  options: Option[];
}

interface QuizContextType {
  questions: Question[];
  currentQuestion: number;
  setCurrentQuestion: (index: number) => void;
}

// Criando o contexto
const QuizContext = createContext<QuizContextType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export const QuizProvider = ({ children }: ProviderProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Busca perguntas ao carregar o contexto
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
    <QuizContext.Provider value={{ questions, currentQuestion, setCurrentQuestion }}>
      {children}
    </QuizContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuizContext deve ser usado dentro do QuizProvider");
  }
  return context;
};
