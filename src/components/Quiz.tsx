import React, { useState, useEffect } from "react";
import { useQuizContext } from "../context/QuizContext";
import { useNavigate, useParams } from "react-router-dom";

// Define the types for the quiz question and answer
interface Answer {
  answer: string;
  trueAnswer: boolean;
}

interface Question {
  question: string;
  answers: Answer[];
}

interface QuizContextType {
  questions: Record<string, Question[]>;
  currentQuestion: number;
  setCurrentQuestion: (index: number) => void;
}

const Quiz: React.FC = () => {
  const { level } = useParams<{ level: string }>();

  const navigate = useNavigate();

  const { questions, currentQuestion, setCurrentQuestion } =
    useQuizContext() as QuizContextType;

  const [isNextButton, setIsNextButton] = useState<boolean>(false);
  const [isResultButton, setIsResultButton] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([]);
  const [time, setTime] = useState<number>(30);
  const [isErrorMessage, setIsErrorMessage] = useState<boolean>(false);
  const [isResult, setIsResult] = useState<boolean>(false);

  const selectAnswer = (index: number) => {
    if (level && currentQuestion === questions[level].length - 1) {
      setIsNextButton(false);
      setIsResultButton(true);
    } else {
      setIsNextButton(true);
    }
    setSelectedIndex(index);
  };

  const nextQuestion = (index: number | null) => {
    if (level && currentQuestion >= questions[level].length - 1) {
      addAnswer(index);
      setCurrentQuestion(0);
      setIsResult(true);
    } else {
      setTime(30);
      setIsNextButton(false);
      addAnswer(index);
      setCurrentQuestion(currentQuestion + 1);
      setSelectedIndex(null); // Atribui null em vez de undefined
    }
  };
  

  const addAnswer = (index: number | null) => {
    const selectedAnswer =
      index !== null && level
        ? questions[level][currentQuestion].answers[index]
        : {
            answer: "Süre Bitti",
            trueAnswer: false,
          };
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

  // Handle the navigation logic outside of the return to avoid returning void
  useEffect(() => {
    if (isResult) {
      navigate("/result", {
        state: {
          answers: selectedAnswers,
          questions: level ? questions[level] : [],
        },
      });
    }
  }, [isResult, selectedAnswers, questions, level, navigate]);

  // The render part should now always return JSX
  return (
    <div>
      <div className="progress-box">
        <div className="progress-top">
          <div className="progress-texts">
            <h2 className="progress-title">Quiz Progress</h2>
            <p className="progress-description">
              You are solving {level} Level words quiz
            </p>
          </div>
          <div className="progress-icon">
            <i className="bi bi-bar-chart"></i>
          </div>
        </div>
        <div className="progress-bottom">
          <div
            className="progress-circle"
            aria-valuemin={0} // Alterado para número
            aria-valuemax={100} // Alterado para número
            style={
              {
                "--value": `${
                  level ? ((currentQuestion + 1) / questions[level].length) * 100 : 0
                }%`,
              } as React.CSSProperties
            } // Estilo com variável CSS
          >
            <span className="progress-big">{currentQuestion + 1}</span>
            <span className="progress-mini">/{level ? questions[level].length : 0}</span>
          </div>

          <p className="progress-detail">
            You solve the {currentQuestion + 1}. question out of a total of{" "}
            {level ? questions[level].length : 0} questions
          </p>
        </div>
      </div>
      <div className="question-box">
        <div className="question-text">
          <h2 className="question-title">Question: {currentQuestion + 1}</h2>
          <h3 className="question">
            {level && questions[level][currentQuestion].question}
          </h3>
        </div>
        <div
          className="progress-circle time"
          aria-valuemin={0}
          aria-valuemax={100}
          style={{ "--value": `${(time / 30) * 100}%` } as React.CSSProperties}
        >
          <span className="time">{time}</span>
        </div>
      </div>

      <div className="answers-boxes">
        {level && questions[level][currentQuestion].answers.map((answer, index) => {
          return (
            <label
              onClick={() => selectAnswer(index)}
              key={index}
              htmlFor={index.toString()}
              className={
                selectedIndex === index
                  ? "answer-label selected"
                  : "answer-label"
              }
            >
              {answer.answer}
              <input type="radio" name="answer" id={index.toString()} />
            </label>
          );
        })}
      </div>

      {isNextButton ? (
        <div className="next">
          <button
            onClick={() => nextQuestion(selectedIndex)}
            type="button"
            className="next-btn"
          >
            Next Question
            <div className="icon">
              <i className="bi bi-arrow-right"></i>
            </div>
          </button>
        </div>
      ) : null}

      {isResultButton ? (
        <div className="next">
          <button
            onClick={() => nextQuestion(selectedIndex)}
            type="button"
            className="next-btn result-btn"
          >
            See Results
            <div className="icon">
              <i className="bi bi-bar-chart"></i>
            </div>
          </button>
        </div>
      ) : null}

      {isErrorMessage ? (
        <div className="message animation">
          <div className="icon">
            <i className="bi bi-exclamation-triangle"></i>
          </div>
          <span>You must hurry up!</span>
        </div>
      ) : null}
    </div>
  );
};

export default Quiz;
