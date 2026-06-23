import api from "./axios";

export const getConversations = async () => {
  const response = await api.get(
    "/api/conversations"
  );

  return response.data;
};

export const getConversation = async (
  conversationId
) => {
  const response = await api.get(
    `/api/conversations/${conversationId}`
  );

  return response.data;
};

export const createConversation = async (
  userId
) => {
  const response = await api.post(
    "/api/conversations",
    { userId }
  );

  return response.data;
};