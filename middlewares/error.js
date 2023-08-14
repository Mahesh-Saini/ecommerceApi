import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) => {
  // console.log("💥💥💥💥💥💥💥💥");
  // console.log(err.name);
  // console.log(err.type);
  // console.log(err.message);
  // console.log(err.code);
  // console.log(typeof err.code);
  // console.log(err.path);
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  //mongodb wrong id error
  if (err.name === "CastError") {
    err.message = `Error ${err.path}.Invalid mongodb id please provide a valid id.`;
  }

  //duplicate key error
  if (err.name === "MongoServerError" && err.code === 11000) {
    err.message = `MongoServerError : Duplicate ${Object.keys(
      err.keyValue
    )} only unique values are allowerd in ${Object.keys(err.keyValue)}`;
  }

  return res.status(err.statusCode).json({
    sucess: false,
    message: err.stack,
  });
};
