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
const User = require("../users/user.model"); 

const getMe = async (req, res) => {
  try {
    const token =
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    return res.status(200).json({
      message: "Authenticated",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
};