import React, { useState } from "react";
import api from "../api";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { motion } from "framer-motion";


const stripePromise = loadStripe(
  "pk_test_51Ri9Yd2KZGfi1Larmw06Bnef3HZBeyO4JIdJbyWoPzwXfn16kelPyNHVEQbH1dSwUcNoVEWW3LdWr9ZhrcJeGg4J00ukuA4FyF"
);

const PaymentForm = () => {
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setMessage("");

    try {
      const res = await api.post("/maintenance/pay", { amount, month });
      const result = await stripe.confirmCardPayment(res.data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage("❌ Payment failed: " + result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setMessage("✅ Payment successful for " + month);
        setAmount("");
        setMonth("");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error. Try again later.");
    }

    setProcessing(false);
  };

  return (
    <motion.form
      onSubmit={handlePayment}
      className="w-full max-w-md p-8 bg-white/60 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        💳 Pay Maintenance
      </h2>

      <input
        type="text"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        placeholder="Month (e.g. July)"
        className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount (INR)"
        className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
        required
      />

      <div className="mb-4 p-3 border rounded-lg bg-white/50">
        <CardElement />
      </div>

      <button
        type="submit"
        disabled={!stripe || !elements || processing}
        className={`w-full py-3 rounded-lg font-semibold text-white transition ${
          processing
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>

      {message && (
        <motion.p
          className={`mt-4 text-center font-medium ${
            message.includes("✅")
              ? "text-green-600"
              : message.includes("❌")
              ? "text-red-600"
              : "text-gray-700"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {message}
        </motion.p>
      )}
    </motion.form>
  );
};

const MaintenancePayment = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
};

export default MaintenancePayment;
