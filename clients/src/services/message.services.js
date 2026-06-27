import api from "./axios";

export const getMessages  = (conversationId, page = 1, limit = 50) =>
  api.get(`/api/messages/${conversationId}?page=${page}&limit=${limit}`).then(r => r.data);

export const sendMessage  = (payload) =>
  api.post("/api/messages", payload).then(r => r.data);

export const markSeen     = (conversationId) =>
  api.put(`/api/messages/seen/${conversationId}`).then(r => r.data);

export const editMessage  = (id, content) =>
  api.put(`/api/messages/${id}`, { content }).then(r => r.data);

export const deleteMessage = (id, deleteFor = "me") =>
  api.delete(`/api/messages/${id}`, { data: { deleteFor } }).then(r => r.data);

export const addReaction   = (id, emoji) =>
  api.post(`/api/messages/${id}/reaction`, { emoji }).then(r => r.data);