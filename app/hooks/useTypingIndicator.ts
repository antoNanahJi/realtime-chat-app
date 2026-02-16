import { useState, useEffect, useCallback, useRef } from 'react';
import socket from '../services/socketService';

interface TypingUser {
  userId: string;
  username: string;
}

export const useTypingIndicator = () => {
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Listen for users typing
    const onUserTyping = (userId: string, username: string) => {
      setTypingUsers((prev) => {
        // Don't add duplicate
        if (prev.some((u) => u.userId === userId)) {
          return prev;
        }
        return [...prev, { userId, username }];
      });
    };

    // Listen for users stopped typing
    const onUserStoppedTyping = (userId: string) => {
      setTypingUsers((prev) => prev.filter((u) => u.userId !== userId));
    };

    socket.on('user:typing', onUserTyping);
    socket.on('user:stopped-typing', onUserStoppedTyping);

    return () => {
      socket.off('user:typing', onUserTyping);
      socket.off('user:stopped-typing', onUserStoppedTyping);
    };
  }, []);

  const notifyTyping = useCallback(() => {
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Emit typing start
    socket.emit('typing:start');

    // Set timeout to emit typing stop after 2 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('typing:stop');
    }, 2000);
  }, []);

  const clearTyping = useCallback(() => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    socket.emit('typing:stop');
  }, []);

  return { typingUsers, notifyTyping, clearTyping };
};
