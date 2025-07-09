const express = require("express");
const router = express.Router();
const { registerResident, loginResident } = require("../controllers/residentController");
const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerResident);
router.post("/login", loginResident);

// ✅ Protected route example
router.get("/profile", protect, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

module.exports = router;
