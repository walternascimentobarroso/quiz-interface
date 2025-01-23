import React from "react";

import { Option } from "../types/question";

type AnswerLabel = {
  answer: Option;
  index: number;
  selectedIndex: number | null;
  selectAnswer: (index: number) => void;
};

const AnswerLabel: React.FC<AnswerLabel> = React.memo(
  ({ answer, index, selectedIndex, selectAnswer }) => {
    return (
      <label
        onClick={() => selectAnswer(index)}
        htmlFor={index.toString()}
        className={
          selectedIndex === index ? "answer-label selected" : "answer-label"
        }
      >
        {answer.option_text}
        <input type="radio" className="invisible" name="answer" id={index.toString()} />
      </label>
    );
  }
);

export default AnswerLabel;
