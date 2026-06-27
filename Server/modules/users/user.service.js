const userRepository = require("./user.repository");

const getProfile = (userId) => userRepository.findById(userId);
const updateProfile = (userId, data) => userRepository.updateById(userId, data);
const searchUsers = (query, excludeId) =>
  userRepository.searchUsers(query, excludeId);

module.exports = { getProfile, updateProfile, searchUsers };
