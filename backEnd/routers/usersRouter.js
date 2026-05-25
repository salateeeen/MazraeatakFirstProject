const express = require(`express`);
const multer = require("multer");
const authController = require(`../controllers/authController`)
const userController = require(`../controllers/usersController`)

const upload = multer({
  storage: multer.memoryStorage(),
});

const router = express.Router()

router.use(authController.protect)
router.get(`/me`, userController.getMe);
router.get(`/favorites`, userController.getFavoritesIds);
router.get(`/favorites-farms`, userController.getFavoritesFarms);
router.post('/favorites/:farmId', userController.addFavorite)
router.patch("/me", userController.updateMe)
router.patch("/me/profile-picture", upload.single("profilePicture"), userController.updateProfilePicture);
router.patch("/me/password", userController.updatePassword);
router.patch("/me/email", userController.updateEmail);

router.use(authController.restrictTo('admin'))
router.get(`/`, userController.getAllUsers);

module.exports = router