import {
  createContext,
  useContext,
  useState,
} from "react";

const ChatContext = createContext();

export const ChatProvider = ({
  children,
}) => {
  const [
    conversations,
    setConversations,
  ] = useState([]);

  const [activeChat, setActiveChat] =
    useState(null);

  const [messages, setMessages] =
    useState([]);

  return (
    <ChatContext.Provider
      value={{
        conversations,
        setConversations,
        activeChat,
        setActiveChat,
        messages,
        setMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext =
  () => useContext(ChatContext);