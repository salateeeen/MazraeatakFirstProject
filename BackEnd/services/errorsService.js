const AppError = require("../error/AppError");

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = errors.join(", ");
  return new AppError(message, 400);
};

const handleTokenExpiredError = () =>
  new AppError("Your token has expired, please log in again.", 401);

const handleJsonWebTokenError = () =>
  new AppError("Invalid token, please log in again.", 401);

const handleIdError = (err) =>
  new AppError(`Invalid ${err.path}: ${err.value}`, 400);

const handleDuplicateError = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  return new AppError(`Duplicate ${field}: ${value}. Please use another value.`, 400);
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR 💥", err);
    return res.status(500).json({
      status: "error",
      message: err.message || "Something went wrong",
    });
  }
};

module.exports = {
  handleValidationError,
  handleTokenExpiredError,
  handleJsonWebTokenError,
  handleIdError,
  handleDuplicateError,
  sendErrorProd,
};