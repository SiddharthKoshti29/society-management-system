import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCommentDots,
  FaListAlt,
  FaMoneyCheckAlt,
  FaHistory,
  FaQrcode,
  FaSignOutAlt,
} from "react-icons/fa";

const Dashboard = () => {
  const resident = JSON.parse(localStorage.getItem("resident"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("resident");
    navigate("/login");
  };

  const cards = [
    {
      label: "Submit Complaint",
      icon: <FaCommentDots size={22} />,
      color: "from-blue-400 to-blue-600",
      route: "/my-complaints",
    },
    {
      label: "My Complaints",
      icon: <FaListAlt size={22} />,
      color: "from-purple-400 to-purple-600",
      route: "/my-complaint",
    },
    {
      label: "Pay Maintenance",
      icon: <FaMoneyCheckAlt size={22} />,
      color: "from-green-400 to-green-600",
      route: "/maintenance/pay",
    },
    {
      label: "Maintenance History",
      icon: <FaHistory size={22} />,
      color: "from-yellow-400 to-yellow-600",
      route: "/maintenance/history",
    },
    {
      label: "Generate Visitor QR",
      icon: <FaQrcode size={22} />,
      color: "from-pink-400 to-pink-600",
      route: "/visitors/generate",
    },
    {
      label: "Logout",
      icon: <FaSignOutAlt size={22} />,
      color: "from-red-400 to-red-600",
      route: "logout",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6 flex items-center justify-center">
      <motion.div
        className="w-full max-w-5xl p-8 backdrop-blur-xl bg-white/70 shadow-2xl rounded-3xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl font-extrabold text-center text-blue-800 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Welcome, {resident?.name || "Resident"} 👋
        </motion.h1>

        <div className="mb-8 text-center text-lg text-gray-700">
          <p>
            <strong>Flat:</strong> {resident?.flatNumber}
          </p>
          <p>
            <strong>Email:</strong> {resident?.email}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() =>
                card.route === "logout" ? logout() : navigate(card.route)
              }
              className={`cursor-pointer bg-gradient-to-br ${card.color} text-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300`}
            >
              <div className="flex items-center space-x-4">
                <div className="bg-white bg-opacity-20 rounded-full p-3">
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold">{card.label}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
