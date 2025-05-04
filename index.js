const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

// Webhook برای دریافت پیام از Botpress
app.post("/webhook", (req, res) => {
  console.log("📥 پیام از Botpress:", req.body);
  // اینجا می‌تونی پیام رو به 3CX ارسال کنی یا در سیستم لاگ کنی
  res.sendStatus(200);
});

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

// دریافت پیام از Botpress و ارسال به 3CX
app.post("/3cx-webhook", (req, res) => {
  const { message } = req.body;
  console.log("📤 پیام از Botpress برای 3CX:", message);
  
  // اینجا باید کدی بنویسی که پیام رو به 3CX بفرستی
  // مثلاً با استفاده از API 3CX یا Webhook مخصوص
  // در اینجا فرض می‌کنیم که 3CX یک Webhook دریافت می‌کنه
  axios.post("https://3cx-webhook-url", {
    message: message
  }).then(() => {
    console.log("✅ پیام به 3
