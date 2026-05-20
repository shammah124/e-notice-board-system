const express = require("express");

const router = express.Router();

const noticeController = require("../controllers/noticeController");

const checkAdminAuth = require("../middleware/authMiddleware");

router.get("/", checkAdminAuth, noticeController.showNotices);

router.post("/create", checkAdminAuth, noticeController.createNotice);

router.get("/edit/:id", checkAdminAuth, noticeController.editNoticePage);

router.post("/update/:id", checkAdminAuth, noticeController.updateNotice);

router.get("/delete/:id", checkAdminAuth, noticeController.deleteNotice);

router.get("/public/all", noticeController.publicNotices);

router.get("/search", noticeController.searchNotices);

module.exports = router;
