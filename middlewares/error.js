import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) => {
  console.log("💥💥💥💥💥💥💥💥");
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  res.status(err.statusCode).json({
    sucess: false,
    message: err.message,
  });
};
