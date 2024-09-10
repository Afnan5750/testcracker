import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/SignupForm.css";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/register", {
        username,
        email,
        password,
      });
      toast.success(response.data.msg); // Show success message
      setTimeout(() => {
        navigate("/login"); // Redirect to sign-in page after 2 seconds
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        // Show specific error message from the server
        toast.error(error.response.data.msg);
      } else {
        // Show generic error message
        toast.error("Error registering user");
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create an Account</h2>
        <p>Fill in the details below to create your account.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">
              <FaUser className="input-icon" />
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">
              <FaEnvelope className="input-icon" />
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">
              <FaLock className="input-icon" />
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">
              <FaLock className="input-icon" />
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>
          <button className="btn btn-signup" type="submit">
            Sign Up
          </button>
        </form>
        <p className="already-have-account">
          Already have an account? <a href="/login">Sign In</a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignupForm;
