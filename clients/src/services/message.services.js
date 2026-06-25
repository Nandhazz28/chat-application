import api from "./axios";

export const getMessages = async (conversationId) => {
  const response = await api.get(`/api/messages/${conversationId}`);
  return response.data;
};

export const sendMessage = async (conversationId, payload) => {
  const response = await api.post("/api/messages", {
    conversationId,
    ...payload,
  });
  return response.data;
};

export const deleteMessage = async (messageId) => {
  const response = await api.delete(`/api/messages/${messageId}`);
  return response.data;
};