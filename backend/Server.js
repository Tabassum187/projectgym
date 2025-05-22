const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

require('dotenv').config();



const app = express();
const port = process.env.PORT || 3001;
const server = http.createServer(app);
const io = socketIo(server);


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
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Emit a test notification
  socket.emit('notification', {
    message: 'Welcome to FitTrack Pro!',
    timestamp: new Date(),
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});