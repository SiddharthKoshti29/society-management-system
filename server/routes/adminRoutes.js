const express = require('express');
const router = express.Router();
const Resident = require('../models/Resident');
const Complaint = require('../models/Complaint');
const Visitor = require('../models/Visitor');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// ✅ GET /admin/dashboard - Admin summary stats
router.get('/dashboard', protect, adminOnly, async (req, res) => {
  try {
    const totalResidents = await Resident.countDocuments();
    const totalComplaints = await Complaint.countDocuments();
    const totalVisitors = await Visitor.countDocuments();

    res.status(200).json({
      totalResidents,
      totalComplaints,
      totalVisitors,
    });
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({ message: 'Dashboard fetch failed' });
  }
});

// ✅ GET /admin/residents - Admin: View all residents
router.get('/residents', protect, adminOnly, async (req, res) => {
  try {
    const residents = await Resident.find();
    res.status(200).json(residents);
  } catch (err) {
    console.error("Fetch residents error:", err);
    res.status(500).json({ message: "Failed to fetch residents" });
  }
});

// ✅ DELETE /admin/residents/:id - Admin: Delete resident
router.delete('/residents/:id', protect, adminOnly, async (req, res) => {
  try {
    const resident = await Resident.findById(req.params.id);
    if (!resident) {
      return res.status(404).json({ message: "Resident not found" });
    }

    await resident.deleteOne(); // Also okay: Resident.findByIdAndDelete()
    res.status(200).json({ message: "Resident deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Failed to delete resident" });
  }
});

const Maintenance = require('../models/Maintenance');

router.get('/maintenance/payments', protect, adminOnly, async (req, res) => {
  try {
    const payments = await Maintenance.find()
      .populate("resident", "name flatNumber")
      .sort({ createdAt: -1 });

    res.status(200).json(payments);
  } catch (err) {
    console.error("Failed to fetch maintenance data:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
