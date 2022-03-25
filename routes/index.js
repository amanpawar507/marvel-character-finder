const myRoutes = require("./character");
const path = require("path");

const constructorMethod = (app) => {
  app.use("/", myRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ Error: "Page not found" });
  });
};

module.exports = constructorMethod;
