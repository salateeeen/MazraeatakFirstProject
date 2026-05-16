const handleAsyncError = require("../error/asyncError");
const { getCitiesService, addCityService, deleteCityService, updateCityService } = require("../services/citiesService");

const getCities = handleAsyncError(async (req, res, next) => {
  const cities = await getCitiesService();

  res.status(200).json({
    status: "success",
    results: cities.length,
    data: cities
  });
});

const addCity = handleAsyncError(async (req, res, next) => {
  const city = await addCityService(req.body, req.file);

  res.status(201).json({
    status: "success",
    data: city
  });
});

const deleteCity = handleAsyncError(async (req, res, next) => {
  const city = await deleteCityService(req.params.id);

  res.status(200).json({
    status: "success",
    data: city
  });
});

const updateCity = handleAsyncError(async (req, res, next) => {
  const city = await updateCityService(req.params.id, req.body, req.file);

  res.status(200).json({
    status: "success",
    data: city
  });
});

module.exports = { getCities, addCity, deleteCity, updateCity };
