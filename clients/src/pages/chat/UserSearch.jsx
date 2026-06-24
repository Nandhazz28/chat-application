import { useState } from "react";
import { createConversation } from "../../services/conversation.services";

const UserSearch = ({
  users = [],
  onConversationCreated,
}) => {
  const [loading, setLoading] =
    useState(false);

  const startChat = async (
    userId
  ) => {
    try {
      setLoading(true);

      const conversation =
        await createConversation(
          userId
        );

      onConversationCreated?.(
        conversation.data ||
          conversation
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border-b p-3">

      <h3 className="font-semibold mb-2">
        Start New Chat
      </h3>

      {users.map((user) => (
        <div
          key={user._id}
          className="flex justify-between items-center py-2"
        >
          <span>{user.name}</span>

          <button
            onClick={() =>
              startChat(user._id)
            }
            disabled={loading}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Chat
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserSearch;