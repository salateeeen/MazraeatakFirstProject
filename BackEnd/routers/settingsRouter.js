const express = require("express");
const router = express.Router();

const controller = require("../controllers/settingsController");
const authController = require("../controllers/authController");

router.use(authController.protect);

router.get("/me", controller.getMySettings);

router.patch("/reset", controller.resetMySettings);

router.patch("/", controller.updateSection);

module.exports = router;
