import api from "./axios";

export const getConversations = () =>
  api.get("/api/conversations").then((r) => r.data);

export const getConversation = (id) =>
  api.get(`/api/conversations/${id}`).then((r) => r.data);

export const createConversation = (userId) =>
  api.post("/api/conversations", { userId }).then((r) => r.data);