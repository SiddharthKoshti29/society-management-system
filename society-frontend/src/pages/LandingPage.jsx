import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-100 flex items-center justify-center p-6">
      <motion.div
        className="bg-white rounded-3xl shadow-xl max-w-6xl w-full flex flex-col md:flex-row items-center p-8 md:p-12 gap-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Left: Text Content */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-amber-700 mb-4 leading-snug">
            eSociety <br />
            Management Portal
          </h1>
          <p className="text-gray-600 text-lg mb-6 max-w-md">
            Manage complaints, visitors, residents, maintenance and payments all in one secure and smart system.
          </p>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-semibold shadow transition duration-300"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-orange-100 hover:bg-orange-200 text-orange-800 px-6 py-2 rounded-full font-semibold shadow transition duration-300"
            >
              Register
            </button>
          </div>
        </motion.div>

        {/* Right: Mock UI Preview Image */}
        <motion.img
          src="https://img.freepik.com/free-vector/mobile-app-interface-concept-illustration_114360-4739.jpg?t=st=1719936887~exp=1719940487~hmac=48580c53ce260b44d8fcf383117270e7b3e7a48a9a994d23688826da44c86571&w=996"
          alt="Society App UI"
          className="w-full max-w-sm rounded-xl shadow-lg"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        />
      </motion.div>
    </div>
  );
};

export default LandingPage;
