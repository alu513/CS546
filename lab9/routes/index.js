const path = require("path");

const constructorMethod = app => {
  app.get("/", (req, res) => {
    res.sendFile(path.resolve("static/static.html"));
  });

  app.use("*", (req, res) => {
    res.status(404).json({ error: "404 Not found" });
  });
};

module.exports = constructorMethod;
