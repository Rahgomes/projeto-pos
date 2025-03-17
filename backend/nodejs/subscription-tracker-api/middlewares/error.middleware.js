import ErrorResponse from "../utils/errorResponse.js";

const errorMiddleware = (err, _, res) => {
  let error = new ErrorResponse(
    err.message || "Server error",
    err.statusCode || 500
  );

  error.message = err.message;

  console.error(err);

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    error = new ErrorResponse("Resource not found", 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = new ErrorResponse(`Duplicate value entered for ${field}`, 400);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(messages.join(", "), 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server error",
  });
};

export default errorMiddleware;
