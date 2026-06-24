import { useState } from "react";

import {
  searchUsers,
} from "../../services/user.services";

import {
  createConversation,
} from "../../services/conversation.services";

const UserSearch = ({
  onConversationCreated,
}) => {
  const [query, setQuery] =
    useState("");

  const [users, setUsers] =
    useState([]);

  const handleSearch =
    async () => {
      try {
        const data =
          await searchUsers(
            query
          );

        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

  const handleStartChat =
    async (userId) => {
      try {
        const conversation =
          await createConversation(
            userId
          );

        onConversationCreated(
          conversation
        );
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <div className="p-4">

      <div className="flex gap-2">

        <input
          type="text"
          placeholder="Search username..."
          value={query}
          onChange={(e) =>
            setQuery(
              e.target.value
            )
          }
          className="flex-1 border rounded-lg px-4 py-2"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 rounded-lg"
        >
          Search
        </button>

      </div>

      <div className="mt-4">

        {users.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between p-3 border-b"
          >
            <div>
              <h3 className="font-medium">
                {user.username}
              </h3>
            </div>

            <button
              onClick={() =>
                handleStartChat(
                  user._id
                )
              }
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