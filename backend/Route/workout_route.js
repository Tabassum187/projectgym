// const express = require('express');
// const router = express.Router();
// const Workout = require('../Models/Workout'); // adjust path as needed

// // POST - Add new workout
// router.post('/workout', async (req, res) => {
//   try {
//     const newWorkout = new Workout(req.body);
//     const savedWorkout = await newWorkout.save();
//     res.status(201).json(savedWorkout);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to save workout' });
//   }
// });

// // GET - Get all workouts
// router.get('/workout', async (req, res) => {
//   try {
//     const workouts = await Workout.find();
//     res.json(workouts);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch workouts' });
//   }
// });

// // DELETE - Delete one workout by ID
// router.delete('/workout/:id', async (req, res) => {
//   try {
//     await Workout.findByIdAndDelete(req.params.id);
//     res.sendStatus(204);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to delete workout' });
//   }
// });

// // PUT - Update a workout entry by ID
// router.put('/workout/:id', async (req, res) => {
//   try {
//     const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedWorkout);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to update workout' });
//   }
// });

// module.exports = router;
