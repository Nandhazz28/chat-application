const userRepository = require("./user.repository");
const ApiError = require("../../utils/ApiError");

const getProfile = async (userId) => {
  const user = await userRepository.findById(userId);
  if (!user) throw ApiError.notFound("User not found");
  return user;
};

const updateProfile = async (userId, data) => {
  const allowed = ["username", "bio", "avatar"];
  const filtered = {};
  for (const key of allowed) {
    if (data[key] !== undefined) filtered[key] = data[key];
  }

  if (Object.keys(filtered).length === 0) {
    throw ApiError.badRequest("No valid fields to update");
  }

  const user = await userRepository.updateById(userId, filtered);
  if (!user) throw ApiError.notFound("User not found");
  return user;
};

const searchUsers = (query, excludeId) => {
  if (!query || !query.trim()) return [];
  return userRepository.searchUsers(query, excludeId);
};

module.exports = { getProfile, updateProfile, searchUsers };
