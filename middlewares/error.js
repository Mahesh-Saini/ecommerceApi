import ErrorHandler from "../utils/errorHandler.js";

export default (err, req, res, next) => {
  // console.log("💥💥💥💥💥💥💥💥");
  // console.log(err.name);
  // console.log(err.message);
  // console.log(typeof err);
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  //mongodb wrong id error
  if (err.name === "TokenExpiredError" && err.message === "jwt expired") {
    err.message = `Json web token expired you has been expired you need to login again.`;
  }

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
    sucess: true,
    message: err.message,
  });
};
