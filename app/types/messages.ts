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
}

export interface ChatState {
  messages: Message[];
  users: User[];
  currentUser: User | null;
  isConnected: boolean;
}
