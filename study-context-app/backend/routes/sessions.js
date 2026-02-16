const express = require('express');
const router = express.Router();
const {
  createSession,
  getSessions,
  getSessionById,
  deleteSession,
} = require('../controllers/sessionController');

// POST - Create a new session
router.post('/', createSession);

// GET - Get all sessions
router.get('/', getSessions);

// GET - Get a single session by ID
router.get('/:id', getSessionById);

// DELETE - Delete a session
router.delete('/:id', deleteSession);

module.exports = router;
