import React, { useEffect, useState } from "react";

import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";

import Timer from "./Timer";
import Progress from "./Progress";
import NextButton from "./NextButton";
import AnswerLabel from "./AnswerLabel";
import ErrorMessage from "./ErrorMessage";
import { useTimer } from "../hooks/useTimer";
import { useQuizContext } from "../context/QuizContext";
import { Option, QuizContextType } from "../types/question";

const Quiz: React.FC = () => {
  const { category } = useParams();
  const { setCategory, questions, currentQuestion, setCurrentQuestion } =
    useQuizContext() as QuizContextType;
  const navigate = useNavigate();

  const [isNextButton, setIsNextButton] = useState<boolean>(false);
  const [isResultButton, setIsResultButton] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [selectedAnswers, setSelectedAnswers] = useState<Option[]>([]);
  const { time, resetTimer } = useTimer({
    initialTime: 30,
    onTimeEnd: () => nextQuestion(null),
  });

  const [isErrorMessage, setIsErrorMessage] = useState<boolean>(false);
  const [isResult, setIsResult] = useState<boolean>(false);

  useEffect(() => {
    if (category) {
      setCategory(category);
    }
  }, [category, setCategory]);

  const selectAnswer = (index: number) => {
    if (currentQuestion >= questions.length - 1) {
      setIsNextButton(false);
      setIsResultButton(true);
    } else {
      setIsNextButton(true);
    }
    setSelectedIndex(index);
  };

  const nextQuestion = (index: number | null) => {
    addAnswer(index);

    if (currentQuestion >= questions.length - 1) {
      setIsResult(true);
      setCurrentQuestion(0);
    } else {
      resetTimer();
      setIsNextButton(false);
      setCurrentQuestion(currentQuestion + 1);
      setSelectedIndex(null);
    }
  };

  const addAnswer = (index: number | null) => {
    const currentQuestionData = questions[currentQuestion];
    const selectedAnswer =
      currentQuestionData?.question.options[index as number];

    const newAnswers = [...selectedAnswers, selectedAnswer];
    setSelectedAnswers(newAnswers);
  };

  useEffect(() => setIsErrorMessage(time <= 5), [time]);

  useEffect(() => {
    if (isResult) {
      navigate("/result", {
        state: {
          answers: selectedAnswers,
          questions: questions,
        },
      });
    }
  }, [isResult, selectedAnswers, questions, navigate]);

  return (
    <div>
      <Progress
        currentQuestion={currentQuestion}
        totalQuestions={questions.length}
      />

      <div className="question-box">
        {questions[currentQuestion] && (
          <>
            <div className="question-text">
              <h2 className="question-title">
                Question: {currentQuestion + 1}
              </h2>
              <ReactMarkdown>
                {questions[currentQuestion]?.question.description || ""}
              </ReactMarkdown>
            </div>
            <Timer time={time} />
          </>
        )}
      </div>

      <div className="answers-boxes">
        {questions[currentQuestion]?.question.options?.map(
          (answer: Option, index: number) => (
            <AnswerLabel
              key={index}
              answer={answer}
              index={index}
              selectedIndex={selectedIndex}
              selectAnswer={selectAnswer}
            />
          )
        )}
      </div>

      {isNextButton && (
        <NextButton
          label="Next Question"
          icon="bi-arrow-right"
          onClick={() => nextQuestion(selectedIndex)}
        />
      )}

      {isResultButton && (
        <NextButton
          label="See Results"
          icon="bi-bar-chart"
          onClick={() => nextQuestion(selectedIndex)}
          extraClass="result-btn"
        />
      )}

      {isErrorMessage && <ErrorMessage />}
    </div>
  );
};

export default Quiz;
