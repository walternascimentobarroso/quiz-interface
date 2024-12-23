import { Link, useLocation } from "react-router-dom";
import Image from "../assets/bg.png";

// Tipos para as perguntas

interface Question {
  question: string;
  answers: { answer: string; trueAnswer: boolean }[];
}


function Result() {
  // Tipando o estado vindo da URL
  const location = useLocation();
  const allAnswers = location.state.answers;
  const allQuestions: Question[] = location.state.questions;

  let percentile = 0;

  // Calculando a quantidade de respostas corretas
  allAnswers.forEach((item: { answer: string; trueAnswer: boolean }) => {
    if (item.trueAnswer) {
      percentile += 1;
    }
  });

  return (
    <div className="result">
      <div className="result-box">
        <div className="result-bg">
          <span className="percentile">
            {Math.round((percentile / allQuestions.length) * 100)}%
          </span>
          <img src={Image} alt="result" />
        </div>
        <p className="result-detail">
          You answered {percentile} out of {allQuestions.length} questions
          correctly!
        </p>
        <Link to="/" className="new-quiz">
          Start a new quiz!
        </Link>
      </div>
      <h2 className="check-answers-title">Check Correct Answers</h2>
      <div className="check-answers-boxes">
        {allQuestions.map((item, key) => {
          return (
            <div
              key={key}
              className={
                allAnswers[key].trueAnswer
                  ? "check-answer-box correct"
                  : "check-answer-box wrong"
              }
            >
              <div className="check-answer-top">
                <div className="check-texts">
                  <p className="check-answer-count">Question: {key + 1}</p>
                  <h3 className="check-answer-question">{item.question}</h3>
                </div>
                <div className="check-icon">
                  <i
                    className={
                      allAnswers[key].trueAnswer ? "bi bi-check" : "bi bi-x"
                    }
                  ></i>
                </div>
              </div>
              <div className="check-answer-bottom">
                <div className="answer-box">
                  <span className="answer-title">Your Answer</span>
                  <span className="answer-text">{allAnswers[key].answer}</span>
                </div>
                <div className="answer-box">
                  <span className="answer-title">Correct Answer</span>
                  <span className="answer-text">
                    {item.answers.map((ans) => {
                      return ans.trueAnswer ? ans.answer : null;
                    })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Result;
