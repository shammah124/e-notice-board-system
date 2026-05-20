const express = require("express");

const router = express.Router();

const adminController = require("../controllers/adminController");

const checkAdminAuth = require("../middleware/authMiddleware");

router.get("/login", adminController.showLoginPage);

router.post("/login", adminController.loginAdmin);

router.get("/dashboard", checkAdminAuth, adminController.dashboard);

router.get("/logout", adminController.logoutAdmin);

module.exports = router;
