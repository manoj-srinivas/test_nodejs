// Import required modules
const express = require('express');
const router = express.Router();
const service = require('./service');

const routes = () => {     
  router.get('/profile/:userID', service.profile);   
  router.get('/referral/invitemessage', service.referalInvites);
  router.post('/storedeviceinfo', service.notification);
  router.get('/devicelist', service.devicelist);
  return router;
};
module.exports = routes;
