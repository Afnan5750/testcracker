const mongoose = require("mongoose");

const jobMcqSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true }, // Field for job title
    chapter: { type: Number, required: true },  // Chapter number or identifier
    question: { type: String, required: true },  // The question text
    options: [
        {
            text: { type: String, required: true }, // Text for each option
            isCorrect: { type: Boolean, required: true }, // Indicator for the correct answer
        },
    ],
    explanation: { type: String, required: true }, // Explanation for the correct answer
});

const JobMcq = mongoose.model("JobMcq", jobMcqSchema);
module.exports = JobMcq;
