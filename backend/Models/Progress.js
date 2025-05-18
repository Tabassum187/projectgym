const express = require('express');
const router = express.Router();
const Progress = require('../Models/Progress'); // your current schema
const mongoose = require('mongoose');

// POST: Add new progress entry
router.post('/', async (req, res) => {
  try {
    const { userId, weight, chest, waist, hips, bodyFat, date } = req.body;

    const newProgress = new Progress({
      userId,
      weight,
      chest,
      waist,
      hips,
      bodyFat,
      date
    });

    const saved = await newProgress.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error creating progress:', error);
    res.status(500).json({ msg: 'Failed to create progress' });
  }
});

// PUT: Update existing progress entry
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedProgress = await Progress.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedProgress) {
      return res.status(404).json({ msg: 'Progress not found' });
    }

    res.status(200).json(updatedProgress);
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ msg: 'Failed to update progress' });
  }
});

module.exports = router;
