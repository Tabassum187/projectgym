const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();



const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const foodRoutes = require('./routes/foodRoutes');
const progressRoutes = require('./routes/progressRoutes');

// Use Routes
app.use('/gym', foodRoutes);
app.use('/gym', progressRoutes);

// MongoDB connection
const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("❌ MONGO_URI not set in .env file");
  process.exit(1); // Stop the server if no DB URI
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
