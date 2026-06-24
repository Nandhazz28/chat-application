import { useState } from "react";

import InboxPage from "./InboxPage";
import ActiveChatPage from "./ActiveChatPage";

import UserSearch from "../../components/conversations/UserSearch";

const ChatPage = () => {
  const [
    activeConversation,
    setActiveConversation,
  ] = useState(null);

  const [
    showSearch,
    setShowSearch,
  ] = useState(false);

  return (
    <div className="h-screen flex">

      {/* SIDEBAR */}
      <div className="w-1/3 border-r bg-white flex flex-col">

        {/* HEADER */}
        <div className="p-4 border-b">

          <button
            onClick={() =>
              setShowSearch(
                !showSearch
              )
            }
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            + New Chat
          </button>

        </div>

        {/* USER SEARCH */}
        {showSearch && (
          <UserSearch
            onConversationCreated={(
              conversation
            ) => {
              setActiveConversation(
                conversation
              );

              setShowSearch(
                false
              );
            }}
          />
        )}

        {/* CONVERSATIONS */}
        <InboxPage
          activeConversation={
            activeConversation
          }
          setActiveConversation={
            setActiveConversation
          }
        />

      </div>

      {/* CHAT AREA */}
      <div className="flex-1">

        <ActiveChatPage
          conversation={
            activeConversation
          }
        />

      </div>

    </div>
  );
};

export default ChatPage;