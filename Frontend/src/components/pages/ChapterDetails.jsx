// src/components/pages/ChapterDetail.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/ChapterDetail.css";

const ChapterDetail = () => {
  const { category } = useParams();

  const chapters = {
    Power: [
      { number: 1, name: "Basics of Power Systems" },
      { number: 2, name: "Power Generation" },
      { number: 3, name: "Transmission Systems" },
      { number: 4, name: "Power Distribution" },
    ],
    Ministry: [
      { number: 1, name: "Introduction to Ministries" },
      { number: 2, name: "Ministry Functions" },
      { number: 3, name: "Government Roles" },
      { number: 4, name: "Policy Making" },
    ],
    Wapda: [
      { number: 1, name: "Water Resources" },
      { number: 2, name: "Hydropower Projects" },
      { number: 3, name: "Energy Management" },
      { number: 4, name: "Power Efficiency" },
    ],
  };

  return (
    <section className="chapter-detail">
      <h1>{category} Chapters</h1>
      <ul>
        {chapters[category]?.map((chapter) => (
          <li key={chapter.number}>
            <Link
              to={`/mcqs/${category}/${chapter.number}`}
              className="chapter-link"
            >
              Chapter {chapter.number}: {chapter.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ChapterDetail;
