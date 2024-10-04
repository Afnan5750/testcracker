import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/ChapterDetail.css";

const ChapterDetailSubject = () => {
  const { category } = useParams();
  const [chapters, setChapters] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const normalizedCategory =
    category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

  // Fetch chapters from the API
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        setLoading(true);
        console.log("Fetching chapters for category:", normalizedCategory);
        const response = await axios.get(
          `http://localhost:5001/api/chapters/${normalizedCategory}`
        );
        console.log("Response data:", response.data); // Log the response data
        const sortedChapters = response.data.sort(
          (a, b) => a.number - b.number
        );
        setChapters(sortedChapters);
      } catch (err) {
        console.error(err); // Log the error
        setError("Could not fetch chapters from the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [normalizedCategory]);

  // Handle loading and error states
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="chapter-detail">
      <h1>{normalizedCategory} Chapters</h1>
      <ul>
        {chapters.length > 0 ? (
          chapters.map((chapter) => (
            <li key={chapter.number}>
              <Link
                to={`/subject-mcqs/${normalizedCategory}/${chapter.number}`}
                className="chapter-link"
              >
                Chapter {chapter.number}: {chapter.name}
              </Link>
            </li>
          ))
        ) : (
          <li>No chapters available for this category.</li>
        )}
      </ul>
    </section>
  );
};

export default ChapterDetailSubject;
