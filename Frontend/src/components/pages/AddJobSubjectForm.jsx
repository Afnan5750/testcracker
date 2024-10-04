import React, { useState } from "react";
import axios from "axios";
import "../styles/AddSubjectForm.css"; // Import the CSS file
import { toast } from "react-toastify";

const AddJobSubjectForm = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState(null);

  // Automatically capitalize the first letter and convert the rest to lowercase
  const handleTitleChange = (e) => {
    const inputTitle = e.target.value.toLowerCase();
    const capitalizedTitle =
      inputTitle.charAt(0).toUpperCase() + inputTitle.slice(1);
    setTitle(capitalizedTitle); // Set the capitalized title
  };

  // Update the category based on the title
  const handleTitleBlur = () => {
    const sanitizedCategory = title
      .replace(/\s+/g, "")
      .replace(/[^a-zA-Z0-9]/g, ""); // Clean up the title
    setCategory(sanitizedCategory.toLowerCase()); // Ensure category matches the lowercase version of title
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category", category); // Category based on lowercase title
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5001/api/jobsubjects", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Subject added successfully!"); // Success toast
      // Reset the form
      setCategory("");
      setTitle("");
      setSubtitle("");
      setImage(null);
    } catch (error) {
      console.error("Error adding subject:", error);
      toast.error("Failed to add subject."); // Error toast
    }
  };

  return (
    <div className="add-subject-form">
      <h2 className="add-subject-form__title">Add New Job Subject</h2>
      <form onSubmit={handleSubmit}>
        <div className="add-subject-form__field">
          <label className="add-subject-form__label">Title:</label>
          <input
            type="text"
            className="add-subject-form__input-text"
            value={title}
            onChange={handleTitleChange} // Automatically capitalize first letter
            onBlur={handleTitleBlur} // Sync category with the title on blur
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
            readOnly // Prevent manual changes to the category, it will sync with title
            placeholder="Category will be auto-filled"
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
          Add Job Subject
        </button>
      </form>
    </div>
  );
};

export default AddJobSubjectForm;
