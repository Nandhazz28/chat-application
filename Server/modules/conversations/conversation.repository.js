const Conversation = require("./conversation.model");

const create = (data) => {
  return Conversation.create(data);
};

const findById = (id) => {
  return Conversation.findById(id)
    .populate("participants", "username avatar isOnline")
    .populate("lastMessage");
};

const findUserConversations = (userId) => {
  return Conversation.find({ participants: userId })
    .populate("participants", "username avatar isOnline")
    .populate("lastMessage")
    .sort({ updatedAt: -1 });
};

const findPrivateConversation = (userId1, userId2) => {
  return Conversation.findOne({
    type: "private",
    participants: { $all: [userId1, userId2], $size: 2 },
  })
    .populate("participants", "username avatar isOnline")
    .populate("lastMessage");
};

module.exports = { create, findById, findUserConversations, findPrivateConversation };