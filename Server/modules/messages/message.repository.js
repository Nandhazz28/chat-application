const Message = require("./message.model");
const Conversation = require("../conversations/conversation.model");

const create = async (data) => {
  const message = await Message.create(data);
  await Conversation.findByIdAndUpdate(data.conversationId, {
    lastMessage: message._id,
    updatedAt: new Date(),
  });
  return Message.findById(message._id)
    .populate("senderId", "username avatar")
    .populate({ path: "replyTo", populate: { path: "senderId", select: "username" } });
};

const findByConversation = (conversationId, page = 1, limit = 50) => {
  const skip = (page - 1) * limit;
  return Message.find({ conversationId, deletedForEveryone: false })
    .populate("senderId", "username avatar")
    .populate({ path: "replyTo", populate: { path: "senderId", select: "username" } })
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit);
};

const findById = (id) =>
  Message.findById(id).populate("senderId", "username avatar");

const markSeen = async (conversationId, userId) => {
  await Message.updateMany(
    { conversationId, senderId: { $ne: userId }, status: { $ne: "seen" } },
    { $set: { status: "seen" }, $addToSet: { readBy: userId } }
  );
};

const updateMessage = (id, data) =>
  Message.findByIdAndUpdate(id, { $set: { ...data, edited: true, editedAt: new Date() } }, { new: true })
    .populate("senderId", "username avatar");

const deleteForEveryone = (id) =>
  Message.findByIdAndUpdate(id, { $set: { deletedForEveryone: true, content: "", imageUrl: "", audioUrl: "" } }, { new: true });

const deleteForUser = (id, userId) =>
  Message.findByIdAndUpdate(id, { $addToSet: { deletedFor: userId } }, { new: true });

const addReaction = async (id, userId, emoji) => {
  const msg = await Message.findById(id);
  if (!msg) return null;
  const current = msg.reactions.get(emoji) || [];
  if (current.includes(userId)) {
    msg.reactions.set(emoji, current.filter((u) => u !== userId));
  } else {
    msg.reactions.set(emoji, [...current, userId]);
  }
  await msg.save();
  return msg;
};

module.exports = { create, findByConversation, findById, markSeen, updateMessage, deleteForEveryone, deleteForUser, addReaction };