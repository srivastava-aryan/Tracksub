const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");

// GET all subscriptions for a user
router.get("/:uid", async (req, res) => {
  try {
    const user = await UserModel.findOne({ uid: req.params.uid });
    res.json(user ? user.subscriptions : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new subscription
router.post("/:uid", async (req, res) => {
  try {
    const data = req.body;
    const uid = req.params.uid;

    console.log("Received data:", data);
    console.log("User ID:", uid);

    if (!data.name || !data.price || !data.nextBillingDate) {
      return res
        .status(400)
        .json({ message: "Name, price, and nextBillingDate are required" });
    }

    // Remove uid from subscription data if it exists
    const { uid: _, ...subscriptionData } = data;

    let user = await UserModel.findOne({ uid });

    if (!user) {
      // Create new user document
      const newUser = new UserModel({ uid, subscriptions: [subscriptionData] });
      await newUser.save();
      // Return only the first subscription (the new one)
      return res.status(201).json(newUser.subscriptions[0]);
    }

    // Push the new subscription and get updated document
    const updatedUser = await UserModel.findOneAndUpdate(
      { uid },
      { $push: { subscriptions: subscriptionData } },
      { new: true }
    );

    // Return ONLY the last added subscription (the new one)
    const newSubscription = updatedUser.subscriptions[updatedUser.subscriptions.length - 1];
    res.status(201).json(newSubscription);
  } catch (error) {
    console.error("POST subscription error:", error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE a subscription
router.delete("/:id", async (req, res) => {
  try {
    const subId = req.params.id;

    // Remove the subscription from the subscriptions array
    await UserModel.updateOne(
      { "subscriptions._id": subId },
      { $pull: { subscriptions: { _id: subId } } }
    );

    res.status(204).end();
  } catch (err) {
    console.error("DELETE subscription error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
