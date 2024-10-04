// models/jobsubject.js
const mongoose = require('mongoose');

const jobSubjectSchema = new mongoose.Schema({
    category: { type: String, required: true },   // Field for category
    title: { type: String, required: true },      // Field for title
    subtitle: { type: String, required: true },   // Field for subtitle
    image: { type: String, required: true },      // Field for image URL
}, { timestamps: true });

const JobSubject = mongoose.model('JobSubject', jobSubjectSchema);

module.exports = JobSubject;
