import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
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
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get("http://localhost:5001/api/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUsername(response.data.username);
          setEmail(response.data.email);
        } catch (error) {
          console.error(
            "Error fetching user data:",
            error.response?.data || error.message
          );
          console.error("Error fetching user data:", error);
          toast.error("Error fetching user data");
        }
      }
    };

    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated]);

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
    setIsDropdownOpen(false);
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      logout();
      toast.success("Successfully logged out!");
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  };

  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsDropdownOpen((prev) => !prev);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setIsDropdownOpen(false); // Optional: Close the dropdown if desired
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <span className="test">Test</span>
        <span className="cracker">Cracker</span>
      </Link>
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
            <a href="/chapter-detail-subject/math">Math</a>
            <a href="/chapter-detail-subject/biology">Biology</a>
            <a href="/chapter-detail-subject/chemistry">Chemistry</a>
            <a href="/chapter-detail-subject/computer">Computer</a>
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
              <div className="profile-dropdown">
                <div className="dropdown-menu">
                  <div className="user-info">
                    <img
                      src="src/assets/Profile.jpg"
                      alt="User Avatar"
                      className="dropdown-image"
                    />
                    <div className="user-details">
                      <p className="welcome-message">{username}</p>
                      <p className="user-email">{email}</p>
                    </div>
                  </div>
                  <div className="separator"></div>
                  <button
                    className="dropdown-item"
                    onClick={handleProfileClick}
                  >
                    <i className="fas fa-user"></i> Profile
                  </button>
                  <button className="dropdown-item" onClick={handleLogoutClick}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
