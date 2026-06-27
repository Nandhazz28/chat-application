const messageRepository = require("./message.repository");

const createMessage = (data) => messageRepository.create(data);
const getMessages = (conversationId, page, limit) => messageRepository.findByConversation(conversationId, page, limit);
const markSeen = (conversationId, userId) => messageRepository.markSeen(conversationId, userId);
const editMessage = (id, content) => messageRepository.updateMessage(id, { content });
const deleteForEveryone = (id) => messageRepository.deleteForEveryone(id);
const deleteForUser = (id, userId) => messageRepository.deleteForUser(id, userId);
const addReaction = (id, userId, emoji) => messageRepository.addReaction(id, userId, emoji);

module.exports = { createMessage, getMessages, markSeen, editMessage, deleteForEveryone, deleteForUser, addReaction };
