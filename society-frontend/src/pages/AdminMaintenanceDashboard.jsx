import React, { useEffect, useState } from "react";
import api from "../api";
import { motion } from "framer-motion";

const AdminMaintenanceDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await api.get("/admin/maintenance/payments");
        setPayments(res.data);

        const totalPaid = res.data.reduce((sum, p) => sum + p.amount, 0);
        setTotal(totalPaid);
      } catch (err) {
        console.error("Failed to load payments:", err);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <motion.h2
        className="text-3xl font-extrabold text-gray-800 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🧾 Maintenance Summary
      </motion.h2>

      <motion.p
        className="text-xl font-semibold text-green-700 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Total Collected: ₹{total}
      </motion.p>

      <motion.div
        className="overflow-x-auto shadow-lg rounded-xl border border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <table className="min-w-full bg-white rounded-lg overflow-hidden text-sm">
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              {["Resident", "Flat", "Month", "Amount", "Status", "Date"].map((heading, i) => (
                <th key={i} className="px-6 py-3 text-left font-semibold tracking-wide border-b">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No payment records found.
                </td>
              </tr>
            ) : (
              payments.map((entry, index) => (
                <motion.tr
                  key={entry._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="hover:bg-blue-50 transition-all"
                >
                  <td className="px-6 py-3 border-b">{entry.resident?.name || "N/A"}</td>
                  <td className="px-6 py-3 border-b">{entry.resident?.flatNumber || "N/A"}</td>
                  <td className="px-6 py-3 border-b">{entry.month}</td>
                  <td className="px-6 py-3 border-b text-green-700 font-medium">₹{entry.amount}</td>
                  <td className="px-6 py-3 border-b">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        entry.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {entry.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 border-b">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default AdminMaintenanceDashboard;
