const controller = require(`../controllers/farmsController`);
const authController = require("../controllers/authController");
const express = require(`express`);

const router = express.Router();

const multer = require("multer");

const upload = multer({
  dest: "temp/",
});

router.get(`/`, authController.optionalProtect, controller.getFarms);
router.get(`/locations`, authController.optionalProtect, controller.getFarmsLocations);
router.get(`/my`, authController.protect, controller.getMyFarms);
router.get(`/search`, controller.getFarmsName);
router.get(`/farms-within/:distance/latlng/:latlng/unit/:unit`, controller.getFarmsWithinDistance);
router.get(`/:id`, controller.getFarmById);
router.get(`/:id/availability`, controller.getFarmAvailability);

router.use(authController.protect);
router.post(
  `/`,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  controller.createFarm,
);
router.delete("/:id", controller.deleteFarm);

module.exports = router;
