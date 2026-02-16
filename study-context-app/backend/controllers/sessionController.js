const Session = require("../models/Session");

// Create a new session
exports.createSession = async (req, res) => {
  try {
    const { subject, topic, notes, seconds } = req.body;

    const newSession = new Session({
      subject,
      topic,
      notes,
      seconds,
    });

    const savedSession = await newSession.save();
    res.status(201).json(savedSession);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all sessions
exports.getSessions = async (req, res) => {
  try {
    const sessions = await Session.find().sort({ createdAt: -1 });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single session by ID
exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a session
exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndDelete(req.params.id);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    res.json({ message: "Session deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
