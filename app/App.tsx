import { useState, FormEvent } from 'react';
import ChatContainer from './components/ChatContainer';
import { useChat } from './hooks/useChat';
import Alert from './components/Alert';

function App() {
  const [username, setUsername] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const { messages, users, currentUser, error, joinChat, sendMessage, leaveChat } = useChat();

  const handleJoin = (e: FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      joinChat(username.trim());
      setHasJoined(true);
    }
  };

  const handleLogout = () => {
    leaveChat();
    setHasJoined(false);
    setUsername('');
  };

  if (!hasJoined) {
    return (
      <div className="container vh-100 d-flex align-items-center justify-content-center">
        <div className="card shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
          <div className="card-body p-4">
            <h2 className="card-title text-center mb-4">Join Chat Room</h2>
            {error && <Alert>{error}</Alert>}
            <form onSubmit={handleJoin}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Enter your username
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="username"
                  placeholder="Your name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                  required
                  minLength={2}
                  maxLength={20}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg w-100"
                disabled={username.trim().length < 2}
              >
                Join Chat
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ChatContainer
      messages={messages}
      users={users}
      currentUser={currentUser}
      sendMessage={sendMessage}
      onLogout={handleLogout}
    />
  );
}

export default App;