import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/style.css";
import "./assets/css/result.css";
import "./assets/css/home.css";
import "./assets/css/quiz.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QuizProvider } from "./context/QuizContext";

// Definindo o tipo de root como HTMLDivElement
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement);

root.render(
  <BrowserRouter>
    <QuizProvider>
      <App />
    </QuizProvider>
  </BrowserRouter>
);
