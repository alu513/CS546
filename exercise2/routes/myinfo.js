const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const myInfo = {
    name: "Alexander Lu",
    dob: "5/13",
    hometown: "Plainsboro"
  };
  res.json(myInfo);
});

module.exports = router;
