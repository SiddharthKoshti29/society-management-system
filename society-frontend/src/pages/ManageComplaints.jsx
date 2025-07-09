import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ManageComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await api.get("/complaints/all");
        setComplaints(res.data);
      } catch (err) {
        console.error(err);
        setError("🚫 Access denied. Admins only.");
        setTimeout(() => navigate("/"), 2000);
      }
    };

    fetchComplaints();
  }, [navigate]);

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/complaints/update/${id}`, { status });
      setComplaints((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status } : c))
      );
    } catch (err) {
      console.error("Status update failed", err);
      alert("⚠️ Failed to update complaint status.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-10 px-4 flex items-center justify-center">
      <motion.div
        className="w-full max-w-6xl p-8 bg-white/70 backdrop-blur-lg shadow-xl rounded-3xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h2
          className="text-3xl font-bold text-blue-800 text-center mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          🛠️ Manage Complaints
        </motion.h2>

        {error && (
          <motion.p
            className="text-red-600 text-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}

        {complaints.length === 0 ? (
          <p className="text-center text-gray-600">No complaints found.</p>
        ) : (
          <motion.div
            className="overflow-x-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <table className="min-w-full bg-white shadow rounded-lg text-sm">
              <thead className="bg-blue-100 text-blue-800 text-left">
                <tr>
                  <th className="py-3 px-4 border-b">Resident</th>
                  <th className="py-3 px-4 border-b">Subject</th>
                  <th className="py-3 px-4 border-b">Description</th>
                  <th className="py-3 px-4 border-b">Status</th>
                  <th className="py-3 px-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((c, i) => (
                  <motion.tr
                    key={c._id}
                    className="hover:bg-blue-50 transition"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <td className="py-3 px-4 border-b font-medium text-gray-700">
                      {c.resident?.name} <span className="text-sm text-gray-500">({c.resident?.flatNumber})</span>
                    </td>
                    <td className="py-3 px-4 border-b">{c.subject}</td>
                    <td className="py-3 px-4 border-b">{c.description}</td>
                    <td className="py-3 px-4 border-b">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
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
                    <td className="py-3 px-4 border-b">
                      <select
                        className="border rounded px-2 py-1 bg-white text-gray-700 focus:outline-none"
                        value={c.status}
                        onChange={(e) => handleStatusChange(c._id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ManageComplaints;
