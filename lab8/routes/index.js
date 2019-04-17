const peopleRoutes = require("./search");
const detailsRoutes = require("./details");
const path = require("path");

const constructorMethod = app => {
  app.get("/", (req, res) => {
    res.sendFile(path.resolve("static/about.html"));
  });
  app.use("/search", peopleRoutes);
  app.use("/details", detailsRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "404 Not found" });
  });
};

module.exports = constructorMethod;
