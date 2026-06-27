const User = require("../users/user.model");
const RefreshToken = require("./auth.model");

const createUser = (data) => User.create(data);

const findUserByEmail = (email) => User.findOne({ email });

const saveRefreshToken = (userId, token) =>
  RefreshToken.create({ userId, token });

const findRefreshToken = (token) => RefreshToken.findOne({ token });

const deleteRefreshToken = (token) => RefreshToken.deleteOne({ token });

const deleteAllRefreshTokens = (userId) => RefreshToken.deleteMany({ userId });

module.exports = {
  createUser,
  findUserByEmail,
  saveRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
  deleteAllRefreshTokens,
};
