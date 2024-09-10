import React from "react";
import "../styles/ProfilePage.css"; // Import the CSS file for styling

const ProfilePage = () => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Profile Page</h2>
        <p>Update your profile information and change your password.</p>
      </div>
      <form className="profile-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Current Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your current password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="Enter a new password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmNewPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            placeholder="Confirm your new password"
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
