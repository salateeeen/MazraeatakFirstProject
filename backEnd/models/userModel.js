const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const schemaOptions = require("../utils/schemaOptions");
const Settings = require("./settingsModel");

const confirmedPassword = function (confirmPassword) {
  return confirmPassword === this.password;
};

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please tell us your first name"],
      trim: true,
    },

    lastName: {
      type: String,
      required: [true, "Please tell us your last name"],
      trim: true,
    },

    role: {
      type: String,
      enum: {
        values: [`user`, `owner`, `admin`],
        message: `The role is user, owner or admin.`,
      },
      default: `user`,
    },

    email: {
      type: String,
      required: [true, "Please tell us your email address"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email address"],
    },

    phone: {
      type: String,
      trim: true,
    },
    profilePicture: {
      type: String,
    },
    birthDate: {
      type: String,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "farm",
      },
    ],
    password: {
      type: String,
      required: [true, "Please type your password"],
      minlength: [4, "Password must be at least 8 characters long"],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: confirmedPassword,
        message: "Passwords do not match",
      },
    },

    active: {
      type: Boolean,
      default: true,
      select: false,
    },

    passwordChangedAt: {
      type: Date,
    },
    resetPasswordOTP: String,
    resetPasswordOTPExpires: Date,
  },
  schemaOptions,
);


userSchema.virtual("age").get(function () {
  if (!this.birthDate) return null;
  return Math.floor((Date.now() - this.birthDate) / 1000 / 60 / 60 / 24 / 365);
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  this.passwordChangedAt = new Date(Date.now() - 1000);
  next();
});

userSchema.methods.isCorrectPassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.changedPasswordAfterCreateToken = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.post("save", async function (doc) {
    const exists = await Settings.exists({ user: doc._id });
    if (!exists) {
      await Settings.create({ user: doc._id });
    }
});

userSchema.index({ favorites: 1 });

module.exports = mongoose.model("user", userSchema);
