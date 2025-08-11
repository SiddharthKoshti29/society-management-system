const QRCode = require("qrcode");
const Visitor = require("../models/Visitor");
const Resident = require("../models/Resident");

const generateQRCode = async (req, res) => {
  try {
    const residentId = req.user.id;
    const qrData = `resident:${residentId}`;

    const qr = await QRCode.toDataURL(qrData);

    res.status(200).json({ qr });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to generate QR code" });
  }
};
const logVisitorEntry = async (req, res) => {
  console.log("🔔 Visitor entry endpoint hit"); 

  try {
    const { residentId, name, purpose } = req.body;
    console.log("Payload:", { residentId, name, purpose });

    const resident = await Resident.findById(residentId);
    if (!resident) {
      console.log("Resident not found");
      return res.status(404).json({ message: "Resident not found" });
    }

    const visitor = new Visitor({ resident: residentId, name, purpose });
    await visitor.save();

    res.status(201).json({ message: "Visitor logged successfully", visitor });
  } catch (err) {
    console.error("Visitor log error:", err);
    res.status(500).json({ message: "Error logging visitor" });
  }
};



const getAllVisitors = async (req, res) => {
  try {
    const logs = await Visitor.find().populate("resident", "name flatNumber").sort({ entryTime: -1 });
    res.status(200).json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch visitor logs" });
  }
};

module.exports = {
  generateQRCode,
  logVisitorEntry,
  getAllVisitors,
};

