import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/AddJobChapterForm.css"; // Adjust path as necessary

const AddJobChapterForm = () => {
  const [categories, setCategories] = useState([
    "Engineering",
    "Management",
    "Healthcare",
    "Education",
  ]);
  const [category, setCategory] = useState("");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const storedCategories = localStorage.getItem("categories");
    if (storedCategories) {
      const parsedCategories = JSON.parse(storedCategories);
      // Create a set to avoid duplicates
      const uniqueCategories = new Set([
        ...categories, // Existing default categories
        ...parsedCategories, // Loaded categories from localStorage
      ]);
      setCategories([...uniqueCategories]); // Convert back to array
    }
  }, []);

  const normalizeCategory = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const chapterData = {
      category: normalizeCategory(category), // Normalize the category input
      number: parseInt(number, 10),
      name,
    };

    try {
      const response = await axios.post(
        "http://localhost:5001/api/job-chapters/add", // Update API endpoint for job chapters
        chapterData
      );
      console.log(response.data);
      toast.success("Job chapter added successfully!");

      // Clear the form fields
      setCategory("");
      setNumber("");
      setName("");

      // Optionally, show a toast for clearing the fields
    } catch (error) {
      console.error("Error adding job chapter:", error);
      toast.error("Error adding job chapter. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="add-job-chapter-form">
        <h2 className="add-job-chapter-form__title">Add Job Chapter</h2>

        {/* Category Input Field */}
        <div className="add-job-chapter-form__field">
          <label className="add-job-chapter-form__label">Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => {
              // Normalize input to auto-capitalize first letter
              setCategory(normalizeCategory(e.target.value));
            }}
            required
            className="add-job-chapter-form__input-text"
          />
        </div>

        <div className="add-job-chapter-form__field">
          <label className="add-job-chapter-form__label">Number:</label>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
            className="add-job-chapter-form__input-number"
          />
        </div>

        <div className="add-job-chapter-form__field">
          <label className="add-job-chapter-form__label">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="add-job-chapter-form__input-text"
          />
        </div>

        <button type="submit" className="add-job-chapter-form__button">
          Add Job Chapter
        </button>
      </form>
      <ToastContainer /> {/* Container for toast notifications */}
    </div>
  );
};

export default AddJobChapterForm;
