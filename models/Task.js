const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
  completedStatus: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Task", taskSchema);
