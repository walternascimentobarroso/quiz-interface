import React from "react";
import "./App.css";
import Quiz from "./components/Quiz";

const App: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md">
        <Quiz />
      </div>
    </div>
  );
};

export default App;
