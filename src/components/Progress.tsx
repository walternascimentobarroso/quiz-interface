import React from "react";

interface ProgressProps {
  currentQuestion: number;
  totalQuestions: number;
}

const Progress: React.FC<ProgressProps> = ({
  currentQuestion,
  totalQuestions,
}) => {
  return (
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
          style={
            {
              "--value": `${((currentQuestion + 1) / totalQuestions) * 100}%`,
            } as React.CSSProperties
          }
        >
          <span className="progress-big">{currentQuestion + 1}</span>
          <span className="progress-mini">/{totalQuestions}</span>
        </div>
        <p className="progress-detail">
          You solve the {currentQuestion + 1}. question out of a total of{" "}
          {totalQuestions} questions
        </p>
      </div>
    </div>
  );
};

export default Progress;
