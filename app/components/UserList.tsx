import { User } from '../types/messages';

interface UserListProps {
  users: User[];
  currentUserId: string;
}

const UserList = ({ users, currentUserId }: UserListProps) => {
  return (
    <div className="border-end p-3" style={{ minWidth: '200px' }}>
      <h6 className="mb-3">Online Users ({users.length})</h6>
      <div className="list-group list-group-flush">
        {users.map((user) => (
          <div
            key={user.id}
            className="list-group-item list-group-item-action border-0 px-2 py-1"
          >
            <div className="d-flex align-items-center">
              <span
                className="badge bg-success rounded-circle me-2"
                style={{ width: '8px', height: '8px' }}
              ></span>
              <span>
                {user.username}
                {user.id === currentUserId && (
                  <small className="text-muted"> (you)</small>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
