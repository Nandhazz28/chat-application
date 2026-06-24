const userRepository =
  require(
    "./user.repository"
  );

const getProfile =
  async (userId) => {
    return userRepository.findById(
      userId
    );
  };

const updateProfile =
  async (
    userId,
    data
  ) => {
    return userRepository.updateById(
      userId,
      data
    );
  };

const searchUsers =
  async (
    username
  ) => {
    return userRepository.searchUsers(
      username
    );
  };

module.exports = {
  getProfile,
  updateProfile,
  searchUsers,
};