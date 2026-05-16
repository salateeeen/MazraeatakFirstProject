const express = require(`express`);
const authController = require(`../controllers/authController`)
const router = express.Router()


router.post(`/signup`, authController.signUp);
router.post(`/login`, authController.logIn);
router.post(`/reset-password`, authController.sendResetCode);
router.post(`/verify-code`, authController.verifyCode);

module.exports = router