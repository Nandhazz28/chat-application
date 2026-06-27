const Conversation = require("./conversation.model");

const PARTICIPANT_FIELDS = "username avatar isOnline lastSeen";
const LAST_MSG_POPULATE = {
  path: "lastMessage",
  populate: { path: "senderId", select: "username" },
};

const create = (data) => Conversation.create(data);

const findById = (id) =>
  Conversation.findById(id)
    .populate("participants", PARTICIPANT_FIELDS)
    .populate(LAST_MSG_POPULATE);

const findUserConversations = (userId) =>
  Conversation.find({ participants: userId })
    .populate("participants", PARTICIPANT_FIELDS)
    .populate(LAST_MSG_POPULATE)
    .sort({ updatedAt: -1 });

const findPrivateConversation = (userId1, userId2) =>
  Conversation.findOne({
    type: "private",
    participants: { $all: [userId1, userId2], $size: 2 },
  })
    .populate("participants", PARTICIPANT_FIELDS)
    .populate(LAST_MSG_POPULATE);

const updateById = (id, data) =>
  Conversation.findByIdAndUpdate(id, { $set: data }, { new: true });

const updateLastMessage = (conversationId, messageId) =>
  Conversation.findByIdAndUpdate(
    conversationId,
    { lastMessage: messageId, updatedAt: new Date() },
    { new: true }
  );

module.exports = {
  create,
  findById,
  findUserConversations,
  findPrivateConversation,
  updateById,
  updateLastMessage,
};