import { useState, FormEvent, ChangeEvent } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onTyping: () => void;
  onStopTyping: () => void;
}

const ChatInput = ({
  onSendMessage,
  onTyping,
  onStopTyping,
}: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      onStopTyping();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    onTyping();
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border-top">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Type a message..."
          value={message}
          onChange={handleChange}
          autoFocus
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!message.trim()}
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
