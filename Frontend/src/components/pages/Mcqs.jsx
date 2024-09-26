import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import mcqsData from "../../data/mcqs.json";
import "../styles/Mcqs.css";

const UNAUTHORIZED_ATTEMPT_LIMIT = "mcqs.length"; // If want set limit for unauthorized user then simple write how many number of question cam user attempt. If you want unauthorized user solve only 5 question then simple write 5 Instead of "mcqs.length". Like const UNAUTHORIZED_ATTEMPT_LIMIT = 5;

const Mcqs = () => {
  const { category, chapterNumber } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedAnswer, setRevealedAnswer] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const { isAuthenticated } = useAuth();
  const [unauthorizedAttempts, setUnauthorizedAttempts] = useState(0);
  const navigate = useNavigate();

  const mcqs = mcqsData[category]?.[chapterNumber] || [];

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
        {category} Chapter {chapterNumber} MCQs
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
                  selectedOption.option === option.option
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
                    {option.option}. {option.text}
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
                Correct Answer:{" "}
                <strong>
                  {
                    mcqs[currentIndex].options.find((opt) => opt.isCorrect)
                      ?.option
                  }
                  .{" "}
                  {
                    mcqs[currentIndex].options.find((opt) => opt.isCorrect)
                      ?.text
                  }
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

export default Mcqs;
