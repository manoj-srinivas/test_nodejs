// Import required modules
const express = require('express');
const router = express.Router();
const service = require('./service');
const common = require('../../utils/common'); 

const routes = () => {      
  router.post('/request',service.requestSend);
  router.post('/response',service.requestStatus);
  router.get('/data',service.data);
  router.get('/airtime',service.airtime);
  return router;
};

module.exports = routes;
