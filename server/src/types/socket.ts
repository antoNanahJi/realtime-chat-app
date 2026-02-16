import { Message, User } from './messages';

export interface ClientToServerEvents {
  join: (username: string) => void;
  'send:message': (message: string) => void;
  'typing:start': () => void;
  'typing:stop': () => void;
}

export interface ServerToClientEvents {
  'user:joined': (user: User) => void;
  'receive:message': (message: Message) => void;
  'users:list': (users: User[]) => void;
  'user:left': (userId: string, username: string) => void;
  'user:typing': (userId: string, username: string) => void;
  'user:stopped-typing': (userId: string) => void;
  'message:history': (messages: Message[]) => void;
  'error:username-taken': () => void;
}

export interface InterServerEvents {}

export interface SocketData {
  userId: string;
  username: string;
}
