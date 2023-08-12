import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";

export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  return res.status(200).json({
    success: true,
    users,
  });
});

export const addUser = catchAsyncError(async (req, res, next) => {
  const user = new User(req.body);
  const savedUser = await user.save();

  return res.status(200).json({
    success: true,
    savedUser,
  });
});

export const updateUser = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  return res.status(200).json({
    success: true,
    user,
  });
});

export const deleteUser = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  await User.findByIdAndDelete(req.params.id);

  return res.status(200).json({
    success: true,
    message: "User deleted succesfully!",
  });
});
