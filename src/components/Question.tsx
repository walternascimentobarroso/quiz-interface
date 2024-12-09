import React from "react";

interface Option {
  option_text: string;
  is_correct: boolean;
}

interface QuestionData {
  description: string;
  options: Option[];
}

interface QuestionProps {
  question: QuestionData;
  onAnswer: (isCorrect: boolean) => void;
}

const Question: React.FC<QuestionProps> = ({ question, onAnswer }) => {
  return (
    <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-xl p-8 shadow-lg max-w-lg">
      <h2 className="text-2xl font-bold text-white mb-4">{question.description}</h2>
      <div className="flex flex-col gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            className="bg-white/30 hover:bg-white/40 text-white font-medium py-2 px-4 rounded-lg transition-all shadow-md"
            onClick={() => onAnswer(option.is_correct)}
          >
            {option.option_text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
