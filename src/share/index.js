// Import required modules
const express = require('express');
const router = express.Router();
const service = require('./service');


const routes = () => {      
  router.post('/request',service.share);
  router.get('/data',service.data);
  router.get('/airtime',service.airtime);
  router.post('/history',service.history);
  router.get('/recentlyShared',service.recentlyShared);

  return router;
};

module.exports = routes;
