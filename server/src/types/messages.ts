export interface Message {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: Date;
}

export interface User {
  id: string;
  username: string;
  socketId?: string;
}
