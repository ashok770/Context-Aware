const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    topic: String,
    notes: String,
    seconds: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Session', sessionSchema);
