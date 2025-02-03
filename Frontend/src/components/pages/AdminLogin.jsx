import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/Adminlogin", {
        // Replace with your API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Get error message from server
        throw new Error(errorData.msg || "Login failed"); // Display server error or generic message
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      toast.success("Successfully logged in as admin!");
      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 500);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message); // Display error message to the user
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2 className="welcome-text">
          Welcome Admin to <span className="test">Test</span>
          <span className="cracker">Cracker</span>! 👋
        </h2>

        <p>Please sign in to your admin account</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              autoComplete="email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="password"
              />
              <span
                className="password-toggle-icon"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button className="signin-button" type="submit">
            Sign in
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
