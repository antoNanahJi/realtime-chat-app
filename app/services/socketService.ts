import { io, Socket } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from '../types/socket';

// Socket.IO client instance with typed events
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  'http://localhost:3001',
  {
    autoConnect: false, // We'll manually connect when user joins
  }
);

export default socket;
