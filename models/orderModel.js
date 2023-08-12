import mongoose from "mongoose";

const order = mongoose.Schema({
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

export default mongoose.model("Order", order);
