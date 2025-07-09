import React, { useState } from "react";
import api from "../api";
import { motion } from "framer-motion";

const VisitorEntry = () => {
  const [formData, setFormData] = useState({
    residentId: "",
    name: "",
    purpose: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("/visitors/entry", formData);

      if (res.status === 200 || res.status === 201) {
        setMessage("✅ Visitor entry logged successfully.");
        setFormData({ residentId: "", name: "", purpose: "" });
      } else {
        setMessage("⚠️ Something went wrong.");
      }
    } catch (err) {
      console.error("Visitor log error:", err);
      if (err.response?.status === 404) {
        setMessage("❌ Resident ID not found.");
      } else {
        setMessage("❌ Server error while logging visitor.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50 flex justify-center items-center px-4 py-10">
      <motion.div
        className="w-full max-w-lg bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
          🛎️ Log Visitor Entry
        </h2>

        {message && (
          <motion.div
            className={`mb-4 px-4 py-2 rounded text-sm font-medium ${
              message.includes("✅")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {message}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="residentId"
            placeholder="Resident ID (QR or DB ID)"
            value={formData.residentId}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <input
            type="text"
            name="name"
            placeholder="Visitor Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <input
            type="text"
            name="purpose"
            placeholder="Purpose (e.g., Delivery, Guest)"
            value={formData.purpose}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
          >
            {loading ? "Logging..." : "Log Entry"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default VisitorEntry;
