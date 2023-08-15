import CryptoJS from "crypto-js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import Order from "../models/orderModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { sendResponse } from "../utils/response.js";

export const getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  if (!orders) {
    return next(new ErrorHandler("Orders not found!", 404));
  }
  sendResponse(res, 200, { success: true, orders });
});

export const addOrder = catchAsyncError(async (req, res, next) => {
  const key = req.user.key;
  const id = CryptoJS.AES.decrypt(key, process.env.USER_IDENTITY_KEY).toString(
    CryptoJS.enc.Utf8
  );

  const { shippingInfo, orderProductInfo, paymentInfo, orderInfo } = req.body;
  let itemsPrice = 0;
  orderProductInfo.forEach((item) => {
    itemsPrice += item.price;
  });
  const taxPercentage = 18;

  const taxPrice = (itemsPrice * taxPercentage) / 100;

  const shippingCharge = 40;
  const totalPrice = itemsPrice + taxPrice + shippingCharge;

  let order = new Order({
    shippingInfo,
    orderProductInfo,
    paymentInfo: { ...paymentInfo, paidAt: Date.now() },
    orderInfo: { ...orderInfo, userId: id },
    itemsPrice,
    taxPrice,
    shippingCharge,
    totalPrice,
  });
  order = await order.save();
  if (!order) {
    return next(new ErrorHandler("Order not created", 500));
  }
  sendResponse(res, 201, { success: true, order });
});

export const updateOrder = catchAsyncError(async (req, res, next) => {
  let order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }
  order.orderStatus = req.body.orderStatus;
  order = await order.save();
  sendResponse(res, 200, {
    succes: true,
    order,
    message: "order updated successfully!",
  });
});
