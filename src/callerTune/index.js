// Import required modules
const express = require('express');
const router = express.Router();
const service = require('./service');

const routes = () => {    
  
  router.get('/', service.all);
  router.get('/subscription/:mssidn', service.toneProfile); 
  router.post('/subscribtion', service.toneActivation);
  router.delete('/subscribtion', service.toneDelete); 
  
  return router;
};

module.exports = routes;
