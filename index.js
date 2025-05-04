const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

// 1. دریافت پیام از 3CX و ارسال به Botpress Cloud
app.post("/from-3cx", async (req, res) => {
  const { message, userId } = req.body;

  try {
    // ارسال پیام به Botpress Cloud
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

// 2. دریافت پیام از Botpress و ارسال به 3CX
app.post("/3cx-webhook", async (req, res) => {
  const { message, userId, conversationId, timestamp } = req.body;

  console.log("📤 پیام از Botpress به 3CX:", message);

  try {
    // ارسال پیام به Webhook 3CX
    await axios.post("https://your-3cx-webhook-url", {
      message: message,
      userId: userId,
      conversationId: conversationId,
      timestamp: timestamp
    });

    console.log("✅ پیام به 3CX ارسال شد");
    res.sendStatus(200);
  } catch (err) {
    console.error("❌ خطا در ارسال پیام به 3CX:", err.message);
    res.sendStatus(500);
  }
});

// صفحه تست برای بررسی فعال بودن Webhook
app.get("/", (req, res) => {
  res.send("Botpress Webhook Active");
});

// راه‌اندازی سرور
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
