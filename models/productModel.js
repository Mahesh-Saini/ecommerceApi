import mongoose from "mongoose";

const product = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required please enter title."],
    maxLength: [200, "Title should be less than 200chars"],
    minLength: [20, "Title should be greater than 20chars"],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Description is required please enter description."],
    maxLength: [500, "Title should be less than 500chars"],
    minLength: [20, "Title should be greater than 20chars"],
    trim: true,
  },
  sellingPrice: {
    type: Number,
    required: [true, "Selling price is required please enter selling price."],
    max: [50000, "Selling price should be less than or equal to 50,000 Rupees"],
    min: [1, "Selling price should be greater than or equal to 1 Rupees"],
  },
  actualPrice: {
    type: Number,
    required: [true, "Actual price is required please enter actual price."],
    max: [50000, "Actual price should be less than or equal to 50,000  Rupees"],
    min: [1, "Actual price should be greater than or equal to 1 Rupees"],
  },
  discount: {
    type: Number,
  },
  discountPercentage: {
    type: Number,
  },
  category: {
    type: String,
  },
  subCategory: {
    type: String,
  },
  stock: {
    type: Number,
    required: [true, "Stock is required please enter stock."],
    max: [100, "Stock should be less than 100 units."],
    min: [1, "Stock should be in between 1 to 100 units."],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: [true, "Name is required please enter name."],
        maxLength: [50, "Title should be less than 50chars"],
        minLength: [5, "Title should be greater than 5chars"],
        trim: true,
      },
      rating: {
        type: Number,
        required: [true, "Rating is required please enter rating."],
        max: [5, "Rating should be in between 1 to 5 units."],
        min: [1, "Rating should be in between 1 to 5 units."],
      },
      comment: {
        type: String,
        required: [true, "Comment is required please enter comment."],
        maxLength: [50, "Comment should be less than 50chars"],
        minLength: [5, "Comment should be greater than 5chars"],
        trim: true,
      },
    },
  ],
  images: [
    {
      imgUrl: {
        type: String,
      },
      pubId: {
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
  rating: {
    type: Number,
    default: 0,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Product", product);
