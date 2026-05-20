const express = require("express");

const router = express.Router();

const admissionController = require("../controllers/admissionController");

const checkAdminAuth = require("../middleware/authMiddleware");

const uploadAdmission = require("../middleware/admissionUploadMiddleware");

router.get("/", checkAdminAuth, admissionController.showAdmissions);

router.post(
  "/upload",
  checkAdminAuth,
  uploadAdmission.single("admission_file"),
  admissionController.uploadAdmission,
);

router.get("/delete/:id", checkAdminAuth, admissionController.deleteAdmission);

router.get("/public/all", admissionController.publicAdmissions);

module.exports = router;
