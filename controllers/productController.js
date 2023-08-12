import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";

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
  }
  if (req.query.rating) {
    products = await Product.find({
      rating: { $gte: req.query.rating },
    });
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
  const product = await Product.create(req.body);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  return res.status(200).json({
    success: true,
    product,
  });
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
      isModified: true,
    }
  );
  return res.status(200).json({
    success: true,
    updatedProduct,
  });
});
