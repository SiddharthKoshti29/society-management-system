const Complaint = require("../models/Complaint");

const submitComplaint = async (req, res) => {
  try {
    const { subject, description } = req.body;

    if (!subject || !description) {
      return res.status(400).json({ message: "Subject and description are required." });
    }

    const complaint = new Complaint({
      resident: req.user.id,
      subject,
      description,
    });

    await complaint.save();

    res.status(201).json({ message: "Complaint submitted", complaint });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getResidentComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ resident: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  submitComplaint,
  getResidentComplaints,
};
