const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin"); // Your Admin model
const router = express.Router();

// Register a new admin
router.post("/Adminregister", async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  // Ensure all fields are provided
  if (!email || !password || !confirmPassword) {
    return res.status(422).json({ msg: "All fields are required" });
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "Passwords do not match" });
  }

  try {
    // Check if an admin already exists with the same email
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ msg: "Admin already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({
      email,
      password: hashedPassword,
    });

    // Save the new admin to the database
    await newAdmin.save();

    // Return success message
    res.status(201).json({ msg: "Admin registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Login admin
router.post("/Adminlogin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ msg: "Admin not found" });

    // Compare the password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid Email or Password" });

    // Generate JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the token back to the client
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
