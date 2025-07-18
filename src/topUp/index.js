// Import required modules
const express = require('express');
const router = express.Router();
const service = require('./service');
const common = require('../../utils/common'); 


const routes = () => {   
  // router.post('/topupRecharge', service.topupRecharge);
  // router.get('/fetchRecharge/:number(\\d+)', service.fetchRecharge);
  // router.get('/recentRecharge/:number(\\d+)', service.recentRecharge);
  // router.get('/amount', service.amount);
  return router;
};

module.exports = routes;
