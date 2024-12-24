import { Link, useLocation } from "react-router-dom";
import Image from "../assets/bg.png";

// Tipos para as perguntas
interface Answer {
  option_text: string;
  is_correct: boolean;
}

interface Question {
  question: string;
  answers: Answer[];
  explanation: string;
}

function Result() {
  const location = useLocation();
  const allAnswers = location.state.answers;
  const allQuestions: Question[] = location.state.questions;

  console.log(allAnswers);
  console.log(allQuestions);

  let percentile = 0;

  allAnswers.forEach((item: Answer) => {
    if (item.is_correct) {
      percentile += 1;
    }
  });

  return (
    <div className="result">
      <div className="result-box">
        <div className="result-bg">
          <span className="percentile">{Math.round((percentile / allQuestions.length) * 100)}%</span>
          <img src={Image} alt="result" />
        </div>
        <p className="result-detail">
          You answered {percentile} out of {allQuestions.length} questions correctly!
        </p>
        <Link to="/" className="new-quiz">Start a new quiz!</Link>
      </div>

      <h2 className="check-answers-title">Check Correct Answers</h2>
      <div className="check-answers-boxes">
        {allQuestions?.map((item, key) => {
          console.log('itemç', item);
          const isCorrect = allAnswers[key]?.is_correct;
          console.log('itemç', isCorrect);
          console.log('itemç', allAnswers[key]);
          return (
            <div key={key} className={isCorrect ? "check-answer-box correct" : "check-answer-box wrong"}>
              <div className="check-answer-top">
                <div className="check-texts">
                  <p className="check-answer-count">Question: {key + 1}</p>
                  <h3 className="check-answer-question">{item?.question?.description}</h3>
                </div>
                <div className="check-icon">
                  <i className={isCorrect ? "bi bi-check" : "bi bi-x"}></i>
                </div>
              </div>
              <div className="check-answer-bottom">
                <div className="answer-box">
                  <span className="answer-title">Your Answer</span>
                  <span className="answer-text">{allAnswers[key].option_text}</span>
                </div>
                <div className="answer-box">
                  <span className="answer-title">Correct Answer</span>
                  <span className="answer-text">
                    {item?.question?.options.map(ans => ans.is_correct ? ans.option_text : null)}
                  </span>
                </div>
                <div className="answer-box">
                  <span className="answer-title">Explanation</span>
                  <span className="answer-text">{item?.question?.explanation}</span>
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
