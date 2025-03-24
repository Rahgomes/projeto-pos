import mongoose from "mongoose";
import User from "../models/user.model.js";
import ErrorResponse from "../utils/errorResponse.util.js";

export const getUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .skip(skip)
      .limit(limit)
      .select("-password")
      .lean();
    const total = await User.countDocuments();

    res.status(200).json({
      success: true,
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      throw new ErrorResponse("Invalid ID", 400);
    }

    const user = await User.findById(req.params.id).select("-password").lean();

    if (!user) throw new ErrorResponse("User not found", 404);

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
