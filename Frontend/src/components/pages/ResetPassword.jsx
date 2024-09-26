import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import the eye icons
import "react-toastify/dist/ReactToastify.css";
import "../styles/ResetPassword.css";

const ResetPassword = () => {
  const { state } = useLocation(); // Get the passed state
  const [email, setEmail] = useState(state?.email || ""); // Set email from state or default to empty
  const [code, setCode] = useState(state?.code || ""); // Set code from state or default to empty
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/reset-password", // Correct API path
        {
          email, // Send email
          code, // Send code
          newPassword: password,
          confirmNewPassword: confirmPassword,
        }
      );

      toast.success(response.data.msg); // Show success message
      navigate("/login"); // Redirect to login page
    } catch (error) {
      const errorMsg =
        error.response?.data?.msg || error.message || "An error occurred";
      toast.error(errorMsg); // Show error message
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <div className="reset-password-title">Reset Password</div>
        <div className="reset-password-description">
          Please enter your new password and confirm it.
        </div>
        <form onSubmit={handleSubmit}>
          <div className="reset-password-input-group hidden">
            <label className="reset-password-label" htmlFor="email">
              Email
            </label>
            <input
              className="reset-password-input"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              autoComplete="email"
              readOnly
            />
          </div>

          <div className="reset-password-input-group hidden">
            <label className="reset-password-label" htmlFor="code">
              Reset Code
            </label>
            <input
              className="reset-password-input"
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter the reset code"
              required
              autoComplete="reset-code"
              readOnly
            />
          </div>

          <div className="reset-password-input-group">
            <label className="reset-password-label" htmlFor="password">
              New Password
            </label>
            <div className="input-with-icon">
              <input
                className="reset-password-input"
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your new password"
                required
                autoComplete="new-password"
              />
              {isPasswordVisible ? (
                <FaEyeSlash
                  className="password-eye-icon"
                  onClick={() => setIsPasswordVisible(false)}
                />
              ) : (
                <FaEye
                  className="password-eye-icon"
                  onClick={() => setIsPasswordVisible(true)}
                />
              )}
            </div>
          </div>

          <div className="reset-password-input-group">
            <label className="reset-password-label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="input-with-icon">
              <input
                className="reset-password-input"
                type={isConfirmPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                required
                autoComplete="confirm-password"
              />
              {isConfirmPasswordVisible ? (
                <FaEyeSlash
                  className="password-eye-icon"
                  onClick={() => setIsConfirmPasswordVisible(false)}
                />
              ) : (
                <FaEye
                  className="password-eye-icon"
                  onClick={() => setIsConfirmPasswordVisible(true)}
                />
              )}
            </div>
          </div>

          <button
            className="reset-password-submit-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
