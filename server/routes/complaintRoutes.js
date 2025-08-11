const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint"); 

const {
  submitComplaint,
  getResidentComplaints,
} = require("../controllers/complaintController");

const { protect } = require("../middleware/authMiddleware"); 


router.post("/submit", protect, submitComplaint);
router.get("/my", protect, getResidentComplaints);


router.get("/all", protect, async (req, res) => {
  console.log("Authenticated user:", req.user);

  try {
    const complaints = await Complaint.find().populate("resident", "name flatNumber email");
    res.status(200).json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/update/:id", protect, async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Pending", "In Progress", "Resolved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found." });
    }

    complaint.status = status;
    await complaint.save();

    res.status(200).json({ message: "Status updated", complaint });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



module.exports = router;

