import ReactMarkdown from "react-markdown";
import { Link, useLocation } from "react-router-dom";

import Image from "../assets/bg.png";
import { Option, Questions } from "../types/question";

function Result() {
  const location = useLocation();
  const allAnswers = location.state.answers;
  const allQuestions: Questions[] = location.state.questions;
  const percentile = allAnswers.filter(
    (item: Option) => item?.is_correct
  ).length;

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
        {allQuestions?.map((item, key) => {
          const isCorrect = allAnswers[key]?.is_correct;
          return (
            <div
              key={key}
              className={
                isCorrect
                  ? "check-answer-box correct"
                  : "check-answer-box wrong"
              }
            >
              <div className="check-answer-top">
                <div className="check-texts">
                  <p className="check-answer-count">Question: {key + 1}</p>
                  <ReactMarkdown className="check-answer-question">
                    {item?.question?.description || ""}
                  </ReactMarkdown>
                </div>
                <div className="check-icon">
                  <i className={isCorrect ? "bi bi-check" : "bi bi-x"}></i>
                </div>
              </div>
              <div className="check-answer-bottom">
                <div className="answer-box">
                  <span className="answer-title">Your Answer</span>
                  <span className="answer-text">
                    {allAnswers[key]?.option_text}
                  </span>
                </div>
                <div className="answer-box">
                  <span className="answer-title">Correct Answer</span>
                  <span className="answer-text">
                    {item?.question?.options.map((ans) =>
                      ans.is_correct ? ans.option_text : null
                    )}
                  </span>
                </div>
                <div className="answer-box">
                  <span className="answer-title">Explanation</span>
                  <ReactMarkdown className="answer-text">
                    {item?.question?.explanation || ""}
                  </ReactMarkdown>
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
