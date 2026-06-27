const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const messageService = require("./message.service");

const createMessage = asyncHandler(async (req, res) => {
  const message = await messageService.createMessage({ ...req.body, senderId: req.user.userId });
  return res.status(201).json(new ApiResponse(201, "Message sent", message));
});

const getMessages = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const messages = await messageService.getMessages(req.params.conversationId, page, limit);
  return res.status(200).json(new ApiResponse(200, "Messages fetched", messages));
});

const markSeen = asyncHandler(async (req, res) => {
  await messageService.markSeen(req.params.conversationId, req.user.userId);
  return res.status(200).json(new ApiResponse(200, "Marked as seen"));
});

const editMessage = asyncHandler(async (req, res) => {
  const msg = await messageService.editMessage(req.params.id, req.body.content);
  return res.status(200).json(new ApiResponse(200, "Message edited", msg));
});

const deleteMessage = asyncHandler(async (req, res) => {
  const { deleteFor } = req.body;
  if (deleteFor === "everyone") {
    await messageService.deleteForEveryone(req.params.id);
  } else {
    await messageService.deleteForUser(req.params.id, req.user.userId);
  }
  return res.status(200).json(new ApiResponse(200, "Message deleted"));
});

const addReaction = asyncHandler(async (req, res) => {
  const msg = await messageService.addReaction(req.params.id, req.user.userId, req.body.emoji);
  return res.status(200).json(new ApiResponse(200, "Reaction added", msg));
});

module.exports = { createMessage, getMessages, markSeen, editMessage, deleteMessage, addReaction };
