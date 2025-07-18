// const mysql = require("../../libs/mysqlDB");
// const common = require("../../utils/common");
// const SpotifyWebApi = require('spotify-web-api-node');
// let token = 'BQDCTc5PpOZNLn1hQ9RB_f8Ttmgpul3AG8tcQbtCD9nEvg4j_-4vKKP1G1Ni3V-KvWTZ-UBnyY7T-Rj79m4WhUKNNufAFCTVY44QFcSTTkxD6maftYsOduHf9XHipdiWqRsmwDWjeooY2bVH6ckFE8slI4EMBYddn3QCJQWswLJn1miI4nyyAg7UI20wJ2EythT6z3OOMjUF3MtqxgAPA-tdVlivzlOImZWTA9mDzBVBbbDH1UJyZ67XZ1EokaYyNcB0xpHq8nJ_ybHxGfPyIjzULAHB4eM4fy3yslorHhAUBKmKt_yqMv7loIQEkAzFpdD1eM-3mQgD0-pjEiRHkQ';
// const scopes = [
//   'ugc-image-upload',
//   'user-read-playback-state',
//   'user-modify-playback-state',
//   'user-read-currently-playing',
//   'streaming',
//   'app-remote-control',
//   'user-read-email',
//   'user-read-private',
//   'playlist-read-collaborative',
//   'playlist-modify-public',
//   'playlist-read-private',
//   'playlist-modify-private',
//   'user-library-modify',
//   'user-library-read',
//   'user-top-read',
//   'user-read-playback-position',
//   'user-read-recently-played',
//   'user-follow-read',
//   'user-follow-modify'
// ];

// const spotifyApi = new SpotifyWebApi({
//   redirectUri: process.env.REDIRECTURI,
//   clientId: process.env.CLIENTID,
//   clientSecret: process.env.CLIENTSECRETE,
// });
// spotifyApi.setAccessToken(token);

// const searchTracks = async (dataJson) => {
//   try {
//     let response = {};
//     // Search tracks whose name, album or artist contains 'Love'
//   await spotifyApi.searchTracks(dataJson.search)
//       .then(function (data) {
//         console.log('Search by "Love"', data.body);
//         response.message = 'Data fetched successfully';
//         response.contents = data.body;
//       }, function (err) {
//         console.error(err);
//         response.error = err.body;
//       });
//     console.log(response);
//     return response;
//   } catch (err) {
//     throw err;
//   }
// };

// const searchPlaylists = async (dataJson) => {
//   try {
//     let response = {};
//     // Search tracks whose name, album or artist contains 'Love'
//   await spotifyApi.searchPlaylists(dataJson.search,{ limit: 10, offset: 20 })
//       .then(function (data) {
//         console.log('Found playlists are', data.body);
//         response.message = 'Data fetched successfully';
//         response.contents = data.body;
//       }, function (err) {
//         console.error(err);
//         response.error = err.body;
//       });
//     console.log(response);
//     return response;
//   } catch (err) {
//     throw err;
//   }
// };
// /**
//  * Exporting the modules
//  */
// module.exports = {
//   searchTracks,
//   searchPlaylists
// };
