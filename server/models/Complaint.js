const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  resident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resident", // <-- Must match the model name exactly
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved"],
    default: "Pending",
  }
}, { timestamps: true });

module.exports = mongoose.model("Complaint", complaintSchema);
