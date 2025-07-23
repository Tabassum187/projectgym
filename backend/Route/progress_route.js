// const express = require('express');
// const router = express.Router();
// const Progress = require('../Models/Progress'); // adjust path if needed

// // POST - Add new progress entry
// router.post('/progress', async (req, res) => {
//   try {
//     const newProgress = new Progress(req.body);
//     const saved = await newProgress.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to save progress' });
//   }
// });

// // GET - Get all progress entries
// router.get('/progress', async (req, res) => {
//   try {
//     const data = await Progress.find();
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch progress' });
//   }
// });

// // ✅ NEW: GET progress entries for a specific user
// router.get('/userprofile/:userId', async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const userProgress = await Progress.find({ userId });
//     res.json(userProgress);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to fetch user progress' });
//   }
// });

// // DELETE - Delete one progress entry by ID
// router.delete('/progress/:id', async (req, res) => {
//   try {
//     await Progress.findByIdAndDelete(req.params.id);
//     res.sendStatus(204);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to delete progress' });
//   }
// });

// module.exports = router;
