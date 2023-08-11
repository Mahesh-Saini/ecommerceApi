import mongoose from "mongoose";

const testingData = mongoose.Schema({
  firstTextField: {
    type: String,
    required: [true, "please provide first text field"],
  },
  lastTextField: {
    type: String,
    required: [true, "please provide lastTextField"],
  },
  age: {
    type: Number,
    required: [true, "please provide your age"],
  },
  isAdult: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("TextData", testingData);
