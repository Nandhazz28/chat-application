
const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const ApiError = require("../../utils/ApiError");
const authService = require("./auth.service");
const userRepository = require("../users/user.repository");

const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);
  return res
    .status(201)
    .json(new ApiResponse(201, "Registration successful", { user }));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  return res
    .status(200)
    .json(new ApiResponse(200, "Login successful", result));
});

const getMe = asyncHandler(async (req, res) => {
  const user = await userRepository.findById(req.user.userId);
  if (!user) throw ApiError.notFound("User not found");
  return res
    .status(200)
    .json(new ApiResponse(200, "Authenticated", { user }));
});

const refresh = asyncHandler(async (req, res) => {
  const token = req.body.refreshToken;
  const result = await authService.refresh(token);
  return res
    .status(200)
    .json(new ApiResponse(200, "Token refreshed", result));
});

const logout = asyncHandler(async (req, res) => {
  const token = req.body.refreshToken;
  await authService.logout(token);
  return res
    .status(200)
    .json(new ApiResponse(200, "Logged out successfully"));
});

module.exports = { register, login, getMe, refresh, logout };
