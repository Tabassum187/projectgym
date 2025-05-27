const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  workoutName: {
    type: String,
    required: true
  },
  workoutType: {
    type: String,
    enum: ['Strength Training', 'Cardio', 'Flexibility', 'Balance', 'Other'], // example types, you can adjust
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  caloriesBurned: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Workout', workoutSchema);
