import { useEffect, useState } from "react";

import ConversationList from "../../components/conversations/ConversationList";

const InboxPage = ({
  activeConversation,
  setActiveConversation,
}) => {
  const [conversations, setConversations] =
    useState([]);

  useEffect(() => {
    setConversations([
      {
        _id: "1",
        participant: {
          name: "John",
        },
        lastMessage: {
          text: "Hello",
        },
      },
      {
        _id: "2",
        participant: {
          name: "Alex",
        },
        lastMessage: {
          text: "How are you?",
        },
      },
    ]);
  }, []);

  return (
    <ConversationList
      conversations={conversations}
      activeId={activeConversation?._id}
      onSelect={setActiveConversation}
    />
  );
};

export default InboxPage;