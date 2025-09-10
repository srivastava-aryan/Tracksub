const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  tag: { type: String },
  nextBillingDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  subscriptions: [subscriptionSchema],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
