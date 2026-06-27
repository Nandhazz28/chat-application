const authRepository = require("./auth.repository");
const { hashPassword, comparePassword } = require("../../utils/hash");
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../../utils/jwt");
const ApiError = require("../../utils/ApiError");

const register = async (userData) => {
  const existing = await authRepository.findUserByEmail(userData.email);
  if (existing) {
    throw ApiError.badRequest("Email already in use");
  }

  const hashedPassword = await hashPassword(userData.password);
  const user = await authRepository.createUser({
    ...userData,
    password: hashedPassword,
  });

  return user;
};

const login = async (email, password) => {
  const user = await authRepository.findUserByEmail(email);
  if (!user) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  await authRepository.saveRefreshToken(user._id, refreshToken);

  // Return user without password
  const { password: _, ...userObj } = user.toObject();

  return { user: userObj, accessToken, refreshToken };
};

const refresh = async (token) => {
  if (!token) throw ApiError.unauthorized("No refresh token");

  const existing = await authRepository.findRefreshToken(token);
  if (!existing) throw ApiError.unauthorized("Invalid refresh token");

  let decoded;
  try {
    decoded = verifyRefreshToken(token);
  } catch {
    await authRepository.deleteRefreshToken(token);
    throw ApiError.unauthorized("Refresh token expired, please login again");
  }

  const accessToken = generateAccessToken(decoded.userId);
  return { accessToken };
};

const logout = async (token) => {
  if (token) {
    await authRepository.deleteRefreshToken(token);
  }
};

module.exports = { register, login, refresh, logout };
