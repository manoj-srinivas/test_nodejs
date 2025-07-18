// Import required modules
const express = require('express');
const router = express.Router();
const service = require('./service');
const common = require('../../utils/common');

// URLs
const routes = () => {   
  router.post('/', service.sendNotification);  
  return router;
};

module.exports = routes;
