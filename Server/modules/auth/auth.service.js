const authRepository = require(
  "./auth.repository"
);

const {
  hashPassword,
  comparePassword,
} = require("../../utils/hash");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/jwt");

const register = async (
  userData
) => {
  const existingUser =
    await authRepository.findUserByEmail(
      userData.email
    );

  if (existingUser) {
    throw new Error(
      "Email already exists"
    );
  }

  const hashedPassword =
    await hashPassword(
      userData.password
    );

  const user =
    await authRepository.createUser({
      ...userData,
      password: hashedPassword,
    });

  return user;
};

const login = async (
  email,
  password
) => {
  const user =
    await authRepository.findUserByEmail(
      email
    );

  if (!user) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const isMatch =
    await comparePassword(
      password,
      user.password
    );

  if (!isMatch) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const accessToken =
    generateAccessToken(user._id);

  const refreshToken =
    generateRefreshToken(user._id);

  await authRepository.saveRefreshToken(
    user._id,
    refreshToken
  );

  return {
    user,
    accessToken,
    refreshToken,
  };
};

module.exports = {
  register,
  login,
};