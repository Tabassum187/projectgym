const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

require('dotenv').config();

const supportRoutes = require('./Route/support');       // adjust path as per your project
const progressRoutes = require('./Route/progress_route');
const foodRoutes = require('./Route/foodRoutes');
const reminderRoutes = require('./Route/reminderRoutes');
const workoutRoute = require('./Route/workout_route'); 
const stepRoutes = require('./Route/Step'); 




const app = express();
const port = process.env.PORT || 3001;
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  }
});

// ✅ CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/support', supportRoutes);
app.use('/api/progress', progressRoutes);
app.use('/gym', foodRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/gym', workoutRoute); 
app.use('/api',stepRoutes); 
 // If you want all gym routes under /gym

// ✅ MongoDB connection
const uri = process.env.MONGO_URI;
if (!uri) {
  console.error("❌ MONGO_URI not set in .env file");
  process.exit(1);
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ Connected to MongoDB");

  // Start server only after DB connection
  server.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
})
.catch(err => {
  console.error("❌ MongoDB connection error:", err);
});

// ✅ Socket.io setup
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.emit('notification', {
    message: 'Welcome to FitTrack Pro!',
    timestamp: new Date(),
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
