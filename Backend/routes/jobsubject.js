// routes/jobsubject.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const JobSubject = require('../models/jobsubject'); // Adjust the path as necessary
const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // The uploads folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the filename
    }
});

// Create upload instance
const upload = multer({ storage: storage });

// Add a new job subject with an image
router.post('/jobsubjects', upload.single('image'), async (req, res) => {
    const { category, title, subtitle } = req.body;
    const imageUrl = req.file.path; // Get the path of the uploaded file

    // Validate the request body
    if (!category || !title || !subtitle || !imageUrl) {
        return res.status(422).json({ msg: 'Category, title, subtitle, and image are required' });
    }

    try {
        // Create a new job subject
        const newJobSubject = new JobSubject({ category, title, subtitle, image: imageUrl });
        await newJobSubject.save();
        res.status(201).json({ msg: 'Job subject added', jobSubject: newJobSubject });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ msg: 'Job subject already exists' });
        }
        res.status(500).json({ msg: 'Server error' });
    }
});

// Get all job subjects
router.get('/jobsubjects', async (req, res) => {
    try {
        const jobSubjects = await JobSubject.find();
        res.json(jobSubjects);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
