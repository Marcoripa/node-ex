const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({ name: "Marco" });
});

module.exports = app