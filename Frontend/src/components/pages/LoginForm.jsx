import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Access auth context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5001/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token); // Store token in localStorage
      login(); // Update auth context
      toast.success("Successfully logged in!"); // Show success message
      navigate("/"); // Redirect to home page after login
    } catch (error) {
      toast.error("Error logging in"); // Show error message
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Welcome to Quizr! 👋</h2>
        <p>Please sign in to your account and start the adventure</p>
        <form onSubmit={handleSubmit}>
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
            <a href="#" className="forgot-password">
              Forgot Password?
            </a>
          </div>

          <button className="signin-button" type="submit">
            Sign in
          </button>
        </form>
        <p className="create-account">
          New on our platform? <Link to="/signup">Create an account</Link>
        </p>
      </div>
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
};

export default LoginForm;
