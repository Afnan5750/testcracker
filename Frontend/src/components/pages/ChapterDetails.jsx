import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/ChapterDetail.css";

const ChapterDetails = () => {
  const { category } = useParams();
  const [chapters, setChapters] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const normalizedCategory =
    category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

  // Fetch job chapters from the API
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        setLoading(true);
        console.log("Fetching job chapters for category:", normalizedCategory);
        const response = await axios.get(
          `http://localhost:5001/api/job-chapters/${normalizedCategory}` // Keep this API endpoint
        );
        console.log("Response data:", response.data); // Log the response data

        // Sort the chapters by their number
        const sortedChapters = response.data.sort(
          (a, b) => a.number - b.number
        );
        setChapters(sortedChapters);
      } catch (err) {
        console.error(err); // Log the error
        setError("Could not fetch job chapters from the server.");
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
      <h1>{normalizedCategory} Chapters</h1> {/* Changed heading for clarity */}
      <ul>
        {chapters.length > 0 ? (
          chapters.map((chapter) => (
            <li key={chapter.number}>
              <Link
                to={`/job-subject-mcqs/${normalizedCategory}/${chapter.number}`} // Adjust link path as necessary
                className="chapter-link"
              >
                Chapter {chapter.number}: {chapter.name}
              </Link>
            </li>
          ))
        ) : (
          <li>No job chapters available for this category.</li>
        )}
      </ul>
    </section>
  );
};

export default ChapterDetails;
