import { Message } from '../types/messages';

interface ChatMessageProps {
  message: Message;
  isOwnMessage: boolean;
}

const ChatMessage = ({ message, isOwnMessage }: ChatMessageProps) => {
  const formatTime = (timestamp: Date) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`mb-3 ${isOwnMessage ? 'text-end' : 'text-start'}`}>
      <div
        className={`d-inline-block p-2 rounded ${
          isOwnMessage ? 'bg-primary text-white' : 'bg-light'
        }`}
        style={{ maxWidth: '70%' }}
      >
        {!isOwnMessage && (
          <div className="fw-bold small text-primary mb-1">
            {message.username}
          </div>
        )}
        <div>{message.content}</div>
        <div
          className={`small mt-1 ${
            isOwnMessage ? 'text-white-50' : 'text-muted'
          }`}
        >
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
