const Farm = require("../models/farmModel");
const Booking = require("../models/bookingModel");
const Review = require("../models/reviewModel");
const QueryClass = require("../query/query");
const AppError = require("../error/AppError");
const notificationService = require("./notificationService");
const { buildAvailabilityService } = require("./bookingService");

const getFarmsService = async (queryParams, user) => {
  const query = { ...queryParams };

  if (user) {
    query["farmOwner"] = { $ne: user._id };
  }

  const Query = new QueryClass(Farm.find(), query);

  const farms = await Query.filter()
    .sort()
    .populate([
      { path: "facilities" },
      { path: "city" },
      { path: "category" },
    ])
    .fields()
    .query;
  return farms;
};

const FarmsLocations = async (queryParams, distance, lat, lng, unit, user = null) => {
  const query = { fields: "location", ...queryParams };

  if (distance) {
    if (!lat || !lng) {
      throw new AppError("Please provide a latitude and longitude.", 400);
    }
    
    const multiplier = unit === "mi" ? 3958.8 : 6371;

    const radius = +distance / multiplier;

    query.location = {
      $geoWithin: {
        $centerSphere: [[+lng, +lat], radius],
      },
    };
  }

  if (user) {
    query["farmOwner"] = { $ne: user._id };
  }

  const Query = new QueryClass(Farm.find(), query);

  const farms = await Query.filter()
    .sort()
    .fields()
    .query;

  return farms;
};

const getMyFarmsService = async (queryParams, userId) => {
  const Query = new QueryClass(
    Farm.find({ farmOwner: userId }),
    queryParams
  );

  const farms = await Query.filter()
    .populate([
      { path: "facilities" },
      { path: "city" },
      { path: "category" },
    ])
    .query;

  return farms;
};

const getFarmByIdService = async (id) => {
  if (!id) {
    throw new AppError("Please provide an ID.", 400);
  }

  const farm = await Farm.findById(id).populate([
    { path: "farmOwner", select: "firstName lastName profilePicture" },
    { path: "facilities" },
    { path: "city" },
    { path: "category" },
  ]);

  if (!farm) {
    throw new AppError("No farm found with this ID.", 404);
  }

  const nextWeekAvailability = await buildAvailabilityService(farm.id);

  return { farm, nextWeekAvailability };
};

const getFarmAvailabilityService = async (farmId, date) => {
  if (!farmId) {
    throw new AppError("Please provide an ID.", 400);
  }

  const farm = await Farm.findById(farmId);

  if (!farm) {
    throw new AppError("No farm found with this ID.", 404);
  }

  const availability = await buildAvailabilityService(farm.id, date);

  return availability;
};

const getFarmsNameService = async (farmName) => {
  if (!farmName || typeof farmName !== "string" || farmName.length <= 2) {
    return [];
  }

  const farms = await Farm.find({
    farmName: { $regex: farmName, $options: "i" },
  })
    .populate("city")
    .limit(5)
    .select("farmName city");

  return farms;
};


const createFarmService = async (data, userId, uploadedImages) => {
  const {
    farmName,
    description,
    city,
    category,
    facilities,
    coordinates,
    timeSlots,
    pricing,
    maximumGuests,
    area,
  } = data;

  if (!uploadedImages?.coverImageUrl) {
    throw new AppError("Cover image is required", 400);
  }

  const farm = await Farm.create({
    farmName: farmName.toLowerCase().trim(),
    farmOwner: userId,
    facilities,
    ratingsAverage: 3.7,
    ratingsQuantity: 13,
    city,
    pricing,
    timeSlots,
    maximumGuests,
    area,
    description,
    location: {
      type: "Point",
      coordinates,
    },
    category,
    coverImage: uploadedImages.coverImageUrl,
    images: uploadedImages.imagesUrls,
  });

  await notificationService.notifyAdmins(
    "promotions",
    `New farm listed: ${farm.farmName}`,
    { farmId: farm._id }
  );

  return farm;
};

const deleteFarmService = async (farmId) => {
  if (!farmId) {
    throw new AppError("Please provide an ID.", 400);
  }

  const farm = await Farm.findByIdAndDelete(farmId);

  if (!farm) {
    throw new AppError("No farms found with this ID.", 404);
  }

  await Booking.deleteMany({ farm: farmId });
  await Review.deleteMany({ farm: farmId });
};

module.exports = {
  getFarmsService,
  FarmsLocations,
  getMyFarmsService,
  getFarmByIdService,
  getFarmAvailabilityService,
  getFarmsNameService,
  createFarmService,
  deleteFarmService,
};