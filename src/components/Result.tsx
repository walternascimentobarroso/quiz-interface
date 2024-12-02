import React from "react";

interface ResultProps {
  score: number;
  totalQuestions: number;
}

const Result: React.FC<ResultProps> = ({ score, totalQuestions }) => {
  return (
    <div className="backdrop-blur-md bg-glassBg p-6 rounded-lg shadow-lg border border-glassBorder text-center">
      <h2 className="text-2xl font-bold text-white mb-4">Quiz Finalizado!</h2>
      <p className="text-lg text-white">
        Você acertou <span className="font-bold">{score}</span> de{" "}
        <span className="font-bold">{totalQuestions}</span> perguntas.
      </p>
    </div>
  );
};

export default Result;
