import User from "../models/user.model.js";
import ErrorResponse from "../utils/errorResponse.util.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) throw new ErrorResponse("User not found", 404);

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
