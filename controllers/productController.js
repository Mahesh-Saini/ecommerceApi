import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import { sendResponse } from "../utils/response.js";

export const getAllProducts = catchAsyncError(async (req, res, next) => {
  let products;

  if (req.query.search) {
    products = await Product.find({ title: { $regex: req.query.search } });
  }
  if ((req.query.category && req.query.subCategory) || req.query.category) {
    products = await Product.find({
      category: req.query.category,
      subCategory: req.query.subCategory,
    });
  }
  if (req.query.lowestPrice == 0) {
    req.query.lowestPrice = 1;
  }

  if (req.query.lowestPrice && req.query.highestPrice) {
    products = await Product.find({
      $and: [
        { sellingPrice: { $gte: req.query.lowestPrice } },
        { sellingPrice: { $lte: req.query.highestPrice } },
      ],
    });
    products = products.sort((a, b) => b.sellingPrice - a.sellingPrice);
  }
  if (req.query.rating) {
    products = await Product.find({
      rating: { $gte: req.query.rating },
    });
    products = products.sort((a, b) => b.rating - a.rating);
  }
  if (req.query.page) {
    const currentPage = req.query.page;
    const limit = req.query.limit || 10;
    const skip = (currentPage - 1) * limit;

    products = await Product.find().limit(limit).skip(skip);
  }
  if (!products) {
    products = await Product.find();
  }
  if (!products) {
    return next(new ErrorHandler("Product not found", 404));
  }
  return res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});

export const getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  return res.status(200).json({
    success: true,
    product,
  });
});

export const addProduct = catchAsyncError(async (req, res, next) => {
  const discount = req.body.actualPrice - req.body.sellingPrice;
  const discountPercentage = Math.floor(
    (discount / req.body.actualPrice) * 100,
    2
  );
  let product = new Product({
    ...req.body,
    userId: req.user.id,
    discount,
    discountPercentage,
  });
  product = await product.save();
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  sendResponse(res, 200, { success: true, product });
});

export const deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  await Product.findByIdAndDelete(req.params.id);
  return res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

export const updateProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  return res.status(200).json({
    success: true,
    updatedProduct,
  });
});
