const express = require("express");
const router = express.Router();
const Chapter = require("../models/Chapter"); // Import the Chapter model

// Route to get chapters based on category
router.get("/:category", async (req, res) => {
    const category = req.params.category;
    const normalizedCategory =
        category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

    try {
        // Fetch chapters based on category from the database
        const chapters = await Chapter.find({ category: normalizedCategory });

        if (chapters.length > 0) {
            res.json(chapters);
        } else {
            res.status(404).json({ message: "No chapters found for this category." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching chapters!" });
    }
});

// POST route to add a new chapter
router.post("/add", async (req, res) => {
    const { category, number, name } = req.body;

    try {
        // Create a new chapter document
        const newChapter = new Chapter({ category, number, name });

        // Save to the database
        await newChapter.save();

        res.status(201).json({ message: "Chapter added successfully!", chapter: newChapter });
    } catch (error) {
        res.status(500).json({ message: "Error adding chapter!", error });
    }
});



module.exports = router;
