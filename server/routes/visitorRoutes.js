const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  generateQRCode,
  logVisitorEntry,
  getAllVisitors,
} = require("../controllers/visitorController");


router.get("/generate", protect, generateQRCode);


router.post("/entry", logVisitorEntry);


router.get("/all", protect, adminOnly, getAllVisitors);

module.exports = router;
