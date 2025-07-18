// Import required modules
const express = require("express");
const router = express.Router();
const service = require("./service");

// URLs
const routes = () => {
  router.get("/list", service.countrylist);

  return router;
};

module.exports = routes;
