const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");

// GET reminder settings for a user
router.get("/:uid", async (req, res) => {
  try {
    const user = await UserModel.findOne({ uid: req.params.uid });
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.json(user.reminderSettings || {
      pushNotifications: false,
      emailNotifications: true,
      smsNotifications: false,
      reminderDays: "3",
      autoRenewWarning: true,
      priceChangeAlert: true,
      weeklyDigest: false,
    });
  } catch (err) {
    console.error("GET reminder settings error:", err);
    res.status(500).json({ error: err.message });
  }
});

// PUT/UPDATE reminder settings
router.put("/:uid", async (req, res) => {
  try {
    const uid = req.params.uid;
    const settings = req.body;

    console.log("Updating reminder settings for:", uid);
    console.log("New settings:", settings);

    const updatedUser = await UserModel.findOneAndUpdate(
      { uid },
      { $set: { reminderSettings: settings } },
      { new: true, upsert: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser.reminderSettings);
  } catch (err) {
    console.error("PUT reminder settings error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;