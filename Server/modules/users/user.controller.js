const asyncHandler = require(
  "../../utils/asyncHandler"
);

const ApiResponse = require(
  "../../utils/ApiResponse"
);

const userService = require(
  "./user.service"
);

const getProfile = asyncHandler(
  async (req, res) => {
    const user =
      await userService.getProfile(
        req.user.userId
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Profile fetched successfully",
        user
      )
    );
  }
);

const updateProfile = asyncHandler(
  async (req, res) => {
    const user =
      await userService.updateProfile(
        req.user.userId,
        req.body
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Profile updated successfully",
        user
      )
    );
  }
);
const searchUsers =
  asyncHandler(
    async (req, res) => {
      const {
        username,
      } = req.query;

      const users =
        await userService.searchUsers(
          username
        );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Users found",
            users
          )
        );
    }
  );

module.exports = {
  getProfile,
  updateProfile,
  searchUsers,
};