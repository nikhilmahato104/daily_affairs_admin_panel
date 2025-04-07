const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  link: String,
  description: String,
  uploadedAt: { type: Date, default: Date.now }
});

// ✅ Fix for OverwriteModelError
module.exports = mongoose.models.LPU_CLASS_NOTES3 || mongoose.model("LPU_CLASS_NOTES3", noteSchema);
