const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createSession,
  getSessions,
  getSessionById,
  deleteSession,
} = require("../controllers/sessionController");

// POST - Create a new session (protected)
router.post("/", auth, createSession);

// GET - Get all sessions (protected)
router.get("/", auth, getSessions);

// GET - Get a single session by ID (protected)
router.get("/:id", auth, getSessionById);

// DELETE - Delete a session (protected)
router.delete("/:id", auth, deleteSession);

module.exports = router;
