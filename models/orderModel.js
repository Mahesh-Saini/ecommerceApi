import mongoose from "mongoose";

const order = mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
    },
    landmark: {
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
  orderItems: [
    {
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
      productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    },
  ],
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  paymentInfo: {
    id: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  paidAt: {
    type: Number,
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
  orderStatus: {
    type: String,
  },
  deliverdAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", order);
