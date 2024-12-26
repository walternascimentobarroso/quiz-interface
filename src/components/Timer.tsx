import React from "react";

import { TimerProps } from "../types/question";

const Timer: React.FC<TimerProps> = React.memo(({ time }) => {
  return (
    <div className="progress-circle time">
      <span className="time">{time}</span>
    </div>
  );
});

export default Timer;
