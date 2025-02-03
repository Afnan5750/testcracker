import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddSubjectForm from "../pages/AddSubjectForm"; // Import Subject form
import AddSubjectChapterForm from "../pages/AddSubjectChapterForm"; // Import Chapter form
import AddMCQsForm from "../pages/AddSubjectMcqsForm"; // Import MCQs form
import AddJobSubjectForm from "../pages/AddJobSubjectForm"; // Import Job Subject form
import AddJobChapterForm from "../pages/AddJobChapterForm"; // Import Job Chapter form
import AddJobMcqsForm from "../pages/AddJobMcqsForm"; // Import Job MCQs form
import { ToastContainer, toast } from "react-toastify"; // Import toast functions
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import "../styles/AdminPage.css"; // Import custom CSS

const AdminPage = () => {
  const [activeForm, setActiveForm] = useState(null); // Manage active form
  const navigate = useNavigate();

  const handleButtonClick = (form) => {
    setActiveForm(form);
    // Show toast notification
    toast.success(
      `Successfully switched to ${
        form === "subject"
          ? "Subject"
          : form === "chapter"
          ? "Chapter"
          : form === "mcqs"
          ? "MCQs"
          : form === "jobSubject"
          ? "Job Subject"
          : form === "jobChapter"
          ? "Job Chapter"
          : "Job MCQs"
      } form!`
    );
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      toast.success("Successfully logged out!");
      setTimeout(() => {
        navigate("/admin");
      }, 500);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <button
          className="admin-sidebar-button"
          onClick={() => handleButtonClick("subject")}
        >
          Add Subject
        </button>
        <button
          className="admin-sidebar-button"
          onClick={() => handleButtonClick("jobSubject")}
        >
          Add Job Subject
        </button>
        <hr />
        <button
          className="admin-sidebar-button"
          onClick={() => handleButtonClick("chapter")}
        >
          Add Chapter
        </button>
        <button
          className="admin-sidebar-button"
          onClick={() => handleButtonClick("jobChapter")}
        >
          Add Job Chapter
        </button>
        <hr />
        <button
          className="admin-sidebar-button"
          onClick={() => handleButtonClick("mcqs")}
        >
          Add MCQs
        </button>
        <button
          className="admin-sidebar-button"
          onClick={() => handleButtonClick("jobMcqs")}
        >
          Add Job MCQs
        </button>
        <hr />
        <button className="admin-sidebar-button" onClick={() => handleLogout()}>
          Logout
        </button>
      </div>
      <div className="admin-content">
        {/* Conditionally render the form based on activeForm state */}
        {activeForm === "subject" && <AddSubjectForm />}
        {activeForm === "chapter" && <AddSubjectChapterForm />}
        {activeForm === "mcqs" && <AddMCQsForm />} {/* Render MCQs form */}
        {activeForm === "jobSubject" && <AddJobSubjectForm />}
        {activeForm === "jobChapter" && <AddJobChapterForm />}{" "}
        {/* Render Job Chapter form */}
        {activeForm === "jobMcqs" && <AddJobMcqsForm />}{" "}
        {/* Render Job MCQs form */}
      </div>
      <ToastContainer /> {/* Toast container for notifications */}
    </div>
  );
};

export default AdminPage;
