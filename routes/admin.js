const express = require('express');
const router = express.Router();

// Import all category models
const Notes1 = require('../models/LPU_CLASS_NOTES1');
const Notes2 = require('../models/LPU_CLASS_NOTES2');
const Notes3 = require('../models/LPU_CLASS_NOTES3');
const Notes4 = require('../models/LPU_CLASS_NOTES4');
const CurrentAffairs = require('../models/CURRENT_AFFAIRS');
const ImportantNotes = require('../models/IMPORTANT_NOTES');

// Map category names to models
const categoryModels = {
  LPU_CLASS_NOTES1: Notes1,
  LPU_CLASS_NOTES2: Notes2,
  LPU_CLASS_NOTES3: Notes3,
  LPU_CLASS_NOTES4: Notes4,
  CURRENT_AFFAIRS: CurrentAffairs,
  IMPORTANT_NOTES: ImportantNotes,
};

// =========================
// Render Upload Page
// =========================

// =========================
// Admin Dashboard Page
// =========================
router.get('/', (req, res) => {
    res.render('admin_dashboard');
  });
  
router.get('/upload', (req, res) => {
  res.render('upload', { categories: Object.keys(categoryModels) });
});

// =========================
// Handle Upload Submission
// =========================
router.post('/upload', async (req, res) => {
  const { title, link, description, category } = req.body;

  const Model = categoryModels[category];
  if (!Model) return res.send('Invalid category.');

  try {
    await new Model({ title, link, description }).save();
    res.redirect(`/admin/view?category=${category}`);
  } catch (err) {
    res.status(500).send('Error uploading note.');
  }
});

// =========================
// View All Notes (All Categories Combined)
// =========================
router.get('/view', async (req, res) => {
    const allNotes = [];
  
    try {
      for (const [category, Model] of Object.entries(categoryModels)) {
        const notes = await Model.find();
        allNotes.push({ category, notes });
      }
      res.render('view', { allNotes });
    } catch (err) {
      res.status(500).send('Error loading all notes.');
    }
  });

// =========================
// Delete a Note by ID
// =========================
router.post('/delete', async (req, res) => {
  const { id, category } = req.body;
  const Model = categoryModels[category];
  if (!Model) return res.send('Invalid category.');

  try {
    await Model.findByIdAndDelete(id);
    res.redirect(`/admin/view?category=${category}`);
  } catch (err) {
    res.status(500).send('Error deleting note.');
  }
});

module.exports = router;
