const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  link: String,
  description: String,
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("IMPORTANT_NOTES", noteSchema);
