import React from "react";

import { Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Error from "./components/Error";
import Result from "./components/Result";

const App: React.FC = () => {
  return (
    <div className="app-container">
      <div className="quiz-box">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz/:level" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
