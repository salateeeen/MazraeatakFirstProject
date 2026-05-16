const handleAsyncError = require("../error/asyncError");
const {
  getPendingOwnersService,
  approveOwnerService,
  rejectOwnerService,
  restrictToOwnerService,
  requestOwnerService,
  getOwnerDashboardService,
  getMyOwnerRequestService,
} = require("../services/ownerService");


const getAllOwners = handleAsyncError(async (req, res) => {
  const owners = await getAllOwnersService();

  res.status(200).json({
    status: "success",
    results: owners.length,
    data: owners,
  });
});

const approveOwner = handleAsyncError(async (req, res) => {
  const owner = await approveOwnerService(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Owner approved",
    data: owner,
  });
});

const rejectOwner = handleAsyncError(async (req, res) => {
  const owner = await rejectOwnerService(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Owner rejected",
    data: owner,
  });
});

const getPendingOwners = handleAsyncError(async (req, res) => {
  const owners = await getPendingOwnersService();

  res.status(200).json({
    status: "success",
    results: owners.length,
    data: owners,
  });
});

const restrictToOwner = handleAsyncError(async (req, res, next) => {
  const owner = await restrictToOwnerService(req.user._id);
  req.owner = owner;
  next();
});

const requestOwner = handleAsyncError(async (req, res) => {
  const owner = await requestOwnerService(req.user._id, req.body);

  res.status(201).json({
    status: "success",
    message: "Owner request submitted",
    data: owner,
  });
});

const getMyOwnerRequest = handleAsyncError(async (req, res) => {
  const data = await getMyOwnerRequestService(req.user._id);

  res.status(200).json({
    status: "success",
    data,
  });
});

const getOwnerDashboard = handleAsyncError(async (req, res) => {
  const data = await getOwnerDashboardService(req.user._id);

  res.status(200).json({
    status: "success",
    data,
  });
});

module.exports = {
  getAllOwners,
  approveOwner,
  rejectOwner,
  getPendingOwners,
  restrictToOwner,
  requestOwner,
  getOwnerDashboard,
  getMyOwnerRequest,
};