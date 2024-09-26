import React from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/ChapterDetail.css";

const ChapterDetailSubject = () => {
  const { category } = useParams();

  const chapters = {
    Math: [
      { number: 1, name: "Algebraic Expressions" },
      { number: 2, name: "Calculus Basics" },
      { number: 3, name: "Trigonometry" },
      { number: 4, name: "Linear Equations" },
    ],
    Chemistry: [
      { number: 1, name: "Atomic Structure" },
      { number: 2, name: "Chemical Bonds" },
      { number: 3, name: "Periodic Table" },
      { number: 4, name: "Acids and Bases" },
    ],
    Computer: [
      { number: 1, name: "Introduction to Programming" },
      { number: 2, name: "Web Development Basics" },
      { number: 3, name: "Data Structures" },
      { number: 4, name: "Database Management" },
    ],
    Biology: [
      { number: 1, name: "Cell Biology" },
      { number: 2, name: "Genetics" },
      { number: 3, name: "Human Physiology" },
      { number: 4, name: "Ecology" },
    ],
  };

  // Normalize category to match keys in chapters object
  const normalizedCategory =
    category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

  return (
    <section className="chapter-detail">
      <h1>{normalizedCategory} Chapters</h1>
      <ul>
        {chapters[normalizedCategory]?.map((chapter) => (
          <li key={chapter.number}>
            <Link
              to={`/subject-mcqs/${normalizedCategory}/${chapter.number}`}
              className="chapter-link"
            >
              Chapter {chapter.number}: {chapter.name}
            </Link>
          </li>
        )) || <li>No chapters available for this category.</li>}
      </ul>
    </section>
  );
};

export default ChapterDetailSubject;
