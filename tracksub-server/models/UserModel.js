const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  nextBillingDate: { type: Date, required: true },
  tag: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const reminderSettingsSchema = new mongoose.Schema({
  pushNotifications: { type: Boolean, default: false },
  emailNotifications: { type: Boolean, default: true },
  smsNotifications: { type: Boolean, default: false },
  reminderDays: { type: String, default: "3" },
  autoRenewWarning: { type: Boolean, default: true },
  priceChangeAlert: { type: Boolean, default: true },
  weeklyDigest: { type: Boolean, default: false },
});

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  subscriptions: [subscriptionSchema],
  reminderSettings: { type: reminderSettingsSchema, default: () => ({}) },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
