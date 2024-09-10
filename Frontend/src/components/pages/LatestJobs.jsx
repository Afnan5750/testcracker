// src/components/LatestJobs.jsx
import React, { useEffect, useRef } from "react";
import "../styles/LatestJobs.css";

const LatestJobs = () => {
  const jobs = [
    "PITC",
    "Wapda",
    "Power",
    "Law",
    "Ministry of Energy",
    "Finance",
    "Health Department",
    "Education Department",
  ];

  const jobListRef = useRef(null);

  useEffect(() => {
    if (jobListRef.current) {
      // Duplicate the job list items to create a seamless loop
      const items = Array.from(jobListRef.current.children);
      const clone = items.map((item) => item.cloneNode(true));
      jobListRef.current.append(...clone);
    }
  }, [jobs]);

  return (
    <section className="latest-jobs">
      <h2>Latest Jobs</h2>
      <div className="job-slider">
        <div className="job-list" ref={jobListRef}>
          {jobs.map((job, index) => (
            <span key={index} className="job-item">
              {job}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestJobs;
