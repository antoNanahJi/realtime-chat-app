import { useSocket } from '../hooks/useSocket';
import { useTypingIndicator } from '../hooks/useTypingIndicator';
import { Message, User } from '../types/messages';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import UserList from './UserList';

interface ChatContainerProps {
  messages: Message[];
  users: User[];
  currentUser: User | null;
  sendMessage: (content: string) => void;
  onLogout: () => void;
}

const ChatContainer = ({ messages, users, currentUser, sendMessage, onLogout }: ChatContainerProps) => {
  const { isConnected } = useSocket();
  const { typingUsers, notifyTyping, clearTyping } = useTypingIndicator();

  return (
    <div className="container-fluid vh-100 d-flex flex-column">
      <div className="bg-primary text-white p-3 d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Real-Time Chat</h4>
        <div className="d-flex align-items-center gap-3">
          <span
            className={`badge ${
              isConnected ? 'bg-success' : 'bg-danger'
            }`}
          >
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
          {currentUser && (
            <>
              <span className="text-white">
                Welcome, <strong>{currentUser.username}</strong>
              </span>
              <button
                onClick={onLogout}
                className="btn btn-sm btn-outline-light"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      <div className="row flex-grow-1 g-0" style={{ minHeight: 0 }}>
        <div className="col-auto">
          <UserList users={users} currentUserId={currentUser?.id || ''} />
        </div>
        <div className="col d-flex flex-column">
          <MessageList
            messages={messages}
            currentUserId={currentUser?.id || ''}
            typingUsers={typingUsers}
          />
          <ChatInput
            onSendMessage={sendMessage}
            onTyping={notifyTyping}
            onStopTyping={clearTyping}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
