import { useEffect, useRef } from 'react';
import { Message } from '../types/messages';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
  typingUsers: { userId: string; username: string }[];
}

const MessageList = ({
  messages,
  currentUserId,
  typingUsers,
}: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingUsers]);

  return (
    <div
      className="flex-grow-1 overflow-auto p-3"
      style={{ height: '500px' }}
    >
      {messages.length === 0 ? (
        <div className="text-center text-muted mt-5">
          <p>No messages yet. Start the conversation!</p>
        </div>
      ) : (
        messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            isOwnMessage={message.userId === currentUserId}
          />
        ))
      )}
      <TypingIndicator typingUsers={typingUsers} />
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
