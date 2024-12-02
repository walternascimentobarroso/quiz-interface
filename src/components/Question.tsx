import React from "react";
import { Option } from "../types/question";

interface QuestionProps {
  description: string;
  options: Option[];
  handleAnswer: (option: Option) => void;
}

const Question: React.FC<QuestionProps> = ({
  description,
  options,
  handleAnswer,
}) => {
  return (
    <div className="backdrop-blur-md bg-glassBg p-6 rounded-lg shadow-lg border border-glassBorder">
      <h2 className="text-xl font-bold text-white mb-4">{description}</h2>
      <div className="flex flex-col gap-3">
        {options.map((option, index) => (
          <button
            key={index}
            className="bg-white/30 hover:bg-white/40 text-white font-medium py-2 px-4 rounded-md transition-all"
            onClick={() => handleAnswer(option)}
          >
            {option.option_text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
