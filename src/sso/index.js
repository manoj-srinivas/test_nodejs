// Import required modules
const express = require('express');
const router = express.Router();
const service = require('./service');
const common = require('../../utils/common'); 
const routes = () => {     
  router.post('/login', service.login);   
  router.post('/number', service.number);   
  
  return router;
};
module.exports = routes;
