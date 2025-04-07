const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  link: String,
  description: String,
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("LPU_CLASS_NOTES2", noteSchema);
