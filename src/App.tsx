import React from "react";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import Error from "./components/Error";

import { Routes, Route } from "react-router-dom";

// Definindo o tipo da aplicação como componente funcional
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
}

export default App;
