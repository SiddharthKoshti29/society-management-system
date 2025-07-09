const mongoose = require("mongoose");

const residentSchema = new mongoose.Schema({

    role: {
  type: String,
  enum: ["resident", "admin"],
  default: "resident",
},

  name: {
    type: String,
    required: true,
  },
  flatNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Resident", residentSchema);
