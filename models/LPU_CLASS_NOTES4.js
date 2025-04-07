const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  link: String,
  description: String,
  uploadedAt: { type: Date, default: Date.now }
});

// Fix OverwriteModelError here too
module.exports = mongoose.models.LPU_CLASS_NOTES4 || mongoose.model("LPU_CLASS_NOTES4", noteSchema);
