import React, { useState, useRef, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../styles/ResetCode.css";

const ResetCode = () => {
  const location = useLocation();
  const { email } = location.state || {};
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendTimer, setResendTimer] = useState(0); // State for timer
  const [timerActive, setTimerActive] = useState(false); // State for timer status
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  useEffect(() => {
    let timer;
    if (timerActive && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setTimerActive(false);
    }

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, [timerActive, resendTimer]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const code = otp.join("");

    if (code.length < 6) {
      toast.error("Please enter the complete reset code.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5001/api/validate-reset-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, code }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Code matched! You can now reset your password.");
        navigate("/reset-password", { state: { code, email } });
      } else {
        toast.error(data.msg || "Invalid code. Please try again.");
        inputRefs.current[0].focus();
      }
    } catch (error) {
      toast.error(
        "An error occurred while validating the code. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    if (timerActive) return; // Prevent resending if timer is active

    setIsResending(true);
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

      const data = await response.json();

      if (response.ok) {
        toast.success("Reset code has been resent to your email!");
        setResendTimer(30); // Set timer for 30 seconds
        setTimerActive(true); // Start the timer
      } else {
        toast.error(data.msg || "Failed to resend the code. Please try again.");
      }
    } catch (error) {
      toast.error(
        "An error occurred while resending the code. Please try again."
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="reset-code-container">
      <div className="reset-code-box">
        <div className="reset-code-title">Enter Reset Code</div>
        <div className="reset-code-description">
          A reset code has been sent to your email.
        </div>
        <div className="reset-code-email hidden">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email || ""} readOnly />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="reset-code-input-group">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                className="reset-code-otp-input"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                ref={(ref) => (inputRefs.current[index] = ref)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>
          <button
            className="reset-code-verify-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "Verify Code"}
          </button>
        </form>
        <div className="reset-code-resend-link">
          {timerActive ? (
            <span>You can resend code after {resendTimer} seconds.</span>
          ) : (
            <>
              <span className="dont-receive-code">Don't receive code? </span>
              <span className="resend-code-link" onClick={handleResendCode}>
                {isResending ? "Resending..." : "Resend Code"}
              </span>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetCode;
