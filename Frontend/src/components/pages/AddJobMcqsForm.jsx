import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Ensure react-toastify is installed
import "../styles/AddJobMcqsForm.css"; // Import the CSS file

const AddJobMcqsForm = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [chapter, setChapter] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]);
  const [explanation, setExplanation] = useState("");

  // Handle changes to option text or correctness
  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (
      !jobTitle ||
      !chapter ||
      !question ||
      options.some((option) => option.text === "") ||
      !explanation
    ) {
      toast.error("All fields are required, and there must be 4 options.");
      return;
    }

    // Check if exactly one option is marked as correct
    const correctOptions = options.filter((option) => option.isCorrect);
    if (correctOptions.length !== 1) {
      toast.error("There must be exactly one correct option.");
      return;
    }

    const mcqData = {
      jobTitle,
      chapter: Number(chapter), // Ensure chapter is a number
      question,
      options,
      explanation,
    };

    try {
      const response = await axios.post(
        "http://localhost:5001/api/job-mcqs/add-job-mcq", // Adjust the endpoint based on your backend
        mcqData
      );
      toast.success(response.data.message); // Show success toast
      resetForm(); // Reset form fields after successful submission
    } catch (error) {
      toast.error(error.response?.data.message || "Error adding MCQ"); // Show error toast
    }
  };

  // Function to reset the form fields
  const resetForm = () => {
    setJobTitle("");
    setChapter("");
    setQuestion("");
    setOptions([
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ]);
    setExplanation("");
  };

  // Capitalize the first letter of each word in Job Title
  const handleJobTitleChange = (e) => {
    const value = e.target.value;
    if (value) {
      const titleCasedValue = value
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
      setJobTitle(titleCasedValue);
    } else {
      setJobTitle("");
    }
  };

  return (
    <form className="add-mcqs-form" onSubmit={handleSubmit}>
      <h2 className="add-mcqs-form__title">Add Job MCQ</h2>
      <div className="add-mcqs-form__field">
        <label className="add-mcqs-form__label">Job Title:</label>
        <input
          className="add-mcqs-form__input-text"
          type="text"
          value={jobTitle}
          onChange={handleJobTitleChange} // Use the new change handler
          required
        />
      </div>
      <div className="add-mcqs-form__field">
        <label className="add-mcqs-form__label">Chapter:</label>
        <input
          className="add-mcqs-form__input-number"
          type="number"
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
          required
        />
      </div>
      <div className="add-mcqs-form__field">
        <label className="add-mcqs-form__label">Question:</label>
        <input
          className="add-mcqs-form__input-text"
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
      </div>
      <div className="add-mcqs-form__field">
        <h3>Options:</h3>
        {options.map((option, index) => (
          <div className="add-mcqs-form__option" key={index}>
            <input
              className="add-mcqs-form__input-text"
              type="text"
              value={option.text}
              onChange={(e) =>
                handleOptionChange(index, "text", e.target.value)
              }
              placeholder={`Option ${index + 1}`}
              required
            />
            <label>
              <input
                className="add-mcqs-form__input-radio"
                type="radio"
                checked={option.isCorrect}
                onChange={() =>
                  setOptions((prevOptions) =>
                    prevOptions.map((opt, idx) => ({
                      ...opt,
                      isCorrect: idx === index,
                    }))
                  )
                }
              />
              Correct
            </label>
          </div>
        ))}
      </div>
      <div className="add-mcqs-form__field">
        <label className="add-mcqs-form__label">Explanation:</label>
        <textarea
          className="add-mcqs-form__textarea"
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          required
        />
      </div>
      <button className="add-mcqs-form__button" type="submit">
        Add MCQ
      </button>
    </form>
  );
};

export default AddJobMcqsForm;
