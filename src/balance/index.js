// Import required modules
const express = require("express");
const router = express.Router();
const service = require("./service");

// URLs
const routes = () => {
  router.post("/data", service.data);

  return router;
};

module.exports = routes;
