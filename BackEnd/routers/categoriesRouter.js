const express = require(`express`);
const categoriesController = require(`../controllers/categoriesController`)
const authController = require(`../controllers/authController`)
const router = express.Router()
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })

router.get("/", categoriesController.getCategories);

router.use(authController.protect, authController.restrictTo("admin"));
router.post("/", upload.single("image"), categoriesController.addCategory);
router.delete("/:id", categoriesController.deleteCategory);
router.patch("/:id", upload.single("image"), categoriesController.updateCategory);

module.exports = router