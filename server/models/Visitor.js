const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  resident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resident",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  entryTime: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Visitor", visitorSchema);
