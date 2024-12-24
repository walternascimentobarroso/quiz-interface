import React, { useState, useEffect } from "react";
import { useQuizContext } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";

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

const Quiz: React.FC = () => {
  const { questions, currentQuestion, setCurrentQuestion } = useQuizContext() as QuizContextType;
  const navigate = useNavigate();

  const [isNextButton, setIsNextButton] = useState<boolean>(false);
  const [isResultButton, setIsResultButton] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [selectedAnswers, setSelectedAnswers] = useState<Option[]>([]);
  const [time, setTime] = useState<number>(30);
  const [isErrorMessage, setIsErrorMessage] = useState<boolean>(false);
  const [isResult, setIsResult] = useState<boolean>(false);

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
      setTime(30);
      setIsNextButton(false);
      setCurrentQuestion(currentQuestion + 1);
      setSelectedIndex(null);
    }
  };

  const addAnswer = (index: number | null) => {
    const currentQuestionData = questions[currentQuestion];
    const selectedAnswer = currentQuestionData?.question.options[index as number];

    const newAnswers = [...selectedAnswers, selectedAnswer];
    setSelectedAnswers(newAnswers);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    if (time <= 5) {
      setIsErrorMessage(true);
    } else {
      setIsErrorMessage(false);
    }

    if (time < 0) {
      nextQuestion(null);
    }

    return () => clearInterval(timer);
  }, [time]);

  // Ensure currentQuestionData is valid before accessing its properties
  const currentQuestionData = questions[currentQuestion];
  console.log(currentQuestionData);
  // const options = currentQuestionData ? currentQuestionData.options : [];

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
      <div className="progress-box">
        <div className="progress-top">
          <div className="progress-texts">
            <h2 className="progress-title">Quiz Progress</h2>
            <p className="progress-description">You are solving the quiz</p>
          </div>
          <div className="progress-icon">
            <i className="bi bi-bar-chart"></i>
          </div>
        </div>
        <div className="progress-bottom">
          <div
            className="progress-circle"
            style={{
              "--value": `${(currentQuestion + 1) / questions.length * 100}%`,
            } as React.CSSProperties}
          >
            <span className="progress-big">{currentQuestion + 1}</span>
            <span className="progress-mini">/{questions.length}</span>
          </div>
          <p className="progress-detail">
            You solve the {currentQuestion + 1}. question out of a total of{" "}
            {questions.length} questions
          </p>
        </div>
      </div>

      <div className="question-box">
        {currentQuestionData && (
          <>
            <div className="question-text">
              <h2 className="question-title">Question: {currentQuestion + 1}</h2>
              <h3 className="question">{currentQuestionData?.question.description}</h3>
            </div>
            <div className="progress-circle time">
              <span className="time">{time}</span>
            </div>
          </>
        )}
      </div>

      <div className="answers-boxes">
        {questions[currentQuestion]?.question.options?.map((answer, index) => (
          <label
            onClick={() => selectAnswer(index)}
            key={index}
            htmlFor={index.toString()}
            className={selectedIndex === index ? "answer-label selected" : "answer-label"}
          >
            {answer.option_text}
            <input type="radio" name="answer" id={index.toString()} />
          </label>
        ))}
      </div>

      {isNextButton && (
        <div className="next">
          <button onClick={() => nextQuestion(selectedIndex)} className="next-btn">
            Next Question
            <div className="icon">
              <i className="bi bi-arrow-right"></i>
            </div>
          </button>
        </div>
      )}

      {isResultButton && (
        <div className="next">
          <button onClick={() => nextQuestion(selectedIndex)} className="next-btn result-btn">
            See Results
            <div className="icon">
              <i className="bi bi-bar-chart"></i>
            </div>
          </button>
        </div>
      )}

      {isErrorMessage && (
        <div className="message animation">
          <div className="icon">
            <i className="bi bi-exclamation-triangle"></i>
          </div>
          <span>You must hurry up!</span>
        </div>
      )}
    </div>
  );
};

export default Quiz;
