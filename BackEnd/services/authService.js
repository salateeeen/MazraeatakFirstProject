const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const crypto = require("crypto");
const sendMail = require("../utils/email");
const AppError = require("../error/AppError");

const createToken = function (user) {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
}

const signUpService = async (data) => {
  const { firstName, lastName, email, password, confirmPassword } = data;

  const user = await User.create({
    firstName: firstName.toLowerCase().trim(),
    lastName: lastName.toLowerCase().trim(),
    email,
    password: password.trim(),
    confirmPassword: confirmPassword.trim(),
  });

  const token = createToken(user);

  return { user, token };
}

const logInService = async (email, password) => {
  if (!email || !password) {
    throw new AppError("Please fill email and password fields.", 400);
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new AppError("Email or password is not correct.", 401);
  }

  const token = createToken(user._id);

  return { user, token };
};

const protectService = async (token) => {
  if (!token || token === "null" || token === "undefined") {
    throw new AppError("Invalid token.", 401);
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);

  } catch (err) {
    throw new AppError("Invalid or expired token.", 401);
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new AppError("The user no longer exists.", 401);
  }

  if (user.changedPasswordAfterCreateToken(decoded.iat)) {
    throw new AppError("User recently changed password.", 401);
  }

  return user;
};

const verifyTokenOptional = async (token) => {
  if (!token || token === "null" || token === "undefined") return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    return user || null;
  } catch (err) {
    return null;
  }
};

const sendResetCodeService = async (email) => {
  if (!email) {
    throw new AppError("Please provide your email.", 400);
  }

  const user = await User.findOne({ email });

  if (!user) {
    return;
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

  user.resetPasswordOTP = hashedOTP;
  user.resetPasswordOTPExpires = Date.now() + 10 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

  await sendMail({
    email: user.email,
    subject: "Your Password Reset Code",
    message: `Your password reset code is ${otp}. It expires in 10 minutes.`,
  });
};

const verifyCodeService = async (email, code) => {
  if (!email || !code) {
    throw new AppError("Please provide email and code.", 400);
  }

  const hashedCode = crypto.createHash("sha256").update(code).digest("hex");

  const user = await User.findOne({
    email,
    resetPasswordOTP: hashedCode,
    resetPasswordOTPExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new AppError("Invalid or expired code.", 401);
  }

  const token = createToken(user._id);

  return { token };
};

module.exports = {
  signUpService,
  logInService,
  protectService,
  verifyTokenOptional,
  sendResetCodeService,
  verifyCodeService,
};