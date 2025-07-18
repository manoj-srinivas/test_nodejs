// Import required modules
const express = require('express');
const router = express.Router();
const service = require('./service');


const routes = () => {      
  router.get('/category', service.tariffCategory);   
  router.get('/plan/:planid', service.planById);
  router.get('/currentplan', service.tariffCurrentplan);      
  router.get('/plan', service.tariffPlan);  
  router.get('/search', service.tarrifSearch);   
  router.post('/activate', service.activate);     
  return router;
};

module.exports = routes;
