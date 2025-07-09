const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema({
  resident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resident",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Paid"],
    default: "Pending",
  },
  stripePaymentIntentId: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model("Maintenance", maintenanceSchema);
