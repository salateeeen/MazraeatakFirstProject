const City = require("../models/citiesModel");
const { uploadSingleImage } = require("./farmUploadService");

const getCitiesService = async () => {
  return await City.find();
};

const addCityService = async (body, file) => {
  if (file) {
    body.image = await uploadSingleImage(file, "cities");
  }
  return await City.create(body);
};

const deleteCityService = async (id) => {
  return await City.findByIdAndDelete(id);
};

const updateCityService = async (id, body, file) => {
  if (file) {
    body.image = await uploadSingleImage(file, "cities");
  }
  return await City.findByIdAndUpdate(id, body, { new: true });
};

module.exports = { getCitiesService, addCityService, deleteCityService, updateCityService };
