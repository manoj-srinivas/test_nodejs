// Import required modules
const express = require('express');
const router = express.Router();
const service = require('./service');
const common = require('../../utils/common'); 
 
const routes = () => {      
  router.get('/category', service.postpaidCategory);    
  router.get('/', service.postpaidPlan);    
  router.get('/search', service.postpaidSearch);    
  router.post('/plan', service.activate);    
  return router;
};

module.exports = routes;
