import mongoose from "mongoose";

const order = mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
    },
    landmarkArea: {
      type: String,
    },
    longnitude: {
      type: String,
    },
    latitude: {
      type: String,
    },
    city: {
      type: String,
    },
    district: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    phoneNumber: {
      type: Number,
    },
  },
  orderProductInfo: [
    {
      productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
      title: {
        type: String,
      },
      quantity: {
        type: String,
      },
      price: {
        type: String,
      },
      img: {
        type: String,
      },
    },
  ],
  paymentInfo: {
    paymentId: {
      type: String,
    },
    paymentType: {
      type: String,
      enum: ["cod", "ot"], //cod = case on delivery ot = order time
    },
    status: {
      type: String,
      enum: ["pending", "done"],
    },
    paidAt: {
      type: Date,
    },
  },
  orderInfo: {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    orderStatus: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    deliverdAt: {
      type: Date,
    },
  },
  itemsPrice: {
    type: Number,
  },
  taxPrice: {
    type: Number,
  },
  shippingCharge: {
    type: Number,
  },
  totalPrice: {
    type: Number,
  },
});

export default mongoose.model("Order", order);
