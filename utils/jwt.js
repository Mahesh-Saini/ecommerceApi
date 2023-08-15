import jwt from "jsonwebtoken";

export const generateJwtTokenAndSetCookie = async (
  user,
  res,
  statusCode,
  msg
) => {
  const token = await jwt.sign({ key: user.key }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

  //cookie options
  const cookieOptions = {
    httpOnly: true,
    // expires: new Date(Date.now() + 24 * 60 * 60 * 1000 * 1),
    expires: new Date(Date.now() + 60 * 1000 * 1),
  };

  return res.status(statusCode).cookie("token", token, cookieOptions).json({
    success: true,
    message: msg,
  });
};
