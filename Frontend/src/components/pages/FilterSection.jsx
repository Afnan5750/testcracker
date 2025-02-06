import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/FilterSection.css";

const FilterSectionSubject = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [mcqCounts, setMcqCounts] = useState({});
  const navigate = useNavigate();

  // Fetch quizzes and their total MCQs from the API
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/jobsubjects"
        );
        setQuizzes(response.data);

        // Fetch the total MCQs for each subject
        const mcqPromises = response.data.map(async (quiz) => {
          try {
            const mcqResponse = await axios.get(
              `http://localhost:5001/api/job-mcqs/${quiz.title}/total-mcqs`
            );
            return {
              title: quiz.title,
              totalMCQs: mcqResponse.data.totalJobMcqs,
            };
          } catch (error) {
            console.error(`Error fetching MCQs for ${quiz.title}:`, error);
            return { title: quiz.title, totalMCQs: "N/A" }; // Fallback in case of error
          }
        });

        const mcqData = await Promise.all(mcqPromises);

        // Store the total MCQs data
        const mcqCountMap = mcqData.reduce((acc, { title, totalMCQs }) => {
          acc[title] = totalMCQs;
          return acc;
        }, {});

        setMcqCounts(mcqCountMap); // Update state with the MCQ counts
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

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
            <img src={`http://localhost:5001/${quiz.image}`} alt={quiz.title} />
            <p className="quiz-title">{quiz.title}</p>
            <p className="subtitle">{quiz.subtitle}</p>
            <div className="details">
              <span>
                <i className="fas fa-list-ul totalMCQs"></i> Total MCQs:{" "}
                {mcqCounts[quiz.title] || "N/A"}
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

export default FilterSectionSubject;
