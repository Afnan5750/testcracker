import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/Mcqs.css";

const Mcqs = () => {
  const { category, chapterNumber } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current question
  const [revealedAnswer, setRevealedAnswer] = useState(null);

  // Example data; replace with your actual data
  const data = {
    Power: {
      1: [
        {
          question: "What is the unit of electrical power?",
          options: [
            { option: "A", text: "Watt", isCorrect: true },
            { option: "B", text: "Volt", isCorrect: false },
            { option: "C", text: "Ampere", isCorrect: false },
            { option: "D", text: "Ohm", isCorrect: false },
          ],
        },
        {
          question: "What is Ohm's Law formula?",
          options: [
            { option: "A", text: "V = IR", isCorrect: true },
            { option: "B", text: "P = VI", isCorrect: false },
            { option: "C", text: "E = MC^2", isCorrect: false },
            { option: "D", text: "F = ma", isCorrect: false },
          ],
        },
      ],
      2: [
        {
          question: "Which device converts AC to DC?",
          options: [
            { option: "A", text: "Transformer", isCorrect: false },
            { option: "B", text: "Rectifier", isCorrect: true },
            { option: "C", text: "Capacitor", isCorrect: false },
            { option: "D", text: "Inductor", isCorrect: false },
          ],
        },
        {
          question: "What is the formula for electrical power?",
          options: [
            { option: "A", text: "P = VI", isCorrect: true },
            { option: "B", text: "P = V^2/R", isCorrect: false },
            { option: "C", text: "P = I^2R", isCorrect: false },
            { option: "D", text: "All of the above", isCorrect: false },
          ],
        },
      ],
    },
    Ministry: {
      1: [
        {
          question: "What is the primary goal of the Ministry of Energy?",
          options: [
            { option: "A", text: "Energy conservation", isCorrect: true },
            { option: "B", text: "Energy production", isCorrect: false },
            { option: "C", text: "Energy distribution", isCorrect: false },
            { option: "D", text: "Energy research", isCorrect: false },
          ],
        },
        {
          question: "What is an important aspect of energy policy?",
          options: [
            { option: "A", text: "Regulating energy prices", isCorrect: true },
            { option: "B", text: "Increasing energy demand", isCorrect: false },
            {
              option: "C",
              text: "Reducing energy efficiency",
              isCorrect: false,
            },
            {
              option: "D",
              text: "Decreasing energy production",
              isCorrect: false,
            },
          ],
        },
      ],
      2: [
        {
          question:
            "Which sector is mainly responsible for energy consumption?",
          options: [
            { option: "A", text: "Residential", isCorrect: false },
            { option: "B", text: "Industrial", isCorrect: true },
            { option: "C", text: "Commercial", isCorrect: false },
            { option: "D", text: "Transport", isCorrect: false },
          ],
        },
        {
          question: "What is a key factor in energy sustainability?",
          options: [
            { option: "A", text: "Reducing carbon emissions", isCorrect: true },
            {
              option: "B",
              text: "Increasing fossil fuel use",
              isCorrect: false,
            },
            {
              option: "C",
              text: "Decreasing renewable energy sources",
              isCorrect: false,
            },
            { option: "D", text: "Promoting energy waste", isCorrect: false },
          ],
        },
      ],
    },
    Wapda: {
      1: [
        {
          question: "What does WAPDA stand for?",
          options: [
            {
              option: "A",
              text: "Water and Power Development Authority",
              isCorrect: true,
            },
            {
              option: "B",
              text: "Water and Power Delivery Association",
              isCorrect: false,
            },
            {
              option: "C",
              text: "World Authority for Power Development",
              isCorrect: false,
            },
            {
              option: "D",
              text: "Water and Pollution Development Authority",
              isCorrect: false,
            },
          ],
        },
        {
          question: "What is the primary function of WAPDA?",
          options: [
            { option: "A", text: "Water supply", isCorrect: false },
            { option: "B", text: "Electricity generation", isCorrect: true },
            { option: "C", text: "Education", isCorrect: false },
            { option: "D", text: "Health services", isCorrect: false },
          ],
        },
      ],
      2: [
        {
          question: "Which of the following is a project managed by WAPDA?",
          options: [
            { option: "A", text: "Tarbela Dam", isCorrect: true },
            { option: "B", text: "Khyber Pass", isCorrect: false },
            { option: "C", text: "Karachi Port", isCorrect: false },
            { option: "D", text: "M1 Motorway", isCorrect: false },
          ],
        },
        {
          question: "What is an objective of WAPDA's hydropower projects?",
          options: [
            {
              option: "A",
              text: "Increasing water pollution",
              isCorrect: false,
            },
            {
              option: "B",
              text: "Reducing electricity generation",
              isCorrect: false,
            },
            { option: "C", text: "Providing clean energy", isCorrect: true },
            { option: "D", text: "Decreasing water levels", isCorrect: false },
          ],
        },
      ],
    },
  };

  // Retrieve MCQs based on category and chapterNumber
  const mcqs = data[category]?.[chapterNumber] || [];

  // Handle revealing the correct answer
  const handleRevealAnswer = () => {
    setRevealedAnswer(!revealedAnswer); // Toggle reveal
  };

  // Handle clicking the next button
  const handleNextQuestion = () => {
    setRevealedAnswer(null);
    if (currentIndex < mcqs.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  // Handle clicking the back button
  const handleBackQuestion = () => {
    setRevealedAnswer(null);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
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

      {/* Only show the current question */}
      {mcqs.length > 0 && (
        <div className="mcq-item">
          <p className="question">{mcqs[currentIndex].question}</p>
          <ul className="options-list">
            {mcqs[currentIndex].options.map((option, i) => (
              <li
                key={i}
                className={`option ${
                  revealedAnswer && option.isCorrect ? "correct-answer" : ""
                }`}
              >
                <strong>{option.option}.</strong> {option.text}
              </li>
            ))}
          </ul>

          {/* Button container to keep buttons on the same line */}
          <div className="button-container">
            <button
              className="back-question-btn"
              onClick={handleBackQuestion}
              disabled={currentIndex === 0}
            >
              Back
            </button>

            <button className="reveal-answer-btn" onClick={handleRevealAnswer}>
              {revealedAnswer ? "Hide Answer" : "Show Answer"}
            </button>

            <button
              className="next-question-btn"
              onClick={handleNextQuestion}
              disabled={currentIndex >= mcqs.length - 1}
            >
              Next
            </button>
          </div>

          {revealedAnswer && (
            <p className="answer">
              Answer:{" "}
              <strong>
                {
                  mcqs[currentIndex].options.find((opt) => opt.isCorrect)
                    ?.option
                }
                .
              </strong>{" "}
              {mcqs[currentIndex].options.find((opt) => opt.isCorrect)?.text}
            </p>
          )}
        </div>
      )}

      {/* Show a message if there are no questions */}
      {mcqs.length === 0 && <p>No MCQs available for this chapter.</p>}
    </section>
  );
};

export default Mcqs;
