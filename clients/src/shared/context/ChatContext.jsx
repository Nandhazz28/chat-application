import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);

  const [activeChat, setActiveChat] = useState(null);

  const [messages, setMessages] = useState([]);

  const [typing, setTyping] = useState(false);

  const [onlineUsers, setOnlineUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  return (
    <ChatContext.Provider
      value={{
        conversations,
        setConversations,

        activeChat,
        setActiveChat,

        messages,
        setMessages,

        typing,
        setTyping,

        onlineUsers,
        setOnlineUsers,

        loading,
        setLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);