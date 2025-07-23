const mongoose = require('mongoose');

const user_collection = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // optional: helps prevent duplicates
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  contact: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  bmi_index: {
    type: String, // can change to Number if you strictly expect numeric BMI
    required: true
  },
  bp: {
    type: String,
    required: true
  },
  diabities: {
    type: String,
    required: true
  },
  record_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User_tbl", user_collection);
