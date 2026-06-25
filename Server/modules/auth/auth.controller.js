const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const authService = require("./auth.service");
const jwt = require("jsonwebtoken");
const env = require("../../config/env");
const User = require("../users/user.model");

const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);
  return res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", user));
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body.email, req.body.password);
  return res.status(200).json(new ApiResponse(200, "Login successful", result));
});

const getMe = asyncHandler(async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token || token === "undefined") {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res
      .status(200)
      .json(new ApiResponse(200, "Authenticated", { user }));
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Token expired or invalid" });
  }
});

module.exports = { register, login, getMe };
