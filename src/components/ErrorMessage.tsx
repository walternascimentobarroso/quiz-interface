import React from "react";

const ErrorMessage: React.FC = () => {
  return (
    <div className="message animation">
      <div className="icon">
        <i className="bi bi-exclamation-triangle"></i>
      </div>
      <span>You must hurry up!</span>
    </div>
  );
};

export default ErrorMessage;
