import { useState, useEffect, useCallback } from 'react';
import { Message, User } from '../types/messages';
import socket from '../services/socketService';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Listen for message history
    const onMessageHistory = (history: Message[]) => {
      setMessages(history);
    };

    // Listen for new messages
    const onReceiveMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    // Listen for users list updates
    const onUsersList = (usersList: User[]) => {
      setUsers(usersList);
    };

    // Listen for user joined
    const onUserJoined = (user: User) => {
      console.log(`${user.username} joined the chat`);
    };

    // Listen for user left
    const onUserLeft = (userId: string, username: string) => {
      console.log(`${username} left the chat`);
    };

    // Listen for username taken error
    const onUsernameTaken = () => {
      setError('Username is already taken. Please choose another.');
      socket.disconnect();
    };

    socket.on('message:history', onMessageHistory);
    socket.on('receive:message', onReceiveMessage);
    socket.on('users:list', onUsersList);
    socket.on('user:joined', onUserJoined);
    socket.on('user:left', onUserLeft);
    socket.on('error:username-taken', onUsernameTaken);

    return () => {
      socket.off('message:history', onMessageHistory);
      socket.off('receive:message', onReceiveMessage);
      socket.off('users:list', onUsersList);
      socket.off('user:joined', onUserJoined);
      socket.off('user:left', onUserLeft);
      socket.off('error:username-taken', onUsernameTaken);
    };
  }, []);

  const joinChat = useCallback((username: string) => {
    setError(null);
    socket.connect();
    socket.emit('join', username);
    setCurrentUser({ id: '', username }); // ID will be set by server
  }, []);

  const sendMessage = useCallback((content: string) => {
    if (content.trim()) {
      socket.emit('send:message', content);
    }
  }, []);

  const leaveChat = useCallback(() => {
    socket.disconnect();
    setCurrentUser(null);
    setMessages([]);
    setUsers([]);
  }, []);

  return {
    messages,
    users,
    currentUser,
    error,
    joinChat,
    sendMessage,
    leaveChat,
  };
};
