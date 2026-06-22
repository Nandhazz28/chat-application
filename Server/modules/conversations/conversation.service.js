const conversationRepository = require(
  "./conversation.repository"
);

const createConversation = async (
  data
) => {
  return conversationRepository.create(
    data
  );
};

const getConversation = async (
  conversationId
) => {
  return conversationRepository.findById(
    conversationId
  );
};

const getUserConversations = async (
  userId
) => {
  return conversationRepository.findUserConversations(
    userId
  );
};

module.exports = {
  createConversation,
  getConversation,
  getUserConversations,
};