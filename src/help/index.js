// Import required modules
const express = require('express');
const router = express.Router();
const service = require('./service');
const common = require('../../utils/common'); 


const routes = () => {  
  
  router.post('/createservicerequest', service.category);
  router.put('/servicerequestChat/:catid(\\d+)', service.categoryChat);
  router.get('/servicerequest', service.getCategory);
  router.put('/updateservicerequest/:catid(\\d+)', service.updateCategory);
  router.delete('/deleteservicerequest/:catid(\\d+)', service.deleteCategory);
  return router;
};

module.exports = routes;
