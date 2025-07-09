import React, { useEffect, useState } from "react";
import api from "../api";
import { motion } from "framer-motion";

const MaintenanceHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/maintenance/history");
        setHistory(res.data);
      } catch (err) {
        console.error("Failed to load history:", err);
        setError("⚠️ Failed to fetch maintenance payment history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-white to-blue-50 flex items-center justify-center">
      <motion.div
        className="w-full max-w-5xl p-8 bg-white/70 backdrop-blur-md shadow-xl rounded-3xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h2
          className="text-3xl font-bold text-center text-blue-800 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🧾 Maintenance Payment History
        </motion.h2>

        {loading ? (
          <motion.p
            className="text-center text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ⏳ Loading payment history...
          </motion.p>
        ) : error ? (
          <motion.p
            className="text-center text-red-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        ) : history.length === 0 ? (
          <motion.p
            className="text-center text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No payment history found.
          </motion.p>
        ) : (
          <motion.div
            className="overflow-x-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <table className="min-w-full bg-white shadow rounded-lg text-sm">
              <thead className="bg-blue-100 text-blue-800">
                <tr>
                  <th className="py-3 px-6 text-left border-b">Month</th>
                  <th className="py-3 px-6 text-left border-b">Amount</th>
                  <th className="py-3 px-6 text-left border-b">Status</th>
                  <th className="py-3 px-6 text-left border-b">Date</th>
                  <th className="py-3 px-6 text-left border-b">Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry, i) => (
                  <motion.tr
                    key={entry._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-blue-50 transition"
                  >
                    <td className="py-3 px-6 border-b">{entry.month}</td>
                    <td className="py-3 px-6 border-b font-medium text-green-700">
                      ₹{entry.amount}
                    </td>
                    <td className="py-3 px-6 border-b">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                          entry.status === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {entry.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 border-b">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-6 border-b">{entry.method || "Card"}</td>
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

export default MaintenanceHistory;
