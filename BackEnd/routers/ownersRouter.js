const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const ownersController = require("../controllers/ownersController");

router.use(authController.protect);

router.get(
  "/pending",
  authController.restrictTo("admin"),
  ownersController.getPendingOwners
);

router.get("/request", ownersController.getMyOwnerRequest);

router.post("/request-owner", ownersController.requestOwner);

router.use(ownersController.restrictToOwner);

router.get("/dashboard", ownersController.getOwnerDashboard);

module.exports = router;