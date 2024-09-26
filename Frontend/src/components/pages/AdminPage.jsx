import React, { useState } from "react";
import "../styles/AdminPage.css";

const AdminPage = () => {
  const [mcqType, setMcqType] = useState("");
  const [subject, setSubject] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [chapter, setChapter] = useState("");
  const [customChapter, setCustomChapter] = useState("");
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  const [chapters, setChapters] = useState([
    "Chapter 1",
    "Chapter 2",
    "Chapter 3",
    "Chapter 4",
    "Chapter 5",
  ]);

  const [subjects, setSubjects] = useState([
    "Math",
    "Biology",
    "Computer Science",
  ]);

  const [jobs, setJobs] = useState(["PITC", "Power Ministry", "WAPDA"]);

  const [customJob, setCustomJob] = useState("");
  const [isAddingCustomChapter, setIsAddingCustomChapter] = useState(false);
  const [isAddingCustomSubject, setIsAddingCustomSubject] = useState(false);
  const [isAddingCustomJob, setIsAddingCustomJob] = useState(false);

  const handleAddChapter = () => {
    if (customChapter) {
      const formattedChapter = `Chapter ${customChapter}`;
      if (!chapters.includes(formattedChapter)) {
        setChapters([...chapters, formattedChapter]);
        setCustomChapter("");
        setIsAddingCustomChapter(false);
      }
    }
  };

  const handleAddSubject = () => {
    if (customSubject) {
      const formattedSubject = customSubject.trim();
      if (!subjects.includes(formattedSubject)) {
        setSubjects([...subjects, formattedSubject]);
        setCustomSubject("");
        setIsAddingCustomSubject(false);
      }
    }
  };

  const handleAddJob = () => {
    if (customJob) {
      const formattedJob = customJob.trim();
      if (!jobs.includes(formattedJob)) {
        setJobs([...jobs, formattedJob]);
        setCustomJob("");
        setIsAddingCustomJob(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mcqData = {
      mcqType,
      subject: mcqType === "subject-wise" ? subject : undefined,
      job: mcqType === "job-wise" ? subject : undefined,
      chapter,
      question,
      options: { A: optionA, B: optionB, C: optionC, D: optionD },
      correctAnswer,
    };

    console.log(mcqData);

    // Clear form after submission
    setQuestion("");
    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
    setCorrectAnswer("");
  };

  return (
    <div className="admin-page">
      <h1>Upload Questions</h1>
      <form onSubmit={handleSubmit}>
        {/* MCQ Type */}
        <div>
          <label htmlFor="mcqType">Select MCQ Type:</label>
          <select
            id="mcqType"
            value={mcqType}
            onChange={(e) => {
              setMcqType(e.target.value);
              setSubject("");
              setChapter("");
              setCustomChapter("");
              setIsAddingCustomChapter(false);
              setIsAddingCustomSubject(false);
              setIsAddingCustomJob(false);
            }}
          >
            <option value="">--Select Type--</option>
            <option value="subject-wise">Subject Wise</option>
            <option value="job-wise">Job Wise</option>
          </select>
        </div>

        {/* Subject Selection */}
        {mcqType === "subject-wise" && (
          <div>
            <label htmlFor="subject">Select Subject:</label>
            <select
              id="subject"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                setChapter("");
                setCustomChapter("");
                setIsAddingCustomChapter(false);
                if (e.target.value === "custom") {
                  setIsAddingCustomSubject(true);
                } else {
                  setIsAddingCustomSubject(false);
                }
              }}
            >
              <option value="">--Select Subject--</option>
              {subjects.map((sub, index) => (
                <option key={index} value={sub}>
                  {sub}
                </option>
              ))}
              <option value="custom">Add Custom Subject</option>
            </select>
          </div>
        )}

        {/* Add Custom Subject */}
        {isAddingCustomSubject && (
          <div className="input-button-container">
            <input
              type="text"
              className="customInput"
              value={customSubject}
              onChange={(e) => setCustomSubject(e.target.value)}
              placeholder="Enter custom subject"
            />
            <button
              type="button"
              className="addCustom"
              onClick={handleAddSubject}
            >
              Add Subject
            </button>
          </div>
        )}

        {/* Job Selection */}
        {mcqType === "job-wise" && (
          <div>
            <label htmlFor="job">Select Job:</label>
            <select
              id="job"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                setChapter("");
                setCustomChapter("");
                setIsAddingCustomChapter(false);
                if (e.target.value === "custom") {
                  setIsAddingCustomJob(true);
                } else {
                  setIsAddingCustomJob(false);
                }
              }}
            >
              <option value="">--Select Job--</option>
              {jobs.map((job, index) => (
                <option key={index} value={job}>
                  {job}
                </option>
              ))}
              <option value="custom">Add Custom Job</option>
            </select>
          </div>
        )}

        {/* Add Custom Job */}
        {isAddingCustomJob && (
          <div className="input-button-container">
            <input
              type="text"
              className="customInput"
              value={customJob}
              onChange={(e) => setCustomJob(e.target.value)}
              placeholder="Enter custom job"
            />
            <button type="button" className="addCustom" onClick={handleAddJob}>
              Add Job
            </button>
          </div>
        )}

        {/* Chapter Selection */}
        {subject && (
          <div>
            <label htmlFor="chapter">Select Chapter:</label>
            <select
              id="chapter"
              value={chapter}
              onChange={(e) => {
                setChapter(e.target.value);
                setCustomChapter("");
                if (e.target.value === "custom") {
                  setIsAddingCustomChapter(true);
                } else {
                  setIsAddingCustomChapter(false);
                }
              }}
            >
              <option value="">--Select Chapter--</option>
              {chapters.map((ch, index) => (
                <option key={index} value={ch}>
                  {ch}
                </option>
              ))}
              <option value="custom">Add Custom Chapter</option>
            </select>
          </div>
        )}

        {/* Add Custom Chapter */}
        {isAddingCustomChapter && (
          <div className="input-button-container">
            <input
              type="text"
              className="customInput"
              value={customChapter}
              onChange={(e) => setCustomChapter(e.target.value)}
              placeholder="Enter chapter number"
            />
            <button
              type="button"
              className="addCustom"
              onClick={handleAddChapter}
            >
              Add Chapter
            </button>
          </div>
        )}

        {/* Question and Options */}
        {chapter && (
          <div className="question-section">
            <label htmlFor="question">Question:</label>
            <input
              type="text"
              id="question"
              className="customInput"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter the question"
              required
            />

            <div className="options-section">
              <label>Options:</label>
              <div className="option">
                <label htmlFor="optionA">A:</label>
                <input
                  type="text"
                  id="optionA"
                  className="customInput"
                  value={optionA}
                  onChange={(e) => setOptionA(e.target.value)}
                  placeholder="Enter option A"
                  required
                />
              </div>
              <div className="option">
                <label htmlFor="optionB">B:</label>
                <input
                  type="text"
                  id="optionB"
                  className="customInput"
                  value={optionB}
                  onChange={(e) => setOptionB(e.target.value)}
                  placeholder="Enter option B"
                  required
                />
              </div>
              <div className="option">
                <label htmlFor="optionC">C:</label>
                <input
                  type="text"
                  id="optionC"
                  className="customInput"
                  value={optionC}
                  onChange={(e) => setOptionC(e.target.value)}
                  placeholder="Enter option C"
                  required
                />
              </div>
              <div className="option">
                <label htmlFor="optionD">D:</label>
                <input
                  type="text"
                  id="optionD"
                  className="customInput"
                  value={optionD}
                  onChange={(e) => setOptionD(e.target.value)}
                  placeholder="Enter option D"
                  required
                />
              </div>
            </div>
            {/* Correct Answer Selection */}
            {chapter && (
              <div className="correct-answer-section">
                <label htmlFor="correctAnswer">Select Correct Option:</label>
                <select
                  id="correctAnswer"
                  className="customInput"
                  value={correctAnswer}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                  required
                >
                  <option value="">--Select Correct Option--</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </div>
            )}

            {/* Submit Button */}
            {chapter && (
              <button className="submit-btn" type="submit">
                Submit Question
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default AdminPage;
