const express = require("express");

const router = express.Router();

const timetableController = require("../controllers/timetableController");

const checkAdminAuth = require("../middleware/authMiddleware");

const uploadTimetable = require("../middleware/timetableUploadMiddleware");

router.get("/", checkAdminAuth, timetableController.showTimetables);

router.post(
  "/upload",
  checkAdminAuth,
  uploadTimetable.single("timetable_file"),
  timetableController.uploadTimetable,
);

router.get("/delete/:id", checkAdminAuth, timetableController.deleteTimetable);

router.get("/public/all", timetableController.publicTimetables);

module.exports = router;
