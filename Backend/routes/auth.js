const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Create a transporter for nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Generate a six-digit code
const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Forgot password
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'User not found' });

        const code = generateCode();
        user.resetPasswordCode = code;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        await user.save();

        const mailOptions = {
            to: user.email,
            from: `"TestCracker" <${process.env.EMAIL_USER}>`,  // Display name and email address
            subject: 'Password Reset Request',
            html: `
                <p>Dear ${user.username},</p>
                <p>We have received a request to reset the password associated with your account.</p>
                <p style="font-size: 18px; font-weight: bold;">Your password reset code is: <span style="color: #007bff;">${code}</span></p>
                <p>Please use this code within the next 1 hour. After that, it will expire for security reasons.</p>
                <p>If you did not request this, please ignore this email.</p>
                <p>Best regards,<br>The TestCracker Team</p>
            `,
        };



        transporter.sendMail(mailOptions, (error) => {
            if (error) return res.status(500).json({ msg: 'Error sending email' });
            res.json({ msg: 'Password reset code sent' }); // Success message
        });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Code Validation
router.post('/validate-reset-code', async (req, res) => {
    const { code } = req.body;

    try {
        const user = await User.findOne({

            resetPasswordCode: code,
            resetPasswordExpires: { $gt: Date.now() },
        });

        // Check if the user was found
        if (!user) {
            return res.status(400).json({ msg: 'Invalid or expired reset code.' });
        }

        // Return success message if the code is valid
        res.json({ msg: 'Code is valid.' });
    } catch (err) {
        console.error('Error validating reset code:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Reset password
router.post('/reset-password', async (req, res) => {
    const { email, code, newPassword, confirmNewPassword } = req.body;

    console.log('Reset Password Request:', { email, code });

    // Basic input validation
    if (!email || !code || !newPassword || !confirmNewPassword) {
        return res.status(422).json({ msg: 'All fields are required' });
    }

    if (newPassword !== confirmNewPassword) {
        console.log('New passwords do not match');
        return res.status(400).json({ msg: 'New passwords do not match' });
    }

    try {
        const user = await User.findOne({
            email,
            resetPasswordCode: code,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            console.log('Invalid or expired code for user:', email);
            return res.status(400).json({ msg: 'Invalid or expired code' });
        }

        // Hash the new password
        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordCode = undefined; // Clear the code
        user.resetPasswordExpires = undefined; // Clear the expiration

        await user.save();

        res.json({ msg: 'Password has been reset successfully' });
    } catch (err) {
        console.error('Server error during password reset:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ msg: 'User registered' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Email or Password' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Get user details
router.get('/user', async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) return res.status(401).json({ msg: 'Access denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password'); // Exclude password from user object
        if (!user) return res.status(404).json({ msg: 'User not found' });

        res.json({ username: user.username, email: user.email });
    } catch (err) {
        res.status(403).json({ msg: 'Invalid token' });
    }
});

// Update user details
router.patch('/user', async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) return res.status(401).json({ msg: 'Access denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) return res.status(404).json({ msg: 'User not found' });

        const { username } = req.body;
        if (username) user.username = username;

        await user.save();
        res.json({ msg: 'User updated' });
    } catch (err) {
        res.status(403).json({ msg: 'Invalid token' });
    }
});

// Update user password
router.patch('/user/password', async (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) return res.status(401).json({ msg: 'Access denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) return res.status(404).json({ msg: 'User not found' });

        const { password, newPassword, confirmNewPassword } = req.body;

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Current password is incorrect' });

        if (newPassword !== confirmNewPassword) return res.status(400).json({ msg: 'New passwords do not match' });

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ msg: 'Password updated' });
    } catch (err) {
        res.status(403).json({ msg: 'Invalid token' });
    }
});

module.exports = router;
