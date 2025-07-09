import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ManageResidents = () => {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const res = await api.get("/admin/residents");
        setResidents(res.data);
      } catch (err) {
        console.error("Error fetching residents:", err);
        setError("🚫 Access denied. Admins only.");
        setTimeout(() => navigate("/"), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchResidents();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resident?")) return;

    try {
      await api.delete(`/admin/residents/${id}`);
      setResidents((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Failed to delete resident");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-10 px-4 flex items-center justify-center">
      <motion.div
        className="w-full max-w-6xl p-8 bg-white/70 backdrop-blur-lg shadow-xl rounded-3xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
          👥 Manage Residents
        </h2>

        {error && (
          <motion.p
            className="text-center text-red-600 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}

        {loading ? (
          <p className="text-center text-gray-600">Loading residents...</p>
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
                  <th className="py-3 px-4 border-b">Name</th>
                  <th className="py-3 px-4 border-b">Flat</th>
                  <th className="py-3 px-4 border-b">Email</th>
                  <th className="py-3 px-4 border-b">Phone</th>
                  <th className="py-3 px-4 border-b">Role</th>
                  <th className="py-3 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {residents.map((resident, i) => (
                  <motion.tr
                    key={resident._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-blue-50 transition"
                  >
                    <td className="py-3 px-4 border-b font-medium text-gray-700">
                      {resident.name}
                    </td>
                    <td className="py-3 px-4 border-b">{resident.flatNumber}</td>
                    <td className="py-3 px-4 border-b">{resident.email}</td>
                    <td className="py-3 px-4 border-b">{resident.phone}</td>
                    <td className="py-3 px-4 border-b">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          resident.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {resident.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b">
                      <button
                        onClick={() => handleDelete(resident._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs shadow-sm"
                      >
                        Delete
                      </button>
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

export default ManageResidents;
