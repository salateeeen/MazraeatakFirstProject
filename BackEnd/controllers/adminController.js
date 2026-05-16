const handleAsyncError = require("../error/asyncError");
const { getAdminDashboardService } = require("../services/adminService");


const getAdminDashboard = handleAsyncError(async (req, res) => {
  const data = await getAdminDashboardService();

  res.status(200).json({
    status: "success",
    data,
  });
});

module.exports = {
  getAdminDashboard,
};