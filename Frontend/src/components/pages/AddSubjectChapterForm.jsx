import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/AddSubjectChapterForm.css";

const AddSubjectChapterForm = () => {
  const [categories, setCategories] = useState([
    "Math",
    "Computer",
    "Biology",
    "Chemistry",
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
        "http://localhost:5001/api/chapters/add",
        chapterData
      );
      console.log(response.data);
      toast.success("Chapter added successfully!");

      // Clear the form fields
      setCategory("");
      setNumber("");
      setName("");
    } catch (error) {
      console.error("Error adding chapter:", error);
      toast.error("Error adding chapter. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="add-subject-chapter-form">
        <h2 className="add-subject-chapter-form__title">Add Chapter</h2>

        {/* Category Input Field */}
        <div className="add-subject-chapter-form__field">
          <label className="add-subject-chapter-form__label">Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => {
              // Normalize input to auto-capitalize first letter
              setCategory(normalizeCategory(e.target.value));
            }}
            required
            className="add-subject-chapter-form__input-text"
          />
        </div>

        <div className="add-subject-chapter-form__field">
          <label className="add-subject-chapter-form__label">Number:</label>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
            className="add-subject-chapter-form__input-number"
          />
        </div>

        <div className="add-subject-chapter-form__field">
          <label className="add-subject-chapter-form__label">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="add-subject-chapter-form__input-text"
          />
        </div>

        <button type="submit" className="add-subject-chapter-form__button">
          Add Chapter
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddSubjectChapterForm;
