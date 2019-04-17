const express = require("express");
const router = express.Router();
const data = require("../data/people");

router.post("/", async (req, res) => {
  const personName = req.body.personName;
  if (!personName) {
    res.status(400).render("posts/error");
    return;
  }
  let name;
  try {
    name = await data.getPersonByName(personName);
  } catch {
    res.status(500);
    return;
  }

  if (name == undefined || name.length < 1) {
    res.render("posts/index", { personName: personName });
  } else {
    res.render("posts/index", {
      foundSomeone: name,
      personName: personName,
      title: "People Found"
    });
  }
});

module.exports = router;
