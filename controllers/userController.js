import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import { sendResponse } from "../utils/response.js";

export const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();
  if (!users) {
    return next(new ErrorHandler("User not found", 404));
  }

  sendResponse(res, 200, { success: true, users, count: users.length });
});

export const getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  sendResponse(res, 200, { success: true, user });
});

export const updateUser = catchAsyncError(async (req, res, next) => {
  const { username, publicId, url } = req.body;
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  if (username) {
    user.username = username;
  } else if (publicId && url) {
    user.avatar.publicId = publicId;
    user.avatar.url = url;
  } else {
    return next(new ErrorHandler("Please provide a input", 404));
  }

  user = await user.save();

  sendResponse(res, 200, { success: true, user });
});

export const inactiveUser = catchAsyncError(async (req, res, next) => {
  const { inactive } = req.body;
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  if (!inactive) {
    return next(new ErrorHandler("Please provide a input", 400));
  }
  if (!user.isActive) {
    return next(new ErrorHandler("You are already inactive user.", 400));
  }
  user.isActive = false;
  user = await user.save();

  sendResponse(res, 200, {
    success: true,
    message: "you account has been inactive",
  });
});

export const activeUser = catchAsyncError(async (req, res, next) => {
  const { active } = req.body;
  let user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  if (!active) {
    return next(new ErrorHandler("Please provide a input", 400));
  }
  if (user.isActive) {
    return next(new ErrorHandler("You are already active user.", 400));
  }
  user.isActive = true;
  user = await user.save();

  sendResponse(res, 200, {
    success: true,
    message: "you account has been inactive",
  });
});

export const deleteUser = catchAsyncError(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  await User.findByIdAndDelete(req.params.id);

  sendResponse(res, 200, {
    success: true,
    message: "Your account deleted succesfully!",
  });
});
