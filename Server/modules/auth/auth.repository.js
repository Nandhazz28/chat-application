const User = require(
  "../users/user.model"
);

const RefreshToken = require(
  "./auth.model"
);

const createUser = (data) => {
  return User.create(data);
};

const findUserByEmail = (email) => {
  return User.findOne({ email });
};

const saveRefreshToken = (
  userId,
  token
) => {
  return RefreshToken.create({
    userId,
    token,
  });
};

const findRefreshToken = (
  token
) => {
  return RefreshToken.findOne({
    token,
  });
};

module.exports = {
  createUser,
  findUserByEmail,
  saveRefreshToken,
  findRefreshToken,
};