import React from "react";
import "../styles/HeroSection.css";
import HeroImg from "../../assets/Hero.png";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Discover Your Next Favorite Quiz</h1>
        <p>Explore top-notch resources and prepare for quizzes with ease.</p>
        <div className="search-bar">
          <input type="text" placeholder="Search for quizzes..." />
          <button>Explore</button>
        </div>
      </div>
      <div className="hero-image">
        <img src={HeroImg} alt="Quiz Preparation" />
      </div>
    </section>
  );
};

export default HeroSection;
