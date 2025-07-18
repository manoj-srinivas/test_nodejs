// Import required modules
const express = require('express');
const router = express.Router();
const service = require('./service');
const common = require('../../utils/common'); 

const routes = () => {      
   router.get('/category',service.category);
  // router.post('/:flag/pay', service.pay); 
  router.post('/:flag/save', service.saveMeter); 
  router.post('/:flag', service.addNumber); 
  router.get('/:flag/list', service.savednumber); 
  router.get('/:flag/checkmeternumber', service.checkMeterNumber);
  router.delete('/:flag/:meternumber', service.deleteMeter); 
  return router;
};

module.exports = routes;
