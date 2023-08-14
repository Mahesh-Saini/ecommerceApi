import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) => {
  // console.log("💥💥💥💥💥💥💥💥");

  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  //mongodb wrong id error
  if (err.name === "CastError") {
    err.message = `Error ${err.path}.Invalid mongodb id please provide a valid id.`;
  }

  return res.status(err.statusCode).json({
    sucess: false,
    message: err.stack,
  });
};
