const Facility = require("../models/facilityModel");
const AppError = require("../error/AppError");
const { uploadSingleImage } = require("./farmUploadService");

const getAllFacilitiesService = async () => {
  return await Facility.find();
};

const addFacilityService = async (data, file) => {
  if (file) {
    data.logo = await uploadSingleImage(file, "facilities");
  }
  const { name, logo } = data;

  return await Facility.create({ name, logo });
};

const deleteFacilityService = async (id) => {
  return await Facility.findByIdAndDelete(id);
};

const updateFacilityService = async (id, body, file) => {
  if (file) {
    body.logo = await uploadSingleImage(file, "facilities");
  }
  return await Facility.findByIdAndUpdate(id, body, { new: true });
};

module.exports = { getAllFacilitiesService, addFacilityService, deleteFacilityService, updateFacilityService };
