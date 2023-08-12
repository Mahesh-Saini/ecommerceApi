import mongoose from "mongoose";

const cart = mongoose.Schema({
  productId: {
    type: Object,
  },
  title: {
    type: String,
  },
  price: {
    type: String,
  },
  quantity: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Cart", cart);
