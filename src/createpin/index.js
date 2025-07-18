// Import required modules
const express = require("express");
const router = express.Router();
const service = require("./service");
const common = require("../../utils/common");

// URLs
const routes = () => {
  router.post("/create", service.createpin);
  router.post("/update", service.updatepin);
  router.post("/check", service.createpin);

  return router;
};

module.exports = routes;
