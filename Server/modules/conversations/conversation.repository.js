const Conversation = require("./conversation.model");

const create = (data) => Conversation.create(data);

const findById = (id) =>
  Conversation.findById(id)
    .populate("participants", "username avatar isOnline lastSeen")
    .populate({
      path: "lastMessage",
      populate: { path: "senderId", select: "username" },
    });

const findUserConversations = (userId) =>
  Conversation.find({ participants: userId })
    .populate("participants", "username avatar isOnline lastSeen")
    .populate({
      path: "lastMessage",
      populate: { path: "senderId", select: "username" },
    })
    .sort({ updatedAt: -1 });

const findPrivateConversation = (userId1, userId2) =>
  Conversation.findOne({
    type: "private",
    participants: { $all: [userId1, userId2], $size: 2 },
  })
    .populate("participants", "username avatar isOnline lastSeen")
    .populate({
      path: "lastMessage",
      populate: { path: "senderId", select: "username" },
    });

const updateById = (id, data) =>
  Conversation.findByIdAndUpdate(id, { $set: data }, { new: true });

module.exports = {
  create,
  findById,
  findUserConversations,
  findPrivateConversation,
  updateById,
};
