import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/ProfilePage.css"; // Import the CSS file for styling
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons from react-icons

const ProfilePage = () => {
  const [userData, setUserData] = useState({ username: "", email: "" });
  const [newUsername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:5001/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData({
          username: response.data.username,
          email: response.data.email,
        });
        setNewUsername(response.data.username);
      } catch (error) {
        console.error(
          "Error fetching user data:",
          error.response?.data || error.message
        );
        toast.error("Error fetching user data");
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      // Update the username if it's changed
      if (newUsername && newUsername !== userData.username) {
        await axios.patch(
          "http://localhost:5001/api/user",
          { username: newUsername },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      // Update the password if provided
      if (password && newPassword && confirmNewPassword) {
        if (newPassword !== confirmNewPassword) {
          toast.error("New passwords do not match");
          return;
        }

        await axios.patch(
          "http://localhost:5001/api/user/password",
          { password, newPassword, confirmNewPassword },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      // Clear the password fields after successful update
      setPassword("");
      setNewPassword("");
      setConfirmNewPassword("");

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
      toast.error("Error updating profile");
    }
  };

  return (
    <div className="profile-container">
      <ToastContainer />
      <div className="profile-header">
        <div className="avatar-container">
          <img
            src="src/assets/Profile.jpg"
            alt="Profile Picture"
            className="avatar-image"
          />
        </div>
        <p>Update your profile information and change your password.</p>
      </div>

      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={userData.email}
            readOnly
            required
            autoComplete="email"
          />
        </div>
        <div className="form-group password-input">
          <label htmlFor="password">Current Password</label>
          <div className="input-with-icon">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your current password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <span
              className="toggle-password-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <div className="form-group password-input">
          <label htmlFor="newPassword">New Password</label>
          <div className="input-with-icon">
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              placeholder="Enter a new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
            />
            <span
              className="toggle-password-icon"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <div className="form-group password-input">
          <label htmlFor="confirmNewPassword">Confirm New Password</label>
          <div className="input-with-icon">
            <input
              type={showConfirmNewPassword ? "text" : "password"}
              id="confirmNewPassword"
              name="confirmNewPassword"
              placeholder="Confirm your new password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              autoComplete="new-password"
            />
            <span
              className="toggle-password-icon"
              onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
            >
              {showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <button type="submit" className="submit-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
