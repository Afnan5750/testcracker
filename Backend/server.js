require("dotenv").config(); // Ensure this line is at the top

const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const subjectRoutes = require("./routes/subject");
const jobSubjectRoutes = require("./routes/jobsubject");
const chapterRoutes = require("./routes/chapter");
const jobchapterRoutes = require("./routes/jobchapter");
const mcqRoutes = require("./routes/mcqs");
const jobMcqRoutes = require("./routes/jobmcqs");
const adminRoutes = require("./routes/admin");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(cors()); // Enable CORS

// Serve the uploads directory for accessing images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB using the URI from environment variables
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Use authentication and subject routes
app.use("/api", authRoutes);
app.use("/api", adminRoutes);

app.use("/api", subjectRoutes);
app.use("/api", jobSubjectRoutes);

app.use("/api/chapters", chapterRoutes);
app.use("/api/job-chapters", jobchapterRoutes);

app.use("/api/mcqs", mcqRoutes);
app.use("/api/job-mcqs", jobMcqRoutes);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
