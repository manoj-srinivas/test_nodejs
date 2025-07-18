// Import required modules
const express = require('express');
const router = express.Router();
const service = require('./service');
const common = require('../../utils/common'); 

const routes = () => {   
 
  router.post('/', service.generate);
  router.delete('/', service.deleteFile);
  return router;
};

module.exports = routes;
