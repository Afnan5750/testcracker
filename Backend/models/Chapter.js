const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
    category: { type: String, required: true },
    number: { type: Number, required: true },
    name: { type: String, required: true },
});

const Chapter = mongoose.model('Chapter', chapterSchema);

module.exports = Chapter;
