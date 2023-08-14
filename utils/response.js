export const sendResponse = (res, statusCode, options = {}) => {
  return res.status(statusCode).json(options);
};
