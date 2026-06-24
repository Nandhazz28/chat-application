import { useEffect } from "react";

import {
  getMessages,
} from "../../services/conversation.services";

import {
  useChatContext,
} from "../../shared/context/ChatContext";

const ActiveChatPage = ({
  conversation,
}) => {
  const {
    messages,
    setMessages,
  } = useChatContext();

  useEffect(() => {
    if (!conversation)
      return;

    const fetchMessages =
      async () => {
        try {
          const response =
            await getMessages(
              conversation._id
            );

          setMessages(
            response.data ||
              response
          );
        } catch (error) {
          console.error(error);
        }
      };

    fetchMessages();
  }, [conversation]);

  if (!conversation) {
    return (
      <div className="h-full flex items-center justify-center">
        Select a conversation
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">

      <div className="border-b p-4 bg-white">
        <h2 className="font-semibold">
          {
            conversation
              ?.participant
              ?.name
          }
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">

        {messages.map(
          (message) => (
            <div
              key={
                message._id
              }
              className="mb-2"
            >
              {
                message.content
              }
            </div>
          )
        )}

      </div>

    </div>
  );
};

export default ActiveChatPage;