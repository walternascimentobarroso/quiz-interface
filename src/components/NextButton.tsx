import React from "react";

interface NextButtonProps {
  label: string;
  icon: string;
  onClick: () => void;
  extraClass?: string;
}

const NextButton: React.FC<NextButtonProps> = ({ label, icon, onClick, extraClass = "" }) => {
  return (
    <div className="next">
      <button onClick={onClick} className={`next-btn ${extraClass}`}>
        {label}
        <div className="icon">
          <i className={`bi ${icon}`}></i>
        </div>
      </button>
    </div>
  );
};

export default NextButton;
