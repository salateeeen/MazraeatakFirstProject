const handleAsyncError = require("../error/asyncError");
const settingsService = require("../services/settingsService");

// ==========================================
// GET MY SETTINGS
// ==========================================
const getMySettings = handleAsyncError(async (req, res) => {
  const settings = await settingsService.getMySettings(req.user.id);

  res.status(200).json({
    status: "success",
    data: settings,
  });
});

// ==========================================
// UPDATE SPECIFIC SECTION
// ==========================================
const updateSection = handleAsyncError(async (req, res, next) => {
  const settings = await settingsService.updateSection(req.user.id, req.user.role, req.body);

  res.status(200).json({
    status: "success",
    data: settings,
  });
});

// ==========================================
// DELETE MY SETTINGS
// ==========================================
const resetMySettings = handleAsyncError(async (req, res) => {
  const newSettings = await settingsService.resetMySettings(req.user.id);

  res.status(200).json({
    status: "success",
    data: newSettings,
  });
});


// ==========================================
// EXPORTS
// ==========================================
module.exports = {
  getMySettings,
  updateSection,
  resetMySettings,
};
