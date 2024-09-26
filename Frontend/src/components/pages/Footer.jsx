import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <h2 className="logo-text">Quizr</h2>
          <p>
            Eduport education theme, built specifically for the education
            centers which is dedicated to teaching and involve learners.
          </p>
          <div className="footer-social">
            <a href="#" className="social-link">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li>
              <a href="#">About us</a>
            </li>
            <li>
              <a href="#">Contact us</a>
            </li>
            <li>
              <a href="#">News and Blogs</a>
            </li>
            <li>
              <a href="#">Library</a>
            </li>
            <li>
              <a href="#">Career</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Community</h4>
          <ul>
            <li>
              <a href="#">Documentation</a>
            </li>
            <li>
              <a href="#">Faq</a>
            </li>
            <li>
              <a href="#">Forum</a>
            </li>
            <li>
              <a href="#">Sitemap</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Teaching</h4>
          <ul>
            <li>
              <a href="#">Become a teacher</a>
            </li>
            <li>
              <a href="#">How to guide</a>
            </li>
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h4>Contact</h4>
          <p>
            Toll free: +1234 568 963 <br />
            (9:AM to 8:PM IST)
          </p>
          <p>Email: example@gmail.com</p>
          <div className="store-buttons">
            <img src="src/assets/google-play.svg" alt="Google Play" />
            <img src="src/assets/app-store.svg" alt="App Store" />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-links">
          <a href="#">Language</a>
          <a href="#">Terms of use</a>
          <a href="#">Privacy policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
