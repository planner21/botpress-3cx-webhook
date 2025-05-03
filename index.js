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
