import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FilterSection.css";

const FilterSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const quizzes = [
    {
      category: "Power",
      title: "Power Quiz",
      subtitle: "Explore the fundamentals of power systems.",
      image: "src/assets/power1.jpg",
      totalMCQs: 20,
    },
    {
      category: "Ministry",
      title: "Ministry Quiz",
      subtitle: "Understand the workings of various ministries.",
      image: "src/assets/ministry1.jpg",
      totalMCQs: 15,
    },
    {
      category: "Wapda",
      title: "Wapda Quiz",
      subtitle: "Learn about the water and power development authority.",
      image: "src/assets/wapda1.jpg",
      totalMCQs: 30,
    },
  ];

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowSuggestions(query.length > 0);
  };

  const filteredQuizzes = quizzes.filter(
    (quiz) =>
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="filter-section">
      <div className="header-container">
        <h2 className="search-heading">Find Your Quiz</h2>
        <input
          type="text"
          placeholder="Search quizzes..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
        {showSuggestions && (
          <div className="suggestions-box">
            {filteredQuizzes.length > 0 ? (
              filteredQuizzes.map((quiz, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => {
                    setSearchQuery(quiz.title);
                    setShowSuggestions(false);
                  }}
                >
                  {quiz.title}
                </div>
              ))
            ) : (
              <div className="no-suggestions">No matching quizzes found</div>
            )}
          </div>
        )}
      </div>

      <div className="quiz-grid">
        {filteredQuizzes.map((quiz, index) => (
          <div key={index} className="quiz-box">
            <img src={quiz.image} alt={quiz.title} />
            <p className="quiz-title">{quiz.title}</p>
            <p className="subtitle">{quiz.subtitle}</p>
            <div className="details">
              <span>
                <i className="fas fa-list-ul totalMCQs"></i> Total MCQs:{" "}
                {quiz.totalMCQs}
              </span>
              <span>
                <button
                  className="start-quiz-btn"
                  onClick={() => navigate(`/chapter-detail/${quiz.category}`)}
                >
                  Start Quiz
                </button>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FilterSection;
