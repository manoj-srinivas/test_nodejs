// Import required modules
const express = require('express');
const router = express.Router();
const service = require('./service');
const common = require('../../utils/common');

// URLs
const routes = () => {   
  router.post('/', service.addGame);  
  router.put('/update', service.update);  
  router.get('/list', service.gamelist);  
  router.get('/category', service.category);  
  router.delete('/delete/:id(\\d+)', service.deletegame);  
  router.get('/details/:id(\\d+)', service.details); 
  router.get('/pinwheel', service.pinwheel);   
  router.get('/search', service.search);   
  router.get('/gamification', service.gamification);   
  router.put('/updategamification', service.updategamification);  
  router.get('/gamificationlist', service.gamificationlist);  
  return router;
};


module.exports = routes;
