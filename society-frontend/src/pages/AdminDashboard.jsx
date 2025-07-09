import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalResidents: 0,
    totalComplaints: 0,
    totalVisitors: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(res.data);
      } catch (err) {
        console.error("Dashboard Error:", err);
      }
    };

    fetchStats();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("resident");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.aside 
        className="w-64 bg-white shadow-md"
        initial={{ x: -100, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        <div className="text-2xl font-bold text-center py-6 border-b">Admin Panel</div>
        <nav className="flex flex-col p-4 space-y-2">
          <button onClick={() => navigate("/admin-dashboard")} className="text-left px-4 py-2 hover:bg-gray-100 rounded">Dashboard</button>
          <button onClick={() => navigate("/admin/residents")} className="text-left px-4 py-2 hover:bg-gray-100 rounded">Manage Residents</button>
          <button onClick={() => navigate("/admin/complaints")} className="text-left px-4 py-2 hover:bg-gray-100 rounded">Manage Complaints</button>
          <button onClick={() => navigate("/admin/visitors")} className="text-left px-4 py-2 hover:bg-gray-100 rounded">Visitors Today</button>
          <button onClick={() => navigate("/admin/maintenance")} className="text-left px-4 py-2 hover:bg-gray-100 rounded">Maintenance</button>
          <button onClick={logout} className="text-left px-4 py-2 text-red-600 hover:bg-red-100 rounded">Logout</button>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <motion.h1 
          className="text-3xl font-semibold mb-6" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.3 }}
        >
          Welcome, Admin 🛠️
        </motion.h1>

        {/* Summary Cards */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.5 }}
        >
          <div className="bg-white shadow rounded-lg p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold mb-2">Residents</h2>
            <p className="text-3xl font-bold text-blue-600">{stats.totalResidents}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold mb-2">Complaints</h2>
            <p className="text-3xl font-bold text-yellow-600">{stats.totalComplaints}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold mb-2">Visitors Today</h2>
            <p className="text-3xl font-bold text-green-600">{stats.totalVisitors}</p>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="bg-white shadow rounded-lg p-6"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => navigate("/admin/residents")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add/Remove Residents
            </button>
            <button
              onClick={() => navigate("/admin/complaints")}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              View Complaints
            </button>
            <button
              onClick={() => navigate("/visitor-entry")}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Visitor Entry
            </button>
            <button
              onClick={() => navigate("/visitor-history")}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              View Visitor History
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
              disabled
            >
              Download Report (Coming Soon)
            </button>
          </div>
        </motion.div>

        {/* Optional Motivation Section */}
        <motion.div 
          className="mt-8 bg-purple-100 p-4 rounded-lg"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1 }}
        >
          <p className="text-purple-800 italic">
            "A smart society starts with strong administration." 💪
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;
