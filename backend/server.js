const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Vite default port
    methods: ["GET", "POST"]
  }
});

const gameRoutes = require('./routes/gameRoutes');

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', gameRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Mission Defuse Backend Online' });
});

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join a specific game room
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
    // Notify others in room
    socket.to(roomId).emit('player_joined', { playerId: socket.id });
  });

  // Handle attacks (Chaos Mode / Battle Mode interactions)
  socket.on('attack_opponent', ({ roomId, attackType }) => {
    // Broadcast attack to others in the room
    socket.to(roomId).emit('receive_attack', { attackType, attackerId: socket.id });
  });

  // Sync score updates
  socket.on('update_score', ({ roomId, score }) => {
    socket.to(roomId).emit('opponent_score', { playerId: socket.id, score });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
