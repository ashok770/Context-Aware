require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const sessionRoutes = require("./routes/sessions");
const taskRoutes = require("./routes/tasks");
const workspaceSummaryRoutes = require("./routes/workspaceSummary");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// AI Summary Helper
const generateAISummary = async (topic, notes) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `I am a CSE student. Summarize my study session for the topic "${topic}". 
    My notes are: "${notes}". 
    Provide a 2-sentence summary and one "Key Concept" I learned. 
    If notes are empty, just provide a brief overview of the topic.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "AI Summary currently unavailable.";
  }
};

module.exports = { generateAISummary };

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.get("/api/health", (req, res) => {
  res.json({ message: "Backend is running" });
});

app.use("/api/sessions", sessionRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api", workspaceSummaryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// NOTE: session delete handled in sessions route; tasks route registered above

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports.generateAISummary = generateAISummary;
