const userRepository = require(
  "./user.repository"
);

const getProfile = async (userId) => {
  return userRepository.findById(userId);
};

const updateProfile = async (
  userId,
  data
) => {
  return userRepository.updateById(
    userId,
    data
  );
};

module.exports = {
  getProfile,
  updateProfile,
};