import mongoose from "mongoose";
import validator from "validator";
import CryptoJS from "crypto-js";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required please enter it."],
    trim: true,
    maxLength: [30, "30 chars"],
    minLength: [4, "4 chars"],
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
    maxLength: [200, "30 chars"],
    minLength: [8, "4 chars"],
    select: false,
  },
  key: {
    type: String,
    required: true,
  },
  avatar: {
    publicId: {
      type: String,
    },
    url: {
      type: String,
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
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  }
  if (this.isModified()) {
    this.key = CryptoJS.AES.encrypt(
      this.id,
      process.env.USER_IDENTITY_KEY
    ).toString();
    next();
  }
  next();
});

export default mongoose.model("User", userSchema);
