const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subject: { type: String, required: true },
  topic: { type: String },
  notes: { type: String },
  summary: { type: String },
  seconds: { type: Number, default: 0 },
  resources: { type: [String], default: [] },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Session", SessionSchema);
