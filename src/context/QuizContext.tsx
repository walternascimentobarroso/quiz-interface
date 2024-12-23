import React, { createContext, useContext, useState, ReactNode } from "react";

// Definindo os tipos para a estrutura das perguntas e respostas
interface Answer {
  answer: string;
  trueAnswer: boolean;
}

interface Question {
  id: number;
  question: string;
  answers: Answer[];
}

interface QuizContextType {
  questions: Record<string, Question[]>;
  currentQuestion: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
}

// Criando o contexto com o tipo definido
const QuizContext = createContext<QuizContextType | undefined>(undefined);

// Definindo os tipos para o Provider
interface ProviderProps {
  children: ReactNode;
}

function Provider({ children }: ProviderProps) {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  const questions: Record<string, Question[]> = {
    A1: [
      {
        id: 1,
        question: "What does 'happy' mean?",
        answers: [
          { answer: "Üzgün", trueAnswer: false },
          { answer: "Sinirli", trueAnswer: false },
          { answer: "Mutlu", trueAnswer: true },
          { answer: "Sıkıcı", trueAnswer: false },
        ],
      },
      {
        id: 2,
        question: "What does 'book' mean?",
        answers: [
          { answer: "Telefon", trueAnswer: false },
          { answer: "Anahtar", trueAnswer: false },
          { answer: "Kitap", trueAnswer: true },
          { answer: "Kalem", trueAnswer: false },
        ],
      },
      {
        id: 3,
        question: "What does 'hot' mean?",
        answers: [
          { answer: "Soğuk", trueAnswer: false },
          { answer: "Sıcak", trueAnswer: true },
          { answer: "Nemli", trueAnswer: false },
          { answer: "Kuru", trueAnswer: false },
        ],
      },
    ],
  };

  const sharedValuesAndMethods = {
    questions,
    currentQuestion,
    setCurrentQuestion,
  };

  return (
    <QuizContext.Provider value={sharedValuesAndMethods}>
      {children}
    </QuizContext.Provider>
  );
}

// Hook para acessar o contexto
const useQuizContext = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuizContext must be used within a Provider");
  }
  return context;
};

export { Provider, useQuizContext };
export default QuizContext;
