// Import required modules
const express = require('express');
const router = express.Router();
const service = require('./service');

const   routes = () => {   
  router.post('/link/number/list', service.linkNumberlist); 
  router.post('/create', service.ninCreate);
  router.post('/verify', service.ninVerify);
  router.post('/otp/resend', service.ninOtpResend);
  return router;
};

module.exports = routes;
