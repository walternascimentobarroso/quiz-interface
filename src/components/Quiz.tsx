import React, { useEffect, useState } from "react";
import { getQuestions } from "../services/api";
import Question from "./Question";

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getQuestions();
      setQuestions(data || []);
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowResult(true);
    }
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white text-lg">Nenhuma pergunta disponível no momento.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-900 to-purple-800">
      {showResult ? (
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-8 shadow-lg">
          <p className="text-white text-2xl font-bold">
            Você acertou {score} de {questions.length} perguntas!
          </p>
        </div>
      ) : (
        <Question
          question={questions[currentQuestionIndex].question}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
};

export default Quiz;
