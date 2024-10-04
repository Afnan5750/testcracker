const mongoose = require("mongoose");

const mcqSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    chapter: { type: Number, required: true },
    question: { type: String, required: true },
    options: [
        {
            text: { type: String, required: true },
            isCorrect: { type: Boolean, required: true },
        },
    ],
    explanation: { type: String, required: true },
});

const Mcq = mongoose.model("Mcq", mcqSchema);
module.exports = Mcq;
