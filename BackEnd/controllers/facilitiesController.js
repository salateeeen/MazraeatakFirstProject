const handleAsyncError = require("../error/asyncError");
const { getAllFacilitiesService, addFacilityService, deleteFacilityService, updateFacilityService } = require("../services/facilitiesService");

const getAllFacilities = handleAsyncError(async (req, res, next) => {
  const facilities = await getAllFacilitiesService();

  res.status(200).json({
    status: "success",
    results: facilities.length,
    data: facilities
  });
});

const addFacility = handleAsyncError(async (req, res, next) => {
  const newFacility = await addFacilityService(req.body, req.file);

  res.status(201).json({
    status: "success",
    data: newFacility
  });
});

const deleteFacility = handleAsyncError(async (req, res, next) => {
  const facility = await deleteFacilityService(req.params.id);

  res.status(200).json({
    status: "success",
    data: facility
  });
});

const updateFacility = handleAsyncError(async (req, res, next) => {
  const facility = await updateFacilityService(req.params.id, req.body, req.file);

  res.status(200).json({
    status: "success",
    data: facility
  });
});

module.exports = { getAllFacilities, addFacility, deleteFacility, updateFacility };