const routes = require("express").Router();

routes
  .route("/api/categories")
  .get((req, res) => res.json("Get request from Categories"));

module.exports = routes;
