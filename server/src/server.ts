import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from './types/socket';
import { Message, User } from './types/messages';

const app = express();
const httpServer = createServer(app);

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

// Enable CORS for Express
app.use(cors());

// In-memory storage
const users = new Map<string, User>();
const messages: Message[] = [];

// Helper function to generate unique ID
function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Handle user join
  socket.on('join', (username: string) => {
    // Check if username already exists
    const existingUser = Array.from(users.values()).find(
      (user) => user.username === username
    );

    if (existingUser) {
      socket.emit('error:username-taken');
      return;
    }

    // Create new user
    const userId = generateId();
    const user: User = {
      id: userId,
      username,
      socketId: socket.id,
    };

    users.set(socket.id, user);
    socket.data.userId = userId;
    socket.data.username = username;

    console.log(`User joined: ${username} (${userId})`);

    // Send message history to the new user
    socket.emit('message:history', messages);

    // Send current users list to the new user
    const usersList = Array.from(users.values()).map(({ id, username }) => ({
      id,
      username,
    }));
    socket.emit('users:list', usersList);

    // Broadcast to all clients that a new user joined
    io.emit('user:joined', { id: userId, username });

    // Broadcast updated users list to all clients
    io.emit('users:list', usersList);
  });

  // Handle incoming messages
  socket.on('send:message', (content: string) => {
    const user = users.get(socket.id);
    if (!user) {
      return;
    }

    const message: Message = {
      id: generateId(),
      userId: user.id,
      username: user.username,
      content,
      timestamp: new Date(),
    };

    messages.push(message);
    console.log(`Message from ${user.username}: ${content}`);

    // Broadcast message to all clients
    io.emit('receive:message', message);
  });

  // Handle typing start
  socket.on('typing:start', () => {
    const user = users.get(socket.id);
    if (!user) {
      return;
    }

    // Broadcast to all other clients
    socket.broadcast.emit('user:typing', user.id, user.username);
  });

  // Handle typing stop
  socket.on('typing:stop', () => {
    const user = users.get(socket.id);
    if (!user) {
      return;
    }

    // Broadcast to all other clients
    socket.broadcast.emit('user:stopped-typing', user.id);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      console.log(`User disconnected: ${user.username} (${user.id})`);
      users.delete(socket.id);

      // Broadcast to all clients that user left
      io.emit('user:left', user.id, user.username);

      // Broadcast updated users list
      const usersList = Array.from(users.values()).map(({ id, username }) => ({
        id,
        username,
      }));
      io.emit('users:list', usersList);
    } else {
      console.log(`Client disconnected: ${socket.id}`);
    }
  });
});

export { httpServer, io };
