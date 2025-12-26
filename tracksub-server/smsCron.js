const cron = require("node-cron");
const twilio = require("twilio");
require("dotenv").config();

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// ------------------------------------
// 1️⃣ SIMPLE CRON JOB (runs every minute)
// ------------------------------------

cron.schedule("* * * * *", () => {
  console.log("Running cron job: Sending SMS...");

  client.messages
    .create({
      body: "Hello Aryan! This is your scheduled SMS reminder.",
      from: process.env.TWILIO_PHONE_NUMBER,       // Twilio phone number
      to: "+917754890353"         // Your phone number
    })
    .then(msg => console.log("SMS sent:", msg.sid))
    .catch(err => console.error("Error:", err));
});

console.log("Cron job scheduled. Waiting...");
