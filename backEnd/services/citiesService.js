const City = require("../models/citiesModel");
const { uploadSingleImage } = require("./farmUploadService");

const getCitiesService = async () => {
  return await City.find();
};

const addCityService = async (body, file) => {
  if (file) {
    body.image = await uploadSingleImage(file, "cities");
  }
  return await City.create({
    location: {
      coordinates: [body.coordinates.lng, body.coordinates.lat],
    },
    name: body.name,
    image: body.image
  });
};

const deleteCityService = async (id) => {
  await City.findByIdAndDelete(id);
};

const updateCityService = async (id, body, file) => {
  if (file) {
    body.image = await uploadSingleImage(file, "cities");
  }
  return await City.findByIdAndUpdate(id, body, { new: true });
};

module.exports = { getCitiesService, addCityService, deleteCityService, updateCityService };
