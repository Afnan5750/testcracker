const express = require("express");
const router = express.Router();
const JobChapter = require("../models/JobChapter"); // Import the JobChapter model

// Route to get job chapters based on category
router.get("/:category", async (req, res) => {
    const category = req.params.category;
    const normalizedCategory =
        category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

    try {
        // Fetch job chapters based on category from the database
        const jobChapters = await JobChapter.find({ category: normalizedCategory });

        if (jobChapters.length > 0) {
            res.json(jobChapters);
        } else {
            res.status(404).json({ message: "No job chapters found for this category." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching job chapters!" });
    }
});

// POST route to add a new job chapter
router.post("/add", async (req, res) => {
    const { category, number, name } = req.body;

    try {
        // Create a new job chapter document
        const newJobChapter = new JobChapter({ category, number, name });

        // Save to the database
        await newJobChapter.save();

        res.status(201).json({ message: "Job chapter added successfully!", jobChapter: newJobChapter });
    } catch (error) {
        res.status(500).json({ message: "Error adding job chapter!", error });
    }
});

module.exports = router;
