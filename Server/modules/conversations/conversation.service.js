const repo = require("./conversation.repository");

const createConversation = async ({ userId, currentUserId }) => {
  if (!userId || !currentUserId) throw new Error("userId and currentUserId required");
  const existing = await repo.findPrivateConversation(currentUserId, userId);
  if (existing) return existing;
  const conv = await repo.create({ type: "private", participants: [currentUserId, userId] });
  return repo.findById(conv._id);
};

const getConversation = (id) => repo.findById(id);
const getUserConversations = (userId) => repo.findUserConversations(userId);

module.exports = { createConversation, getConversation, getUserConversations };