const express = require("express");

const router = express.Router();

const resultController = require("../controllers/resultController");

const checkAdminAuth = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

router.get("/", checkAdminAuth, resultController.showResults);

router.post(
  "/upload",
  checkAdminAuth,
  upload.single("result_file"),
  resultController.uploadResult,
);

router.get("/delete/:id", checkAdminAuth, resultController.deleteResult);

router.get("/public/all", resultController.publicResults);

module.exports = router;
