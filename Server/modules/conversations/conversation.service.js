const conversationRepository = require("./conversation.repository");

const createConversation = async (data) => {
  const { userId, currentUserId } = data;

  if (userId && currentUserId) {
    const existing = await conversationRepository.findPrivateConversation(currentUserId, userId);
    if (existing) return existing;

    return conversationRepository.create({
      type: "private",
      participants: [currentUserId, userId],
    });
  }

  return conversationRepository.create(data);
};

const getConversation = async (conversationId) => {
  return conversationRepository.findById(conversationId);
};

const getUserConversations = async (userId) => {
  return conversationRepository.findUserConversations(userId);
};

module.exports = { createConversation, getConversation, getUserConversations };
