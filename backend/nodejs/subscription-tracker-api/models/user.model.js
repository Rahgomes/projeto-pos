import mongoose from "mongoose";

import { USER_MESSAGES, REGEX } from "../constants/index.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, USER_MESSAGES.NAME_REQUIRED],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, USER_MESSAGES.EMAIL_REQUIRED],
      unique: true,
      trim: true,
      lowercase: true,
      match: [REGEX.EMAIL, USER_MESSAGES.INVALID_EMAIL],
    },
    password: {
      type: String,
      required: [true, USER_MESSAGES.PASSWORD_REQUIRED],
      minLength: [6, USER_MESSAGES.PASSWORD_MIN_LENGTH],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
