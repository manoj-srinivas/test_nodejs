  // Import required modules
const express = require('express');
const router = express.Router();
const service = require('./service');

const routes = () => {    
  router.get('/build', service.buildbunbles); 
  router.post('/categorynew', service.createCategory);  
  router.get('/category', service.categorynew);  
  router.post('/subcategory', service.createSubCategory);  
  router.put('/category', service.updateCategory); 
  router.delete('/category', service.deleteCategory);   
  router.get('/search', service.search);  
  router.post('/bundles', service.createBundles); 
  router.put('/bundles', service.updateBundles); 
  router.delete('/bundles', service.deleteBundles); 
  router.get('/viewCatalogue', service.bundlesnew);  

  return router;
};

module.exports = routes;
