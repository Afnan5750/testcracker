require('dotenv').config(); // Ensure this is at the top

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth'); // Ensure this is the correct path
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {

})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Use authentication routes
app.use('/api/user', authRoutes); // Correct route for user endpoints

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
