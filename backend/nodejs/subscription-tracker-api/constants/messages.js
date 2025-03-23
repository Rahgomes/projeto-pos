export const ERROR_MESSAGES = {
  SERVER_ERROR: "Server error",
  RESOURCE_NOT_FOUND: "Resource not found",
  DUPLICATE_KEY: "Duplicate field value entered",
  VALIDATION_FAILED: "Validation failed",
};

export const SUBSCRIPTION_MESSAGES = {
  NAME_REQUIRED: "Subscription name is required",
  PRICE_REQUIRED: "Subscription price is required",
  CATEGORY_REQUIRED: "Subscription category is required",
  PAYMENT_METHOD_REQUIRED: "Payment method is required",
};

export const VALIDATION_MESSAGES = {
  PRICE_MIN: "Price must be greater than 0",
  START_DATE_PAST: "Start date must be in the past",
  RENEWAL_AFTER_START: "Renewal date must be after the start date",
};

export const USER_MESSAGES = {
  NAME_REQUIRED: "User name is required",
  EMAIL_REQUIRED: "User email is required",
  INVALID_EMAIL: "Please provide a valid email address",
  PASSWORD_REQUIRED: "User password is required",
  PASSWORD_MIN_LENGTH: "Password must be at least 6 characters long",
};
