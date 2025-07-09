const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createMaintenancePayment,
  getMyMaintenanceHistory,
} = require("../controllers/maintenanceController");

router.post("/pay", protect, createMaintenancePayment);
router.get("/history", protect, getMyMaintenanceHistory);

module.exports = router;
