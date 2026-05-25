const Setting = require("../models/settingsModel");
const AppError = require("../error/AppError");

const getMySettings = async (userId) => {
  let settings = await Setting.findOne({ user: userId });

  if (!settings) {
    settings = await Setting.create({ user: userId });
  }

  return settings;
};

const updateSection = async (userId, userRole, body) => {
  const forbiddenForUser = Object.keys(body).some((key) =>
    key.startsWith("ownerSettings")
  );

  if (forbiddenForUser && userRole !== "owner") {
    throw new AppError("Not allowed", 403);
  }

  const payoutAccountMasked = Object.keys(body).some((key) =>
    key.startsWith("payoutMethod")
  );
  if (payoutAccountMasked && body.payoutAccountMasked) {
    throw new AppError("Cannot update payout account directly", 400);
  }

  return await Setting.findOneAndUpdate(
    { user: userId },
    { $set: body },
    {
      new: true,
      runValidators: true,
      upsert: true,
    }
  );
};

const resetMySettings = async (userId) => {
  await Setting.findOneAndDelete({ user: userId });
  return await Setting.create({ user: userId });
};

module.exports = {
  getMySettings,
  updateSection,
  resetMySettings,
};
