import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { Categories } from "../types/question";
import { getCategories } from "../services/api";

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Categories[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    })();
  }, []);

  return (
    <div className="home">
      <div className="intro-box">
        <div className="intro-texts">
          <h1 className="intro-title">English Vocabulary Quizzes</h1>
          <p className="intro-description">Choose the quiz you want to solve</p>
        </div>
        <div className="intro-icon">
          <i className="bi bi-question-circle"></i>
        </div>
      </div>

      <div className="level-boxes">
        {/* Alteração: agora mapeamos diretamente sobre o array de objetos com _id e name */}
        {categories.map((category) => (
          <div className="level-box" key={category._id}>
            <div className="level-text">
              <h2 className="level-name">{category.name}</h2>
            </div>
            <Link className="level-link" to={`/quiz/${category.name}`}>
              <span>Start Quiz</span> <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
