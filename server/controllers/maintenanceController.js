const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Maintenance = require("../models/Maintenance");

const createMaintenancePayment = async (req, res) => {
  try {
    const { amount, month } = req.body;

    const maintenance = new Maintenance({
      resident: req.user.id,
      amount,
      month,
    });

    await maintenance.save();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe uses paise/cents
      currency: "inr",
      metadata: { maintenanceId: maintenance._id.toString() },
    });

    maintenance.stripePaymentIntentId = paymentIntent.id;
    await maintenance.save();

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      maintenanceId: maintenance._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment creation failed" });
  }
};

const getMyMaintenanceHistory = async (req, res) => {
  try {
    const history = await Maintenance.find({ resident: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching history" });
  }
};

module.exports = {
  createMaintenancePayment,
  getMyMaintenanceHistory,
};
