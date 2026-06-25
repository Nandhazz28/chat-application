import { useState } from "react";
import { searchUsers } from "../../services/user.services";
import { createConversation } from "../../services/conversation.services";

const UserSearch = ({ onConversationCreated }) => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      if (!query.trim()) return;

      const users = await searchUsers(query);

      console.log("USERS:", users);

      setUsers(users);
    } catch (error) {
      console.error(error);
    }
  };
  const handleStartChat = async (userId) => {
    try {
      setLoading(true);

      const conversation = await createConversation(userId);

      console.log("CONVERSATION:", conversation);

      if (!conversation?._id) return;

      onConversationCreated(conversation);
    } catch (err) {
      console.error("Create conversation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {/* SEARCH BAR */}
      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users..."
          className="flex-1 border px-4 py-2 rounded"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Search
        </button>
      </div>

      {/* USERS LIST */}
      <div className="mt-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex justify-between items-center p-2 border-b"
          >
            <span>{user.username}</span>

            <button
              onClick={() => handleStartChat(user._id)}
              disabled={loading}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Chat
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSearch;
