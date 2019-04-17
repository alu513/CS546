const express = require("express");
const router = express.Router();
const data = require("../data/people");

router.get("/:id", async (req, res) => {
  let detail;
  try {
    detail = await data.getPersonById(Number(req.params.id));
  } catch {
    res.status(500);
    return;
  }
  detail.title = "Person Found";
  res.render("posts/details", detail);
});

module.exports = router;
