import React, { useEffect, useState } from "react";
import { getQuestions } from "../services/api";
import { Question as QuestionType } from "../types/question";
import Question from "./Question";
import Result from "./Result";

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getQuestions();
      setQuestions(data);
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (option: { is_correct: boolean }) => {
    if (option.is_correct) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  if (questions.length === 0) {
    return <p className="text-white">Carregando perguntas...</p>;
  }

  return (
    <div className="flex justify-center items-center">
      {showResult ? (
        <Result score={score} totalQuestions={questions.length} />
      ) : (
        <Question
          description={questions[currentQuestionIndex].description}
          options={questions[currentQuestionIndex].options}
          handleAnswer={handleAnswer}
        />
      )}
    </div>
  );
};

export default Quiz;
