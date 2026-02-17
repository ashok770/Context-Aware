const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  topic: { type: String },
  notes: { type: String },
  seconds: { type: Number, default: 0 },
  // New field to store the resource URLs
  resources: { type: [String], default: [] },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Session", SessionSchema);
