import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";

import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "./catchAsyncError.js";

export const autherizedRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role:${req.user.role} is not allowed to access this role`,
          403
        )
      );
    }
    next();
  };
};

export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 404));
  }

  const { id } = await jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }

  req.user = user;
  next();
});
