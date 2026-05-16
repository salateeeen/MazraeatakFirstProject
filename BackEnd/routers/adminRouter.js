const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const adminController = require("../controllers/adminController");
const ownersController = require("../controllers/ownersController");

router.use(authController.protect, authController.restrictTo("admin"));

router.get("/dashboard", adminController.getAdminDashboard);

router.get("/owners", ownersController.getAllOwners);
router.get("/pending-owners", ownersController.getPendingOwners);
router.patch("/approve-owner/:id", ownersController.approveOwner);
router.patch("/reject-owner/:id", ownersController.rejectOwner);


module.exports = router;