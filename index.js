const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/webhook", (req, res) => {
  console.log("پیام از Botpress:", req.body);
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("Botpress Webhook Active");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

// دریافت پیام از 3CX و ارسال به Botpress Cloud
app.post("/from-3cx", async (req, res) => {
  const { message, userId } = req.body;

  try {
    await axios.post(
      `https://api.botpress.cloud/v1/bots/YOUR_BOT_ID/converse/${userId}/incoming`,
      {
        type: "text",
        text: message
      }
    );
    console.log("✅ پیام از 3CX به Botpress ارسال شد");
    res.sendStatus(200);
  } catch (err) {
    console.error("❌ خطا در ارسال به Botpress:", err.message);
    res.sendStatus(500);
  }
});

app.post("/3cx-webhook", (req, res) => {
  console.log("📥 پیام از Botpress برای 3CX:", req.body);
  // اینجا می‌تونی پیام رو به 3CX ارسال کنی یا در سیستم لاگ کنی
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
