const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://tracksub-app.onrender.com"],
    credentials: true,
  })
);
app.use(express.json());

const subscriptionRoutes = require("./routes/subscriptionRoutes");
app.use("/api/subscriptions", subscriptionRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("SubTrack backend is live 🚀");
});

app.listen(PORT, () => {
  console.log(`🔌 Server running on http://localhost:${PORT}`);
});
