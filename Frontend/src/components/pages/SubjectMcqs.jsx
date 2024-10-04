import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios"; // Import Axios
import "../styles/Mcqs.css";

const UNAUTHORIZED_ATTEMPT_LIMIT = "mcqs.length";

const SubjectMcqs = () => {
  const { category, chapterNumber } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedAnswer, setRevealedAnswer] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const { isAuthenticated } = useAuth();
  const [unauthorizedAttempts, setUnauthorizedAttempts] = useState(0);
  const [mcqs, setMcqs] = useState([]); // State to hold MCQs
  const navigate = useNavigate();

  // Normalize category to match API keys
  const normalizedCategory =
    category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

  useEffect(() => {
    const fetchMcqs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/mcqs/${normalizedCategory}/${chapterNumber}`
        );
        setMcqs(response.data); // Set the fetched MCQs
      } catch (error) {
        console.error("Error fetching MCQs:", error);
      }
    };

    fetchMcqs();
  }, [normalizedCategory, chapterNumber]);

  const handleRevealAnswer = () => {
    setRevealedAnswer(!revealedAnswer);
  };

  const handleNextQuestion = () => {
    if (
      !isAuthenticated &&
      unauthorizedAttempts >= UNAUTHORIZED_ATTEMPT_LIMIT
    ) {
      return; // Prevent advancing to the next question until user is authenticated
    }
    setRevealedAnswer(false);
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [currentIndex]: selectedOptions[currentIndex],
    }));
    if (currentIndex < mcqs.length - 1) {
      if (
        !isAuthenticated &&
        unauthorizedAttempts < UNAUTHORIZED_ATTEMPT_LIMIT
      ) {
        setUnauthorizedAttempts(unauthorizedAttempts + 1);
      }
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBackQuestion = () => {
    setRevealedAnswer(false);
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [currentIndex]: selectedOptions[currentIndex],
    }));
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleOptionClick = (option) => {
    if (!isAuthenticated && unauthorizedAttempts >= UNAUTHORIZED_ATTEMPT_LIMIT)
      return;

    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [currentIndex]: option,
    }));
  };

  const handleSignInClick = () => {
    navigate("/login");
  };

  return (
    <section className="mcqs">
      <h1>
        {normalizedCategory} Chapter {chapterNumber} MCQs
      </h1>
      <div className="question-status-container">
        <div className="question-status">
          Question {currentIndex + 1} / {mcqs.length}
        </div>
      </div>

      {mcqs.length > 0 && (
        <div className="mcq-container">
          <div
            className={`mcq-item ${
              unauthorizedAttempts >= UNAUTHORIZED_ATTEMPT_LIMIT &&
              !isAuthenticated
                ? "blurred"
                : ""
            }`}
          >
            <p className="question">{mcqs[currentIndex].question}</p>
            <ul className="options-list">
              {mcqs[currentIndex].options.map((option, i) => {
                let optionClass = "";
                const selectedOption = selectedOptions[currentIndex];
                if (revealedAnswer && option.isCorrect) {
                  optionClass = "correct-answer";
                } else if (
                  selectedOption &&
                  selectedOption.text === option.text
                ) {
                  optionClass = option.isCorrect
                    ? "correct-answer"
                    : "incorrect-answer";
                }
                return (
                  <li
                    key={i}
                    className={`option ${optionClass}`}
                    onClick={() => handleOptionClick(option)}
                    style={{
                      cursor: selectedOption ? "not-allowed" : "pointer",
                    }}
                    aria-label={option.text}
                  >
                    {option.text}
                  </li>
                );
              })}
            </ul>
            <div className="button-container">
              <button
                className="back-question-btn"
                onClick={handleBackQuestion}
                disabled={currentIndex === 0}
                aria-label="Previous question"
              >
                Back
              </button>

              <button
                className="reveal-answer-btn"
                onClick={handleRevealAnswer}
                aria-label={revealedAnswer ? "Hide answer" : "Show answer"}
              >
                {revealedAnswer ? "Hide Answer" : "Show Answer"}
              </button>

              <button
                className="next-question-btn"
                onClick={handleNextQuestion}
                disabled={currentIndex >= mcqs.length - 1}
                aria-label="Next question"
              >
                Next
              </button>
            </div>

            {revealedAnswer && (
              <p className="answer">
                {/* Correct Answer:{" "}
                <strong>
                  {
                    mcqs[currentIndex].options.find((opt) => opt.isCorrect)
                      ?.text
                  }
                </strong> */}
                Explanation:{" "}
                <strong>
                  <p className="explanation">
                    {mcqs[currentIndex].explanation}
                  </p>
                </strong>
              </p>
            )}
          </div>

          {!isAuthenticated &&
            unauthorizedAttempts >= UNAUTHORIZED_ATTEMPT_LIMIT && (
              <div className="sign-in-container">
                <h4 className="sign-in-prompt">Please sign in to continue.</h4>
                <button className="sign-in-btn" onClick={handleSignInClick}>
                  Sign In
                </button>
              </div>
            )}
        </div>
      )}

      {mcqs.length === 0 && <p>No MCQs available for this chapter.</p>}
    </section>
  );
};

export default SubjectMcqs;
