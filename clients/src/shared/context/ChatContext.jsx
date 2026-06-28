import { createContext, useContext, useState, useCallback } from "react";

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [replyTo, setReplyTo] = useState(null);


  const addMessage = useCallback((msg) => {
    setMessages((prev) => {
      if (prev.some((m) => m._id === msg._id)) return prev;
      return [...prev, msg];
    });
  }, []);

  const updateMessage = useCallback((updated) => {
    setMessages((prev) =>
      prev.map((m) => (m._id === updated._id ? { ...m, ...updated } : m))
    );
  }, []);

  const removeMessage = useCallback((id) => {
    setMessages((prev) => prev.filter((m) => m._id !== id));
  }, []);


  const updateConversation = useCallback((conv) => {
    setConversations((prev) =>
      prev.map((c) => (c._id === conv._id ? { ...c, ...conv } : c))
    );
  }, []);

  const pushConversation = useCallback((conv) => {
    setConversations((prev) => {
      if (prev.some((c) => c._id === conv._id)) return prev;
      return [conv, ...prev];
    });
  }, []);


  const addOnlineUser = useCallback((userId) => {
    setOnlineUsers((prev) => {
      const id = String(userId);
      return prev.includes(id) ? prev : [...prev, id];
    });
  }, []);

  const removeOnlineUser = useCallback((userId) => {
    setOnlineUsers((prev) => prev.filter((id) => id !== String(userId)));
  }, []);

  return (
    <ChatContext.Provider
      value={{
        conversations,
        setConversations,
        activeConversation,
        setActiveConversation,
        messages,
        setMessages,
        addMessage,
        updateMessage,
        removeMessage,
        typing,
        setTyping,
        onlineUsers,
        setOnlineUsers,
        addOnlineUser,
        removeOnlineUser,
        replyTo,
        setReplyTo,
        updateConversation,
        pushConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be used inside ChatProvider");
  return ctx;
};