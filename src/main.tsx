import React from "react";

import { BrowserRouter } from "react-router-dom";

import ReactDOM from "react-dom/client";

import App from "./App";
import { QuizProvider } from "./context/QuizContext";

import "./index.css";
import "./assets/css/home.css";
import "./assets/css/quiz.css";
import "./assets/css/style.css";
import "./assets/css/result.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement
);

root.render(
  <BrowserRouter>
    <QuizProvider>
      <App />
    </QuizProvider>
  </BrowserRouter>
);
