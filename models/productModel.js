import mongoose from "mongoose";

const product = mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "description is required"],
    trim: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  category: {
    type: String,
  },
  stock: {
    type: Number,
    required: [true, "stock is required"],
    max: [100, "max only 100"],
    min: [1, "min only 1"],
    default: 1,
  },
  num_of_reviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  images: [
    {
      img_url: {
        type: String,
      },
    },
  ],
  weight: {
    type: Number,
  },
  Width: {
    type: Number,
  },
  height: {
    type: Number,
  },
  depth: {
    type: Number,
  },
  sellingPrice: {
    type: Number,
  },
  actualPrice: {
    type: Number,
  },
  discount: {
    type: Number,
  },
  rating: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

export default mongoose.model("Product", product);
