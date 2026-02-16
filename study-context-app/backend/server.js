require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const sessionRoutes = require("./routes/sessions");

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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
