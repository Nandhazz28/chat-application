import InboxPage from "./InboxPage";
import ActiveChatPage from "./ActiveChatPage";
import { useState } from "react";

const ChatPage = () => {
  const [activeConversation, setActiveConversation] =
    useState(null);

  return (
    <div className="h-screen flex bg-gray-100">
      
      {/* LEFT SIDEBAR */}
      <div className="w-1/3 bg-white border-r">
        <InboxPage
          activeConversation={activeConversation}
          setActiveConversation={
            setActiveConversation
          }
        />
      </div>

      {/* RIGHT CHAT */}
      <div className="flex-1">
        <ActiveChatPage
          conversation={activeConversation}
        />
      </div>

    </div>
  );
};

export default ChatPage;