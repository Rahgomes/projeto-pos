import ErrorResponse from "../utils/errorResponse.util.js";
import {
  HTTP_STATUS,
  ERROR_MESSAGES,
  MONGOOSE_ERRORS,
} from "../constants/index.js";

const errorMiddleware = (err, _, res) => {
  let error = new ErrorResponse(
    err.message || ERROR_MESSAGES.SERVER_ERROR,
    err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR
  );

  console.error(err);

  if (err.name === MONGOOSE_ERRORS.CAST_ERROR) {
    error = new ErrorResponse(
      ERROR_MESSAGES.RESOURCE_NOT_FOUND,
      HTTP_STATUS.NOT_FOUND
    );
  }

  if (err.code === MONGOOSE_ERRORS.DUPLICATE_KEY) {
    const field = Object.keys(err.keyValue)[0];
    error = new ErrorResponse(
      `${ERROR_MESSAGES.DUPLICATE_KEY}: ${field}`,
      HTTP_STATUS.BAD_REQUEST
    );
  }

  if (err.name === MONGOOSE_ERRORS.VALIDATION_ERROR) {
    const messages = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(messages.join(", "), HTTP_STATUS.BAD_REQUEST);
  }

  res.status(error.statusCode).json({
    success: false,
    error: error.message,
  });
};

export default errorMiddleware;
