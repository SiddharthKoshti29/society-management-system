import React, { useState, useEffect } from "react";
import api from "../api";
import { motion } from "framer-motion";

const MyComplaints = () => {
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
  });

  const [myComplaints, setMyComplaints] = useState([]);
  const [message, setMessage] = useState("");

  const fetchComplaints = async () => {
    try {
      const res = await api.get("/complaints/my");
      setMyComplaints(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setMessage("❌ Failed to load complaints.");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/complaints/submit", formData);
      setMessage("✅ Complaint submitted successfully");
      setFormData({ subject: "", description: "" });
      fetchComplaints();
    } catch (err) {
      console.error(err);
      setMessage("❌ Submission failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-10 px-4 flex justify-center items-start">
      <motion.div
        className="w-full max-w-4xl bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-3xl font-bold text-center text-blue-800 mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          📝 Submit a Complaint
        </motion.h2>

        {message && (
          <p className="text-center mb-4 text-sm font-medium text-gray-700">
            {message}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="mb-8 space-y-4"
        >
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <textarea
            name="description"
            placeholder="Describe your issue..."
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Complaint
          </button>
        </form>

        <motion.h3
          className="text-2xl font-semibold text-blue-800 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          📄 My Complaints
        </motion.h3>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                <th className="py-3 px-4 text-left">Subject</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Created</th>
              </tr>
            </thead>
            <tbody>
              {myComplaints.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center p-4 text-gray-500">
                    No complaints yet.
                  </td>
                </tr>
              ) : (
                myComplaints.map((c, i) => (
                  <motion.tr
                    key={c._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-blue-50 transition"
                  >
                    <td className="py-3 px-4 border-t">{c.subject}</td>
                    <td className="py-3 px-4 border-t">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          c.status === "Resolved"
                            ? "bg-green-100 text-green-700"
                            : c.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-t">
                      {new Date(c.createdAt).toLocaleString()}
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default MyComplaints;
