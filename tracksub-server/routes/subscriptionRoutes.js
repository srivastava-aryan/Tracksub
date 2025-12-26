const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");

// GET all subscriptions for a user
router.get("/:uid", async (req, res) => {
  try {
    const subs = await UserModel.find({ uid: req.params.uid });
    res.json(subs.length ? subs[0].subscriptions : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new subscription
router.post("/:uid", async (req, res) => {
  try {
    const data = req.body;
    const uid = req.params.uid;

    if (!data.name || !data.price || !data.nextBillingDate) {
      return res
        .status(400)
        .json({ message: "Name, price, and nextBillingDate are required" });
    }

    const nextBillingDate = new Date(data.nextBillingDate);
    nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
    data.nextBillingDate = nextBillingDate;

    const user = await UserModel.findOne({ uid });
    if (!user) {
      const newUser = new UserModel({ uid, subscriptions: [data] });
      await newUser.save();
      return res.status(201).json(newUser);
    }
    const newSub = await UserModel.updateOne(
      { uid },
      { $push: { subscriptions: data } }
    );
    res.status(201).json(newSub);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a subscription
router.delete("/:id", async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
