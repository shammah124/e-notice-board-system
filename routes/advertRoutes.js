const express = require("express");

const router = express.Router();

const advertController = require("../controllers/advertController");

const checkAdminAuth = require("../middleware/authMiddleware");

const uploadAdvert = require("../middleware/advertUploadMiddleware");

router.get("/", checkAdminAuth, advertController.showAdverts);

router.post(
  "/upload",
  checkAdminAuth,
  uploadAdvert.single("advert_image"),
  advertController.uploadAdvert,
);

router.get("/delete/:id", checkAdminAuth, advertController.deleteAdvert);

router.get("/public/home", advertController.homepage);

module.exports = router;
