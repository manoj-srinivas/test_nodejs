// Import required modules
const express = require('express');
const router = express.Router();
const service = require('./service');
const common = require('../../utils/common'); 
const routes = () => {     
  router.get('/:filename', service.language);   
  router.post("/fileUpload", service.fileUpload);
  return router;
};
module.exports = routes;
