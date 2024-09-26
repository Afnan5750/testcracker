import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../styles/ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting state to true
    try {
      const response = await fetch(
        "http://localhost:5001/api/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        // Handle different status codes here for better UX
        const errorData = await response.json();
        toast.error(errorData.message || "User not found.");
        return;
      }

      const data = await response.json();
      toast.success(
        data.message || "Reset code sent successfully! Check your email."
      );
      // Optionally navigate to another page or reset the form
      navigate("/reset-code", { state: { email } }); // Navigate to the login page or wherever appropriate
    } catch (error) {
      console.error("Error sending reset code:", error);
      toast.error("An error occurred while sending the reset code.");
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <div className="title">Forgot Password?</div>
        <div className="description">
          Enter your email to receive a password reset code.
        </div>
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
            />
          </div>
          <button
            className="reset-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending Code..." : "Send Reset Code"}
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
