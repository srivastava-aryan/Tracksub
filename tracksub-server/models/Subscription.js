const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true, // Firebase user ID
  },
  name: {
    type: String,
    required: true,
  },
  price: Number,
  billingCycle: String,
  tag: String,
  notes: String,
  nextBillingDate: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;