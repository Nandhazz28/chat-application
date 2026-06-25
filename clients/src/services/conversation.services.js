import api from "./axios";

export const getConversations = async () => {
  const res = await api.get("/api/conversations");
  return res.data;
};

export const getConversation = async (id) => {
  if (!id) return;

  const res = await api.get(`/api/conversations/${id}`);
  return res.data;
};

export const getMessages = async (conversationId) => {
  if (!conversationId) return; // ✅ IMPORTANT FIX

  const res = await api.get(`/api/messages/${conversationId}`);
  return res.data;
};

export const createConversation = async (userId) => {
  const res = await api.post("/api/conversations", { userId });

  return res.data.data; // ✅ ALWAYS RETURN REAL CONVERSATION
};