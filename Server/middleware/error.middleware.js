const ApiError = require("../utils/ApiError");

const errorHandler = (err, req, res, next) => {
  const isDev = process.env.NODE_ENV !== "production";

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors?.length ? err.errors : undefined,
      ...(isDev && { stack: err.stack }),
    });
  }

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors,
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "field";
    return res.status(400).json({
      success: false,
      message: `${field} already exists`,
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  if (isDev) console.error("[ERROR]", err);

  return res.status(500).json({
    success: false,
    message: "Internal server error",
    ...(isDev && { detail: err.message, stack: err.stack }),
  });
};

module.exports = errorHandler;