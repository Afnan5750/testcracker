import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import "../styles/Mcqs.css";

const UNAUTHORIZED_ATTEMPT_LIMIT = "Mcqs.length";

const Mcqs = () => {
  const { category, chapterNumber } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedAnswer, setRevealedAnswer] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const { isAuthenticated } = useAuth();
  const [unauthorizedAttempts, setUnauthorizedAttempts] = useState(0);
  const [mcqs, setMcqs] = useState([]);
  const [error, setError] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchMCQs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/job-mcqs/${category}/${chapterNumber}`
        );
        setMcqs(response.data);
      } catch (error) {
        console.error("Error fetching MCQs:", error);
        setError("Failed to fetch MCQs.");
      }
    };

    fetchMCQs();
  }, [category, chapterNumber]);

  const handleRevealAnswer = () => {
    setRevealedAnswer(!revealedAnswer);
  };

  const handleNextQuestion = () => {
    if (
      !isAuthenticated &&
      unauthorizedAttempts >= UNAUTHORIZED_ATTEMPT_LIMIT
    ) {
      return;
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

    if (currentIndex === mcqs.length - 1 && option) {
      setShowResult(true);
    }
  };

  const handleShowResult = () => {
    const score = Object.values(selectedOptions).filter(
      (selectedOption, index) => selectedOption.isCorrect
    ).length;

    setScore(score); // Set the score
    setIsResultVisible(true); // Show the result modal
  };

  const handleSignInClick = () => {
    navigate("/login");
  };

  const renderMCQ = () => {
    if (error) return <p>{error}</p>;
    if (mcqs.length === 0) return <p>No MCQs available.</p>;

    const mcq = mcqs[currentIndex];

    return (
      <div
        className={`mcq-item ${
          unauthorizedAttempts >= UNAUTHORIZED_ATTEMPT_LIMIT && !isAuthenticated
            ? "blurred"
            : ""
        }`}
      >
        <div className="question-status-container">
          <div className="question-status">
            Question {currentIndex + 1} of {mcqs.length}
          </div>
        </div>
        <h2 className="question">{mcq.question}</h2>
        <ul className="options-list">
          {mcq.options.map((option, index) => {
            let optionClass = "";
            const selectedOption = selectedOptions[currentIndex];
            if (revealedAnswer && option.isCorrect) {
              optionClass = "correct-answer";
            } else if (selectedOption && selectedOption.text === option.text) {
              optionClass = option.isCorrect
                ? "correct-answer"
                : "incorrect-answer";
            }
            return (
              <li
                key={index}
                className={`option ${optionClass}`}
                onClick={() => {
                  if (!selectedOption) {
                    handleOptionClick(option); // Only allow if no option is selected
                  }
                }}
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

          {currentIndex === mcqs.length - 1 ? (
            <button
              className="result-btn"
              onClick={handleShowResult}
              disabled={!selectedOptions[currentIndex]}
              aria-label="Show result"
            >
              Result
            </button>
          ) : (
            <button
              className="next-question-btn"
              onClick={handleNextQuestion}
              disabled={currentIndex >= mcqs.length - 1}
              aria-label="Next question"
            >
              Next
            </button>
          )}
        </div>

        {revealedAnswer && (
          <p className="answer">
            Explanation:{" "}
            <strong>
              <p className="explanation">{mcq.explanation}</p>
            </strong>
          </p>
        )}
      </div>
    );
  };

  return (
    <section className="mcqs">
      <h1>
        {category} Chapter {chapterNumber} MCQs
      </h1>
      {renderMCQ()}
      {!isAuthenticated &&
        unauthorizedAttempts >= UNAUTHORIZED_ATTEMPT_LIMIT && (
          <div className="sign-in-container">
            <h4 className="sign-in-prompt">Please sign in to continue.</h4>
            <button className="sign-in-btn" onClick={handleSignInClick}>
              Sign In
            </button>
          </div>
        )}
      {isResultVisible && (
        <div className="result-modal">
          <div className="modal-content">
            <button
              className="close-btn"
              onClick={() => setIsResultVisible(false)}
              aria-label="Close modal"
            >
              <span className="close-icon">&times;</span>
            </button>
            <h2 className="score-heading">
              Your Score: {score} / {mcqs.length}
            </h2>
            <p className="score-message">
              Well done! You've completed the quiz.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Mcqs;
