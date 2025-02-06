const express = require("express");
const router = express.Router();
const Mcq = require("../models/Mcqs");

// POST: Add MCQ to a subject/chapter
router.post("/add-mcq", async (req, res) => {
  const { subject, chapter, question, options, explanation } = req.body;

  // Validation check
  if (
    !subject ||
    !chapter ||
    !question ||
    options.length !== 4 ||
    !explanation
  ) {
    return res.status(400).json({
      message: "All fields are required, and there must be 4 options.",
    });
  }

  // Ensure only one correct option
  const correctOptions = options.filter((option) => option.isCorrect);
  if (correctOptions.length !== 1) {
    return res
      .status(400)
      .json({ message: "There must be exactly one correct option." });
  }

  try {
    // Check if MCQ already exists for the same question, subject, and chapter
    const existingMcq = await Mcq.findOne({ subject, chapter, question });
    if (existingMcq) {
      return res.status(400).json({
        message: "MCQ with this question already exists in the chapter.",
      });
    }

    // Create a new MCQ
    const newMcq = new Mcq({
      subject,
      chapter,
      question,
      options,
      explanation,
    });

    // Save the MCQ
    await newMcq.save();

    return res
      .status(201)
      .json({ message: "MCQ added successfully", mcq: newMcq });
  } catch (error) {
    console.error("Error adding MCQ:", error);
    return res.status(500).json({ message: "Server error", error });
  }
});

// GET: Fetch Total MCQs Number for a subject and chapter
router.get("/:subject/total-mcqs", async (req, res) => {
  const { subject } = req.params;

  try {
    const totalMCQs = await Mcq.countDocuments({ subject });
    res.json({ subject, totalMCQs });
  } catch (error) {
    console.error("Error counting MCQs:", error);
    res.status(500).json({ message: "Error counting MCQs", error });
  }
});

// GET: Fetch MCQs for a subject and chapter
router.get("/:subject/:chapter", async (req, res) => {
  const { subject, chapter } = req.params;

  try {
    const mcqs = await Mcq.find({ subject, chapter });
    if (mcqs.length === 0) {
      return res
        .status(404)
        .json({ message: "No MCQs found for this subject and chapter." });
    }
    res.json(mcqs);
  } catch (error) {
    console.error("Error fetching MCQs:", error);
    res.status(500).json({ message: "Error fetching MCQs", error });
  }
});

module.exports = router;
