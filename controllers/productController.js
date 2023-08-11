import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (!products) {
      return next(new ErrorHandler("Product not found", 404));
    }
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, err.statusCode));
  }
};

export const getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, err.statusCode));
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    return res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    return next(new ErrorHandler(err.message, err.statusCode));
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(err.message, err.statusCode));
  }
};

export const updateProduct = async (req, res, next) => {
  try {
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
  } catch (error) {
    return next(new ErrorHandler(err.message, err.statusCode));
  }
};
