// Import required modules
const express = require('express');
const router = express.Router();
const service = require('./service');


const routes = () => {    
  router.post('/plan', service.dashboardPlan);   
  router.post('/mysubscription', service.mysubscription);   
    
  return router;
};

module.exports = routes;
