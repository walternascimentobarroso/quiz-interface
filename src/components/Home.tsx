import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="intro-box">
        <div className="intro-texts">
          <h1 className="intro-title">English Vocabulary Quizzes</h1>
          <p className="intro-description">Choose the quiz you want to solve</p>
        </div>
        <div className="intro-icon">
          <i className="bi bi-question-circle"></i>
        </div>
      </div>

      <div className="level-boxes">
        {["A1", "A2", "B1", "B2", "C1", "C2"].map((level) => (
          <div className="level-box" key={level}>
            <div className="level-text">
              <h2 className="level-name">{level}</h2>
              <span>Level</span>
            </div>
            <Link className="level-link" to={`/quiz/${level}`}>
              <span>Start Quiz</span> <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
