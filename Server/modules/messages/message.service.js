const messageRepository = require("./message.repository");
const ApiError = require("../../utils/ApiError");

const createMessage = (data) => messageRepository.create(data);

const getMessages = (conversationId, userId, page, limit) =>
  messageRepository.findByConversation(conversationId, userId, page, limit);

const markSeen = (conversationId, userId) =>
  messageRepository.markSeen(conversationId, userId);

const editMessage = async (id, content, userId) => {
  const msg = await messageRepository.findById(id);
  if (!msg) throw ApiError.notFound("Message not found");
  if (String(msg.senderId._id || msg.senderId) !== String(userId)) {
    throw ApiError.forbidden("Cannot edit another user's message");
  }
  return messageRepository.updateMessage(id, { content });
};

const deleteForEveryone = async (id, userId) => {
  const msg = await messageRepository.findById(id);
  if (!msg) throw ApiError.notFound("Message not found");
  if (String(msg.senderId._id || msg.senderId) !== String(userId)) {
    throw ApiError.forbidden("Cannot delete another user's message for everyone");
  }
  return messageRepository.deleteForEveryone(id);
};

const deleteForUser = (id, userId) =>
  messageRepository.deleteForUser(id, userId);

const toggleReaction = (id, userId, emoji) =>
  messageRepository.toggleReaction(id, userId, emoji);

module.exports = {
  createMessage,
  getMessages,
  markSeen,
  editMessage,
  deleteForEveryone,
  deleteForUser,
  toggleReaction,
};