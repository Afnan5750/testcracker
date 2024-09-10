import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../styles/Navbar.css"; // Ensure this file exists and is correctly configured

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth(); // Assuming AuthContext provides user authentication
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("darkMode", "false");
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Reset dropdown state when authentication status changes
    if (isAuthenticated) {
      setIsDropdownOpen(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Handle clicks outside of dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const handleSignInClick = () => {
    navigate("/login");
  };

  const handleCreateAccountClick = () => {
    navigate("/signup");
  };

  const handleLogoutClick = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      logout();
      navigate("/"); // Redirect to home page after logout
    }
  };

  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="logo">Quizr</div>
      <ul className="nav-links">
        <li>
          <a href="/">Home</a>
        </li>
        <li className="dropdown">
          <a href="/categories">
            Category <i className="fas fa-caret-down"></i>
          </a>
          <div className="dropdown-content">
            <a href="/categories/science">Science</a>
            <a href="/categories/history">History</a>
          </div>
        </li>
        <li className="dropdown">
          <a href="/quizzes">
            Quiz <i className="fas fa-caret-down"></i>
          </a>
          <div className="dropdown-content">
            <a href="/quizzes/popular">Popular</a>
            <a href="/quizzes/recent">Recent</a>
          </div>
        </li>
        <li className="dropdown">
          <a href="/mcqs">
            MCQs <i className="fas fa-caret-down"></i>
          </a>
          <div className="dropdown-content">
            <a href="/mcqs/science">Science</a>
            <a href="/mcqs/math">Math</a>
          </div>
        </li>
      </ul>
      <div className="auth-buttons">
        <button className="btn btn-theme-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? (
            <i className="fas fa-sun sunIcon"></i>
          ) : (
            <i className="fas fa-moon"></i>
          )}
        </button>
        {!isAuthenticated ? (
          <>
            <button
              className="btn btn-create"
              onClick={handleCreateAccountClick}
            >
              <i className="fas fa-user-plus"></i> Create Account
            </button>
            <button className="btn btn-signin" onClick={handleSignInClick}>
              <i className="fas fa-sign-in-alt"></i> Sign In
            </button>
          </>
        ) : (
          <div className="profile-dropdown" ref={dropdownRef}>
            <button
              className="btn btn-profile"
              onClick={toggleDropdown}
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
            >
              <i className="fas fa-user-circle profile-icon"></i>
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button
                  className="dropdown-item"
                  onClick={() => navigate("/profile")}
                >
                  <i className="fas fa-user"></i> Profile
                </button>
                <button className="dropdown-item" onClick={handleLogoutClick}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
