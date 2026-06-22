const asyncHandler = require(
  "../../utils/asyncHandler"
);

const ApiResponse = require(
  "../../utils/ApiResponse"
);

const authService = require(
  "./auth.service"
);

const register = asyncHandler(
  async (req, res) => {
    const user =
      await authService.register(
        req.body
      );

    return res.status(201).json(
      new ApiResponse(
        201,
        "User registered successfully",
        user
      )
    );
  }
);

const login = asyncHandler(
  async (req, res) => {
    const result =
      await authService.login(
        req.body.email,
        req.body.password
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        "Login successful",
        result
      )
    );
  }
);

module.exports = {
  register,
  login,
};