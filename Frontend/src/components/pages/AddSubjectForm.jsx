// src/components/pages/AddSubjectForm.jsx
import React, { useState } from "react";
import axios from "axios";
import "../styles/AddSubjectForm.css"; // Import the CSS file
import { toast } from "react-toastify";

const AddSubjectForm = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category", category);
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5001/api/subjects", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast("Subject added successfully!");
      // Reset the form
      setCategory("");
      setTitle("");
      setSubtitle("");
      setImage(null);
    } catch (error) {
      console.error("Error adding subject:", error);
      alert("Failed to add subject.");
    }
  };

  const handleTitleChange = (e) => {
    const inputTitle = e.target.value;
    if (inputTitle.length > 0) {
      // Capitalize the first letter and keep the rest unchanged
      const capitalizedTitle =
        inputTitle.charAt(0).toUpperCase() + inputTitle.slice(1);
      setTitle(capitalizedTitle);
    } else {
      setTitle(inputTitle); // Allow empty input
    }
  };

  const handleTitleBlur = () => {
    // Remove spaces and non-alphanumeric characters for URL, and convert to lowercase
    const sanitizedCategory = title
      .replace(/\s+/g, "") // Remove spaces
      .replace(/[^a-zA-Z0-9]/g, "") // Remove non-alphanumeric characters
      .toLowerCase(); // Convert to lowercase
    setCategory(sanitizedCategory); // Set the sanitized category
  };

  return (
    <div className="add-subject-form">
      <h2 className="add-subject-form__title">Add New Subject</h2>
      <form onSubmit={handleSubmit}>
        <div className="add-subject-form__field">
          <label className="add-subject-form__label">Title:</label>
          <input
            type="text"
            className="add-subject-form__input-text"
            value={title}
            onChange={handleTitleChange} // Update onChange to the new handler
            onBlur={handleTitleBlur} // Trigger category fill on blur
            placeholder="Enter title"
            required
          />
        </div>
        <div className="add-subject-form__field">
          <label className="add-subject-form__label">Category / URL:</label>
          <input
            type="text"
            className="add-subject-form__input-text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category"
            required
          />
        </div>
        <div className="add-subject-form__field">
          <label className="add-subject-form__label">Subtitle:</label>
          <input
            type="text"
            className="add-subject-form__input-text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Enter subtitle"
            required
          />
        </div>
        <div className="add-subject-form__field">
          <label className="add-subject-form__label">Image:</label>
          <input
            type="file"
            className="add-subject-form__input-file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="add-subject-form__button">
          Add Subject
        </button>
      </form>
    </div>
  );
};

export default AddSubjectForm;
