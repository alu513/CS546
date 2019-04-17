const express = require("express");
const router = express.Router();
const data = require("../data/about.json");

router.get("/", async (req, res) => {
  res.json(data);
});

module.exports = router;
