import React, { useEffect, useState } from "react";
import api from "../api";
import { motion } from "framer-motion";

const MyComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/complaints/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComplaints(res.data);
      } catch (err) {
        console.error("Failed to fetch complaints", err);
        setError("Could not load your complaints.");
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <motion.h1
        className="text-3xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        My Complaints 📋
      </motion.h1>

      {error && <p className="text-center text-red-600">{error}</p>}

      {complaints.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven’t submitted any complaints yet.
        </p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {complaints.map((c) => (
            <motion.div
              key={c._id}
              className="bg-white shadow-md rounded-lg p-5 border"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                {c.title}
              </h3>

              <p className="text-sm text-purple-700 mb-1">
                <span className="font-medium">Subject:</span> {c.subject}
              </p>

              <p className="text-gray-700 text-sm mb-2">{c.description}</p>

              <p className="text-sm">
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={
                    c.status === "pending"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }
                >
                  {c.status}
                </span>
              </p>

              <p className="text-xs text-gray-500 mt-2">
                Submitted on {new Date(c.createdAt).toLocaleDateString()}
              </p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MyComplaint;
