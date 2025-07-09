const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Root health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
const residentRoutes = require("./routes/residentRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const visitorRoutes = require("./routes/visitorRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/residents", residentRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/admin", adminRoutes);

// Export app for server.js
module.exports = app;
