const Message = require("./message.model");
const conversationRepo = require("../conversations/conversation.repository");

const SENDER_FIELDS = "username avatar";
const REPLY_POPULATE = {
  path: "replyTo",
  populate: { path: "senderId", select: SENDER_FIELDS },
};

const create = async (data) => {
  const message = await Message.create(data);
  await conversationRepo.updateLastMessage(data.conversationId, message._id);
  return Message.findById(message._id)
    .populate("senderId", SENDER_FIELDS)
    .populate(REPLY_POPULATE);
};

const findByConversation = (conversationId, userId, page = 1, limit = 50) => {
  const skip = (page - 1) * limit;
  return Message.find({
    conversationId,
    deletedForEveryone: false,
    deletedFor: { $ne: userId },
  })
    .populate("senderId", SENDER_FIELDS)
    .populate(REPLY_POPULATE)
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit);
};

const findById = (id) =>
  Message.findById(id)
    .populate("senderId", SENDER_FIELDS)
    .populate(REPLY_POPULATE);

const markSeen = (conversationId, userId) =>
  Message.updateMany(
    {
      conversationId,
      senderId: { $ne: userId },
      status: { $ne: "seen" },
    },
    {
      $set: { status: "seen" },
      $addToSet: { readBy: userId },
    }
  );

const updateMessage = (id, data) =>
  Message.findByIdAndUpdate(
    id,
    { $set: { ...data, edited: true, editedAt: new Date() } },
    { new: true }
  ).populate("senderId", SENDER_FIELDS);

const deleteForEveryone = (id) =>
  Message.findByIdAndUpdate(
    id,
    {
      $set: {
        deletedForEveryone: true,
        content: "",
        imageUrl: "",
        audioUrl: "",
        fileUrl: "",
        fileName: "",
      },
    },
    { new: true }
  );

const deleteForUser = (id, userId) =>
  Message.findByIdAndUpdate(
    id,
    { $addToSet: { deletedFor: userId } },
    { new: true }
  );

const toggleReaction = async (id, userId, emoji) => {
  const msg = await Message.findById(id);
  if (!msg) return null;

  const existingIndex = msg.reactions.findIndex(
    (r) => r.emoji === emoji && String(r.userId) === String(userId)
  );

  if (existingIndex !== -1) {
    // Remove reaction
    msg.reactions.splice(existingIndex, 1);
  } else {
    // Remove any existing reaction from this user (one reaction per user)
    const userReactionIndex = msg.reactions.findIndex(
      (r) => String(r.userId) === String(userId)
    );
    if (userReactionIndex !== -1) {
      msg.reactions.splice(userReactionIndex, 1);
    }
    msg.reactions.push({ emoji, userId });
  }

  await msg.save();
  return Message.findById(id).populate("senderId", SENDER_FIELDS);
};

module.exports = {
  create,
  findByConversation,
  findById,
  markSeen,
  updateMessage,
  deleteForEveryone,
  deleteForUser,
  toggleReaction,
};