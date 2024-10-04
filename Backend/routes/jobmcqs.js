const express = require("express");
const router = express.Router();
const JobMcq = require("../models/JobMcqs"); // Adjust the path as necessary

// POST: Add Job MCQ to a job title/chapter
router.post("/add-job-mcq", async (req, res) => {
    const { jobTitle, chapter, question, options, explanation } = req.body;

    // Validation check
    if (!jobTitle || !chapter || !question || options.length !== 4 || !explanation) {
        return res.status(400).json({ message: "All fields are required, and there must be 4 options." });
    }

    // Ensure only one correct option
    const correctOptions = options.filter(option => option.isCorrect);
    if (correctOptions.length !== 1) {
        return res.status(400).json({ message: "There must be exactly one correct option." });
    }

    try {
        // Check if Job MCQ already exists for the same question, job title, and chapter
        const existingJobMcq = await JobMcq.findOne({ jobTitle, chapter, question });
        if (existingJobMcq) {
            return res.status(400).json({ message: "Job MCQ with this question already exists in the chapter." });
        }

        // Create a new Job MCQ
        const newJobMcq = new JobMcq({
            jobTitle,
            chapter,
            question,
            options,
            explanation,
        });

        // Save the Job MCQ
        await newJobMcq.save();

        return res.status(201).json({ message: "Job MCQ added successfully", mcq: newJobMcq });
    } catch (error) {
        console.error("Error adding Job MCQ:", error);
        return res.status(500).json({ message: "Server error", error });
    }
});

// GET: Fetch Job MCQs for a job title and chapter
router.get("/:jobTitle/:chapter", async (req, res) => {
    const { jobTitle, chapter } = req.params;

    try {
        const jobMcqs = await JobMcq.find({ jobTitle, chapter });
        if (jobMcqs.length === 0) {
            return res.status(404).json({ message: "No Job MCQs found for this job title and chapter." });
        }
        res.json(jobMcqs);
    } catch (error) {
        console.error("Error fetching Job MCQs:", error);
        res.status(500).json({ message: "Error fetching Job MCQs", error });
    }
});

module.exports = router;
