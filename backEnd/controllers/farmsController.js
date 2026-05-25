const handleAsyncError = require("../error/asyncError");

const {
  getFarmsService,
  getMyFarmsService,
  getFarmByIdService,
  getFarmAvailabilityService,
  deleteFarmService,
  createFarmService,
  getFarmsNameService,
  FarmsLocations,
} = require("../services/farmService");

const { uploadFarmImages } = require("../services/farmUploadService");

const getFarms = handleAsyncError(async (req, res) => {
  const farms = await getFarmsService(req.query, req.user);

  res.status(200).json({
    status: "success",
    results: farms.length,
    data: farms,
  });
});

const getFarmsLocations = handleAsyncError(async (req, res) => {
  const {distance, lat, lng, unit, ...filters} = req.query;
 
  const locations = await FarmsLocations(filters, +distance, +lat, +lng, unit, req.user);

  res.status(200).json({
    status: "success",
    results: locations.length,
    data: locations,
  });
})

const getMyFarms = handleAsyncError(async (req, res) => {
  const farms = await getMyFarmsService(req.query, req.user._id);

  res.status(200).json({
    status: "success",
    results: farms.length,
    data: farms,
  });
});

const getFarmById = handleAsyncError(async (req, res) => {
  const result = await getFarmByIdService(req.params.id);

  res.status(200).json({
    status: "success",
    data: result,
  });
});

const getFarmsName = handleAsyncError(async (req, res) => {
  const { farmName } = req.query;

  const farms = await getFarmsNameService(farmName);

  res.status(200).json({
    status: "success",
    results: farms.length,
    data: farms,
  });
});



const createFarm = handleAsyncError(async (req, res) => {

  if (req.body.facilities) req.body.facilities = JSON.parse(req.body.facilities);
  if (req.body.pricing) req.body.pricing = JSON.parse(req.body.pricing);
  if (req.body.timeSlots) req.body.timeSlots = JSON.parse(req.body.timeSlots);
  if (req.body.coordinates) req.body.coordinates = JSON.parse(req.body.coordinates);
  if (req.body.maximumGuests) req.body.maximumGuests = Number(req.body.maximumGuests);
  if (req.body.numberOfRooms) req.body.numberOfRooms = Number(req.body.numberOfRooms);
  if (req.body.area) req.body.area = Number(req.body.area);

  const uploadedImages = await uploadFarmImages(req.files);

  const farm = await createFarmService(
    req.body,
    req.user._id,
    uploadedImages
  );

  res.status(201).json({
    status: "success",
    data: farm,
  });
});

const deleteFarm = handleAsyncError(async (req, res) => {
  await deleteFarmService(req.params.id);

  res.status(200).json({
    status: "success",
    data: null,
  });
});

const getFarmAvailability = handleAsyncError(async (req, res) => {
  const availability = await getFarmAvailabilityService(
    req.params.id,
    req.query.date
  );

  res.status(200).json({
    status: "success",
    data: availability,
  });
});

module.exports = {
  getFarms,
  getFarmsLocations,
  getMyFarms,
  getFarmById,
  getFarmAvailability,
  getFarmsName,
  createFarm,
  deleteFarm,
};