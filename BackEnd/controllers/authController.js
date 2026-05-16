const handleAsyncError = require("../error/asyncError");
const AppError = require("../error/AppError");

const {
  signUpService,
  logInService,
  protectService,
  sendResetCodeService,
  verifyCodeService,
  verifyTokenOptional,
} = require("../services/authService");

const signUp = handleAsyncError(async (req, res, next) => {
  const result = await signUpService(req.body);

  res.status(201).json({
    status: "success",
    ...result,
  });
});

const logIn = handleAsyncError(async (req, res, next) => {
  const result = await logInService(req.body.email, req.body.password);

  res.status(200).json({
    status: "success",
    ...result,
  });
});

const protect = handleAsyncError(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  const user = await protectService(token);

  req.user = user;
  next();
});

const optionalProtect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  const user = await verifyTokenOptional(token);
  if (user) req.user = user;

  next();
};


const restrictTo = function (...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You are not permission to perform this action.", 403));
    }
    next();
  }
}

const sendResetCode = handleAsyncError(async (req, res, next) => {
  await sendResetCodeService(req.body.email);

  res.status(200).json({
    status: "success",
    message: "If this email exists, a reset code has been sent.",
  });
});

const verifyCode = handleAsyncError(async (req, res, next) => {
  const result = await verifyCodeService(
    req.body.email,
    req.body.code
  );

  res.status(200).json({
    status: "success",
    ...result,
  });
});

module.exports = {
  signUp,
  logIn,
  protect,
  optionalProtect,
  restrictTo,
  sendResetCode,
  verifyCode,
};