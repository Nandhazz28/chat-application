import { useEffect } from "react";

import {
  getConversations,
} from "../../services/conversation.services";

import {
  useChatContext,
} from "../../shared/context/ChatContext";

import ConversationList from "../../components/conversations/ConversationList";

const InboxPage = ({
  activeConversation,
  setActiveConversation,
}) => {
  const {
    conversations,
    setConversations,
  } = useChatContext();

  useEffect(() => {
    const fetchData =
      async () => {
        try {
          const response =
            await getConversations();

          setConversations(
            response.data ||
              response
          );
        } catch (error) {
          console.error(error);
        }
      };

    fetchData();
  }, []);

  return (
    <ConversationList
      conversations={
        conversations
      }
      activeId={
        activeConversation?._id
      }
      onSelect={
        setActiveConversation
      }
    />
  );
};

export default InboxPage;