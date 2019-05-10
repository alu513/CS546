const express = require("express");
const router = express.Router();
const data = require("../data/users");
const bcrypt = require("bcrypt");

router.use("/", async function(req, res, next) {
  let timestamp = new Date().toUTCString();
  //console.log(timestamp);
  if (req.session.user) {
    console.log(
      `[${timestamp}]: ${req.method} ${req.originalUrl} (Authenticated User)`
    );
    next();
  } else {
    console.log(
      `[${timestamp}]: ${req.method} ${
        req.originalUrl
      } (Non-Authenticated User)`
    );
    next();
  }
});

router.get("/", async function(req, res) {
  if (req.session.user) {
    //console.log(req.session.user);
    res.redirect("/private");
  } else {
    if (req.session.credentials == false) {
      //console.log("hi");
      req.session.credentials = null;
      //console.log(req.session.username);
      res.status(401).render("login", {
        error: "Did not provide a valid username and/or password",
        title: "Login Page"
      });
    } else {
      res.render("login", { title: "Login Page" });
    }
  }
});

router.post("/login", async function(req, res) {
  try {
    let username = req.body.username;
    let password = req.body.password;

    //console.log(username);
    //console.log(password);

    let authenticated = false;
    let userIndex = 0;
    let usernameBool = false;

    users = data;

    //console.log(users);
    for (var i = 0; i < users.length; i++) {
      //console.log(users[i].username);
      if (users[i].username == username) {
        userIndex = i;
        usernameBool = true;
        break;
      }
    }
    //console.log(req.session.username);
    if (usernameBool == false) {
      req.session.credentials = false;
      return res.redirect("/");
      //return res.status(401).render("login", { error: "Username not found" });
    }
    try {
      //console.log(users[userIndex].hashedPassword);
      authenticated = await bcrypt.compare(
        password,
        users[userIndex].hashedPassword
      );
      //console.log(authenticated);
    } catch (e) {
      // failed to compare hassedpassword
      res.status(400).json({ error: e });
    }

    if (authenticated === true) {
      req.session.user = users[userIndex];
      res.redirect("/private");
    } else {
      //when password is wrong
      req.session.credentials = false;
      //console.log(req.session.password);
      return res.redirect("/");
    }
  } catch (e) {
    res.status(500).json("Failed");
  }
});

router.use("/private", async function(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(403).render("private");
  }
});

router.get("/private", async function(req, res) {
  try {
    res.render("private", { user: req.session.user, title: "User Details" });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.get("/logout", async function(req, res) {
  try {
    req.session.destroy();
    res.render("logout", { title: "Logout Page" });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
module.exports = router;
