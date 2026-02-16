const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
    category: { type: String, default: "general" },
    priority: { type: String, default: "medium" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Task", taskSchema);
