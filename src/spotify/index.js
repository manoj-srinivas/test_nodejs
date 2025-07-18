// Import required modules
const express = require('express');
const router = express.Router();
const service = require('./service');


const routes = () => {    
  // router.get('/login', service.login);  
  // router.get('/callback', service.callback);   
  // router.get('/profile', service.profile);   
  // router.get('/getAlbum', service.getAlbum);   
  // router.post('/searchTracks', service.searchTracks);  
  // router.post('/searchPlaylists', service.searchPlaylists);  
  router.get('/artistTopTracks', service.artistTopTracks);  
  return router;
};

module.exports = routes;
