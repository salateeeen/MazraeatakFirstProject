const express = require(`express`);
const facilitiesController = require(`../controllers/facilitiesController`);
const authController = require(`../controllers/authController`);
const router = express.Router()
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })

router.get("/", facilitiesController.getAllFacilities);

router.use(authController.protect, authController.restrictTo("admin"));
router.post("/", upload.single("logo"), facilitiesController.addFacility);
router.delete("/:id", facilitiesController.deleteFacility);
router.patch("/:id", upload.single("logo"), facilitiesController.updateFacility);

module.exports = router