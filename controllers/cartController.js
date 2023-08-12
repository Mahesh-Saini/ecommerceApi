import catchAsyncError from "../middlewares/catchAsyncError.js";
import Cart from "../models/cartModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getAllCart = catchAsyncError(async (req, res, next) => {
  const carts = await Cart.find();

  return res.status(200).json({
    success: true,
    carts,
  });
});

export const addCart = catchAsyncError(async (req, res, next) => {
  const cart = new Cart(req.body);
  const savedCart = await cart.save();

  return res.status(200).json({
    success: true,
    savedCart,
  });
});

export const updateCart = catchAsyncError(async (req, res, next) => {
  let cart = await Cart.findById(req.params.id);
  if (!cart) {
    return next(new ErrorHandler("cart not found", 404));
  }
  cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  return res.status(200).json({
    success: true,
    cart,
  });
});

export const deleteCart = catchAsyncError(async (req, res, next) => {
  let cart = await Cart.findById(req.params.id);
  if (!cart) {
    return next(new ErrorHandler("cart not found", 404));
  }
  await Cart.findByIdAndDelete(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Cart deleted succesfully!",
  });
});
