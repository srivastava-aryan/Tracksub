const express = require("express");
const router = express.Router();
const Subscription = require("../models/Subscription");

// GET all subscriptions for a user
router.get("/:uid", async (req, res) => {
  try {
    const subs = await Subscription.find({ uid: req.params.uid });
    res.json(subs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new subscription
router.post("/", async (req, res) => {
  // console.log("Received POST request with body:", req.body);
  try {
    console.log("Request body:", req.body);
    const newSub = new Subscription(req.body);
    // console.log("Creating new subscription:", newSub);
    const saved = await newSub.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a subscription
router.delete("/:id", async (req, res) => {
  try {
    await Subscription.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;