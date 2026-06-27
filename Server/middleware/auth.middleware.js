const { verifyAccessToken } = require("../utils/jwt");
const ApiError = require("../utils/ApiError");

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(ApiError.unauthorized("No token provided"));
    }

    const token = authHeader.split(" ")[1];

    if (!token || token === "undefined") {
      return next(ApiError.unauthorized("Invalid token"));
    }

    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(ApiError.unauthorized("Token expired"));
    }
    return next(ApiError.unauthorized("Invalid token"));
  }
};

module.exports = protect;