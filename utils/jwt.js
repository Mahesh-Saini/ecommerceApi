import jwt from "jsonwebtoken";

export const generateJwtTokenAndSetCookie = async (
  user,
  res,
  statusCode,
  msg
) => {
  const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  const JWT_EXPIRE_TIME = process.env.JWT_EXPIRE_TIME;
  const COOKIE_EXPIRE_TIME = new Date(Date.now() + 24 * 60 * 60 * 1000 * 1);

  const token = await jwt.sign({ id: user._id }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRE_TIME,
  });

  //cookie options
  const cookieOptions = {
    httpOnly: true,
    expires: COOKIE_EXPIRE_TIME,
  };

  return res.status(statusCode).cookie("token", token, cookieOptions).json({
    success: true,
    message: msg,
  });
};
