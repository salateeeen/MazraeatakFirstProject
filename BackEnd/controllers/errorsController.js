const {
    handleValidationError,
    handleTokenExpiredError,
    handleJsonWebTokenError,
    handleIdError,
    handleDuplicateError,
    sendErrorProd
} = require("../services/errorsService");

const errorController = (err, req, res, next) => {
    let error = { ...err };
    error.status = err.status || "fail";
    error.statusCode = err.statusCode || 500;
    error.message = err.message || "Something went wrong";


    if (err.name === "CastError") error = handleIdError(err);
    if (err.code === 11000) error = handleDuplicateError(err);
    if (err.name === "ValidationError") error = handleValidationError(err);
    if (err.name === "TokenExpiredError") error = handleTokenExpiredError();
    if (err.name === "JsonWebTokenError") error = handleJsonWebTokenError();

    sendErrorProd(error, res);
};

module.exports = errorController;