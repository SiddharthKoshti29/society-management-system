const Resident = require("../models/Resident");
const Complaint = require("../models/Complaint");
const Visitor = require("../models/Visitor");
const Maintenance = require("../models/Maintenance");

const getAdminStats = async (req, res) => {
  try {
    const totalResidents = await Resident.countDocuments();
    const totalComplaints = await Complaint.countDocuments();
    const totalVisitors = await Visitor.countDocuments();

    const totalPayments = await Maintenance.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const paymentSummary = {
      Paid: 0,
      Pending: 0,
    };

    totalPayments.forEach(p => {
      paymentSummary[p._id] = p.count;
    });

    res.status(200).json({
      totalResidents,
      totalComplaints,
      totalVisitors,
      maintenance: paymentSummary,
    });
  } catch (err) {
    console.error("Admin stats error:", err);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};

module.exports = { getAdminStats };
