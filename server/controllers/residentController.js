const Resident = require("../models/Resident");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new resident
const registerResident = async (req, res) => {
  try {
    const { name, flatNumber, email, phone, password } = req.body;

    if (!name || !flatNumber || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingResident = await Resident.findOne({ email });
    if (existingResident) {
      return res.status(400).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newResident = new Resident({
      name,
      flatNumber,
      email,
      phone,
      password: hashedPassword,
    });

    await newResident.save();

    res.status(201).json({ message: "Resident registered successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

// Login an existing resident
const loginResident = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const resident = await Resident.findOne({ email });
    if (!resident) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, resident.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

 const token = jwt.sign(
  { id: resident._id, email: resident.email, role: resident.role },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);


    res.status(200).json({
      message: "Login successful",
      token,
      resident: {
        id: resident._id,
        name: resident.name,
        email: resident.email,
        flatNumber: resident.flatNumber,
        role: resident.role, 
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  registerResident,
  loginResident,
};
