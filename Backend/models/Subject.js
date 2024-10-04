const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    category: { type: String, required: true },   // Field for category
    title: { type: String, required: true },      // Field for title
    subtitle: { type: String, required: true },   // Field for subtitle
    image: { type: String, required: true },
}, { timestamps: true });

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;