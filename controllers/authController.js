import crypto from "crypto";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cryptoJS from "crypto-js";

import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import { generateJwtTokenAndSetCookie } from "../utils/jwt.js";
import { sendMail } from "../utils/mail.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    return next(
      new ErrorHandler(
        "You are already logged in no need to register again or if you want to create another account so please logout first",
        400
      )
    );
  }

  const { username, email, password } = req.body;

  let user = new User({
    username,
    email,
    password,
    key: "bogusKey",
    avatar: {
      publicId: "this is public id",
      url: "imgUrl",
    },
    role: "user",
  });
  user = await user.save();
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const { password: passwordHash, _id, isActive, ...userData } = user._doc;
  generateJwtTokenAndSetCookie(userData, res, 201, "Register and logged in");
});

export const login = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    return next(
      new ErrorHandler("You are already logged in no need to login again", 400)
    );
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter email & password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }
  const { password: passwordHash, _id, isActive, ...userData } = user._doc;
  generateJwtTokenAndSetCookie(userData, res, 200, "You are logged in now");
});

export const logout = catchAsyncError(async (req, res, next) => {
  return res
    .status(200)
    .cookie("token", "", {
      httpOnly: false,
      expiresIn: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "logout successfully!",
    });
});

export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  //generating token
  const randomHex = crypto.randomBytes(20).toString("hex");
  const generateHash = crypto
    .createHash("sha256")
    .update(randomHex)
    .digest("hex");

  user.resetPasswordToken = generateHash;
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  await user.save();

  const resetPasswordLink = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/password/reset/${randomHex}`;

  const message = `Your password reset token is :- 
  ${resetPasswordLink}
  if you have not requested this email then, please ignore it.
  `;

  sendMail(user, res, message);
});

export const resetPassword = catchAsyncError(async (req, res, next) => {
  const randomHex = req.params.token;
  const generateHash = crypto
    .createHash("sha256")
    .update(randomHex)
    .digest("hex");
  let user = await User.findOne({
    resetPasswordToken: generateHash,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler(
        `Error:Reset Password Token is invalid or has been exprired`,
        404
      )
    );
  }
  if (!req.body.password || !req.body.confirmPassword) {
    return next(new ErrorHandler(`Please provide a password`, 404));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler(`Error:Password not match reenter the password`, 404)
    );
  }
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  user = await user.save();
  const { password: passwordHash, _id, isActive, ...userData } = user._doc;

  generateJwtTokenAndSetCookie(
    userData,
    res,
    201,
    "password reset and you are logged in"
  );
});

export const changePassword = catchAsyncError(async (req, res, next) => {
  const { email, password, newPassword, confirmPassword } = req.body;

  if (!(email && password && newPassword && confirmPassword)) {
    return next(
      new ErrorHandler("Invalid input please provide a write input", 400)
    );
  }
  if (email !== req.user.email) {
    return next(new ErrorHandler("Email or Password is wrong", 400));
  }
  if (!(newPassword.length >= 8 && confirmPassword.length >= 8)) {
    return next(
      new ErrorHandler("password should be greater than 8 chars", 400)
    );
  }
  if (newPassword !== confirmPassword) {
    return next(
      new ErrorHandler("Password does't match please provide right input", 400)
    );
  }

  let user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return next(new ErrorHandler("Email or Password is wrong", 400));
  }
  user.password = newPassword;
  user = await user.save();
  const { password: passwordHash, _id, isActive, ...userData } = user._doc;

  generateJwtTokenAndSetCookie(
    userData,
    res,
    201,
    "password changed in logged in"
  );
});
