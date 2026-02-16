import { io, Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from '../types/socket';

// Socket.IO client instance with typed events
// Connect to same origin - Vite will proxy to port 3000
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io({
  autoConnect: false, // We'll manually connect when user joins
});

export default socket;
