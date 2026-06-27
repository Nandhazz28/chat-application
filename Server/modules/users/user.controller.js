const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const userService = require("./user.service");

const getProfile = asyncHandler(async (req, res) => {
  const user = await userService.getProfile(req.user.userId);
  return res.status(200).json(new ApiResponse(200, "Profile fetched", user));
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = await userService.updateProfile(req.user.userId, req.body);
  return res.status(200).json(new ApiResponse(200, "Profile updated", user));
});

const searchUsers = asyncHandler(async (req, res) => {
  const query = req.query.q || req.query.username || "";
  const users = await userService.searchUsers(query, req.user.userId);
  return res.status(200).json(new ApiResponse(200, "Users found", users));
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getProfile(req.params.id);
  return res.status(200).json(new ApiResponse(200, "User fetched", user));
});

module.exports = { getProfile, updateProfile, searchUsers, getUserById };