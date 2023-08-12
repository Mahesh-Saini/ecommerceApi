import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = catchAsyncError(async (req, res, next) => {
  const { username, email } = req.body;
  let { password } = req.body;
  password = await bcrypt.hash(password, 12);

  const user = await User.create({
    username,
    email,
    password,
    avatar: {
      publicId: "this is public id",
      url: "imgUrl",
    },
    role: "user",
  });
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const token = await jwt.sign({ id: user.id }, "this-is-my-private-key", {
    expiresIn: "1h",
  });

  //cookie options
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 1),
  };

  return res.status(201).cookie("token", token, cookieOptions).json({
    success: true,
  });
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter email & password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }
  const hashedPassword = user.password;

  const isValidPassword = await bcrypt.compare(password, hashedPassword);

  if (!isValidPassword) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }

  const token = jwt.sign({ id: user.id }, "this-is-my-private-key", {
    expiresIn: "1h",
  });

  //cookie options
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 1),
  };

  return res.status(201).cookie("token", token, cookieOptions).json({
    success: true,
  });
});

export const logout = catchAsyncError(async (req, res, next) => {
  return res
    .status(200)
    .cookie("token", "", {
      expiresIn: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "logout successfully!",
    });
});

export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access resource", 404));
  }

  const { id } = await jwt.verify(token, "this-is-my-private-key");

  const user = await User.findById(id);
  req.user = user;
  next();
});
