// Import required modules
const express = require('express');
const router = express.Router();
const service = require('./service');
const common = require('../../utils/common');

// URLs
const routes = () => {   
  router.get('/emergencyEc', service.emergencyEc);  
  router.post('/', service.chargeCard);   
  router.post('/verification', service.verification);  
  router.post('/filters', service.filters);   
  router.get('/details/:transactionid(\\d+)', service.details);  
  router.get('/download/:number(\\d+)', service.download);  
  router.get('/rewards/:number(\\d+)', service.rewards);      
  router.post('/download', service.pdf);    
  router.post('/sendEmail', service.sendEmail);    
  return router;
};

module.exports = routes;
