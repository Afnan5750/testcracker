const mongoose = require('mongoose');

const jobChapterSchema = new mongoose.Schema({
    category: { type: String, required: true },
    number: { type: Number, required: true },
    name: { type: String, required: true },
});

const JobChapter = mongoose.model('JobChapter', jobChapterSchema);

module.exports = JobChapter;
