const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
    category: { type: String, default: "general" },
    priority: { type: String, default: "medium" },
    dueDate: { type: Date, default: null },
    resources: { type: [String], default: [] },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Task", taskSchema);
