import catchAsyncError from "../middlewares/catchAsyncError.js";
import Order from "../models/orderModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  return res.status(200).json({
    success: true,
    orders,
  });
});

export const addOrder = catchAsyncError(async (req, res, next) => {
  const order = new Order(req.body);
  const savedOrder = await order.save();

  return res.status(200).json({
    success: true,
    savedOrder,
  });
});

export const updateOrder = catchAsyncError(async (req, res, next) => {
  let order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("order not found", 404));
  }
  order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  return res.status(200).json({
    success: true,
    order,
  });
});

export const deleteOrder = catchAsyncError(async (req, res, next) => {
  let order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("order not found", 404));
  }
  await Order.findByIdAndDelete(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Order deleted succesfully!",
  });
});
