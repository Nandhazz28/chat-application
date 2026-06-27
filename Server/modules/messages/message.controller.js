const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const ApiError = require("../../utils/ApiError");
const messageService = require("./message.service");

const createMessage = asyncHandler(async (req, res) => {
  const message = await messageService.createMessage({
    ...req.body,
    senderId: req.user.userId,
  });
  return res.status(201).json(new ApiResponse(201, "Message sent", message));
});

const getMessages = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 50));
  const messages = await messageService.getMessages(
    req.params.conversationId,
    req.user.userId,
    page,
    limit
  );
  return res.status(200).json(new ApiResponse(200, "Messages fetched", messages));
});

const markSeen = asyncHandler(async (req, res) => {
  await messageService.markSeen(req.params.conversationId, req.user.userId);
  return res.status(200).json(new ApiResponse(200, "Marked as seen"));
});

const editMessage = asyncHandler(async (req, res) => {
  if (!req.body.content?.trim()) throw ApiError.badRequest("Content is required");
  const msg = await messageService.editMessage(
    req.params.id,
    req.body.content.trim(),
    req.user.userId
  );
  return res.status(200).json(new ApiResponse(200, "Message edited", msg));
});

const deleteMessage = asyncHandler(async (req, res) => {
  const { deleteFor } = req.body;
  if (deleteFor === "everyone") {
    await messageService.deleteForEveryone(req.params.id, req.user.userId);
  } else {
    await messageService.deleteForUser(req.params.id, req.user.userId);
  }
  return res.status(200).json(new ApiResponse(200, "Message deleted"));
});

const addReaction = asyncHandler(async (req, res) => {
  if (!req.body.emoji) throw ApiError.badRequest("Emoji is required");
  const msg = await messageService.toggleReaction(
    req.params.id,
    req.user.userId,
    req.body.emoji
  );
  return res.status(200).json(new ApiResponse(200, "Reaction updated", msg));
});

module.exports = { createMessage, getMessages, markSeen, editMessage, deleteMessage, addReaction };