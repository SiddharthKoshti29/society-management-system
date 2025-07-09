import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const VisitorLogs = () => {
  const [visitors, setVisitors] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const res = await api.get("/visitors/all");
        setVisitors(res.data);
      } catch (err) {
        console.error(err);
        setError("🚫 Access denied. Admins only.");
        setTimeout(() => navigate("/"), 2000);
      }
    };

    fetchVisitors();
  }, [navigate]);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-yellow-50 to-white">
      <motion.h2
        className="text-3xl font-bold text-gray-800 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🧾 Visitor Logs
      </motion.h2>

      {error && (
        <motion.p
          className="text-red-600 font-medium mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}

      {visitors.length === 0 && !error ? (
        <motion.p
          className="text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No visitors found.
        </motion.p>
      ) : (
        <motion.div
          className="overflow-x-auto shadow-xl border border-gray-200 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <table className="min-w-full bg-white rounded-lg text-sm">
            <thead className="bg-yellow-100 text-yellow-800">
              <tr>
                {["Visitor Name", "Purpose", "Resident", "Flat", "Entry Time"].map(
                  (heading, i) => (
                    <th
                      key={i}
                      className="py-3 px-6 text-left font-semibold border-b"
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {visitors.map((v, i) => (
                <motion.tr
                  key={v._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="hover:bg-yellow-50 transition-all"
                >
                  <td className="py-2 px-6 border-b">{v.name}</td>
                  <td className="py-2 px-6 border-b">{v.purpose}</td>
                  <td className="py-2 px-6 border-b">{v.resident?.name || "N/A"}</td>
                  <td className="py-2 px-6 border-b">{v.resident?.flatNumber || "N/A"}</td>
                  <td className="py-2 px-6 border-b">
                    {new Date(v.entryTime).toLocaleString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
};

export default VisitorLogs;
