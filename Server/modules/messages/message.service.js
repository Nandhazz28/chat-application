const messageRepository = require(
  "./message.repository"
);

const createMessage = async (
  messageData
) => {
  return messageRepository.create(
    messageData
  );
};

const getMessages = async (
  conversationId
) => {
  return messageRepository.findByConversation(
    conversationId
  );
};

module.exports = {
  createMessage,
  getMessages,
};