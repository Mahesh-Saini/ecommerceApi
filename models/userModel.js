import mongoose from "mongoose";
import validator from "validator";
import CryptoJS from "crypto-js";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required please enter it."],
    trim: true,
    maxLength: [30, "username can't be exceed 30 chars"],
    minLength: [4, "minimux length of username must be 4 chars"],
  },
  email: {
    type: String,
    required: [true, "Email is required please enter it."],
    unique: true,
    validate: [validator.isEmail, "please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required please enter it."],
    maxLength: [200, "maximum length of password can't be exceed 200 char"],
    minLength: [8, "minimum length of password must be 8 chars"],
    select: false,
  },
  avatar: {
    publicId: {
      type: String,
    },
    url: {
      type: String,
      validate: [validator.isURL, "please provide valid url"],
    },
  },
  role: {
    type: String,
    default: "user",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  // if (this.isModified()) {
  //   this.key = CryptoJS.AES.encrypt(
  //     this.id,
  //     process.env.USER_IDENTITY_KEY
  //   ).toString();
  //   next();
  // }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

export default mongoose.model("User", userSchema);
