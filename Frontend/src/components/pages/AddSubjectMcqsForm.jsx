import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import toast components
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import "../styles/AddSubjectMcqsForm.css"; // Import your CSS file if needed

const AddSubjectMcqsForm = () => {
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]);
  const [explanation, setExplanation] = useState("");

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index].text = value;
    setOptions(updatedOptions);
  };

  const handleCorrectOptionChange = (index) => {
    const updatedOptions = options.map((option, i) => ({
      ...option,
      isCorrect: i === index,
    }));
    setOptions(updatedOptions);
  };

  const handleSubjectChange = (e) => {
    const value = e.target.value;
    // Capitalize the first letter if the input is not empty
    if (value) {
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      setSubject(capitalizedValue);
    } else {
      setSubject(""); // Reset if input is empty
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !subject ||
      !chapter ||
      !question ||
      options.some((option) => option.text === "") ||
      !explanation
    ) {
      toast.error("All fields are required, and there must be 4 options."); // Using toast instead of alert
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/api/mcqs/add-mcq",
        {
          subject,
          chapter: Number(chapter),
          question,
          options,
          explanation,
        }
      );
      console.log(response.data); // Debug log
      toast.success(response.data.message); // Using toast instead of alert
      // Reset form fields after successful submission
      setSubject("");
      setChapter("");
      setQuestion("");
      setOptions([
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ]);
      setExplanation("");
    } catch (error) {
      console.error("Error details:", error); // Debug log
      toast.error(error.response?.data.message || "Error adding MCQ"); // Using toast instead of alert
    }
  };

  return (
    <div className="add-mcqs-form">
      <h2 className="add-mcqs-form__title">Add MCQ</h2>
      <form onSubmit={handleSubmit} className="add-mcqs-form__form">
        <div className="add-mcqs-form__field">
          <label htmlFor="subject" className="add-mcqs-form__label">
            Subject:
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={handleSubjectChange}
            required
            className="add-mcqs-form__input-text"
          />
        </div>
        <div className="add-mcqs-form__field">
          <label htmlFor="chapter" className="add-mcqs-form__label">
            Chapter:
          </label>
          <input
            type="number"
            id="chapter"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            required
            className="add-mcqs-form__input-text"
          />
        </div>
        <div className="add-mcqs-form__field">
          <label htmlFor="question" className="add-mcqs-form__label">
            Question:
          </label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            className="add-mcqs-form__textarea"
          ></textarea>
        </div>
        <div className="add-mcqs-form__field">
          <label className="add-mcqs-form__label">Options:</label>
          {options.map((option, index) => (
            <div key={index} className="add-mcqs-form__option">
              <input
                type="text"
                value={option.text}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
                placeholder={`Option ${index + 1}`}
                className="add-mcqs-form__input-text"
              />
              <label>
                <input
                  type="radio"
                  checked={option.isCorrect}
                  onChange={() => handleCorrectOptionChange(index)}
                />
                Correct
              </label>
            </div>
          ))}
        </div>
        <div className="add-mcqs-form__field">
          <label htmlFor="explanation" className="add-mcqs-form__label">
            Explanation:
          </label>
          <textarea
            id="explanation"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            required
            className="add-mcqs-form__textarea"
          ></textarea>
        </div>
        <button type="submit" className="add-mcqs-form__button">
          Add MCQ
        </button>
      </form>
      <ToastContainer /> {/* Include the ToastContainer component */}
    </div>
  );
};

export default AddSubjectMcqsForm;
