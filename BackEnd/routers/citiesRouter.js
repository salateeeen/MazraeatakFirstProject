const express = require(`express`);
const citiesController = require(`../controllers/citiesController`)
const authController = require(`../controllers/authController`)
const router = express.Router()
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })

router.get("/", citiesController.getCities);


router.use(authController.protect, authController.restrictTo("admin"));

router.post("/", upload.single("image"), citiesController.addCity);
router.delete("/:id", citiesController.deleteCity);
router.patch("/:id", upload.single("image"), citiesController.updateCity);

module.exports = router